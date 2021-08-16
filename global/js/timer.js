function newDateAdjusted() {
  return new Date(
      Date.now() // user's clock
    + (1000*secOffset) + (60000*minOffset) + (3600000*hourOffset) // because it's easier to do this than fix the off-by-one error
  );
}

var secOffset = -1;
var minOffset = 0;
var hourOffset = -14;

var disPeriodI = null;
var curPeriodI = null;
var disLunchI = null;
var curLunchI = null;
var curTotalMin;

var now = newDateAdjusted();
var pageLoadDate = now.toISOString().split('T')[0];
var schedName = JSON_calendar[now.getMonth()][now.getDate() - 1];
var schedule = JSON_schedule[schedName];

var updateClockFrame = 0;
var periodNames = {};
var lunchPeriods = {};
var showLunch = true;

var displayData = {
  items: {
    timer: {value: '--:--', elementId: 'countdown__timer', property: 'textContent'},
    periodName: {value: '\u00a0', elementId: 'period__header', property: 'value'},
    periodTime: {value: 'Loading', elementId: 'period__time', property: 'textContent'},
    progressBar: {value: '0%', elementId: 'countdown__progress', property: 'width'}
  },
  paint: function() {
    var pList = Object.keys(displayData.items);
    for (var p of pList) {
      if (typeof(displayData[p]) != 'undefined' && this.items[p].value != displayData[p]) {
        if (this.items[p].property == 'textContent') {
          findElements(document.body, false, "#" + this.items[p].elementId).textContent = displayData[p];
        }
        else if (this.items[p].property == 'value') {
          findElements(document.body, false, "#" + this.items[p].elementId).value = displayData[p];
        }
        else if (this.items[p].property == 'width') {
          findElements(document.body, false, "#" + this.items[p].elementId).style.width = displayData[p];
        }
        this.items[p].value = displayData[p];
      }
    }
  }
};

var gallery = {
  dots: [],
  create: function() {
    for (var i = 0; i < schedule.length / 2; i++) {
      this.dots[i] = createElement('button', 'class::gallery-dot', 'onclick::changeDisPeriod(' + (i*2+1) + ');');
      findElements(document.body, false, "#period__gallery").appendChild(this.dots[i]);
    }
  },
  switchActive: function(curDot) {
    for (var i = 0; i < this.dots.length; i++)
    {
      this.dots[i].setAttribute("class", "gallery-dot");
    }
    if (curDot != -1 && curDot % 1 == 0) {
      this.dots[curDot].setAttribute("class", "gallery-dot active");
      findElements(document.body, false, "#period__header").classList.add('active');
      findElements(document.body, false, "#period__header").removeAttribute('readonly');
    }
    else {
      findElements(document.body, false, "#period__header").classList.remove('active');
      findElements(document.body, false, "#period__header").setAttribute('readonly','');
    }
  }
};

function updateClock() {
  var minsLeft;
  var periodTotalMin;
  now = newDateAdjusted();
  curTotalSec = (now.getHours() * 60*60) + now.getMinutes()*60;

  if (pageLoadDate != now.toISOString().split('T')[0]) {
    // new day
    window.location.reload();
    return;
  } else if (curPeriodI !== null && curLunchI !== null && showLunch) {
    // period with lunches
    var lunchPeriod = schedule[curPeriodI].lunches[lunchPeriods[schedule[curPeriodI].lunches.type]][curLunchI];
    minsLeft = (lunchPeriod.EHours * 60)
        + lunchPeriod.EMin - curTotalMin - 1;
    periodTotalMin = ((lunchPeriod.EHours * 60) + lunchPeriod.EMin) - ((lunchPeriod.SHours * 60) + lunchPeriod.SMin);
  } else if (curPeriodI !== null) {
    // normal period
    minsLeft = (schedule[curPeriodI].EHours * 60)
        + schedule[curPeriodI].EMin - curTotalMin - 1;
    periodTotalMin = ((schedule[curPeriodI].EHours * 60) + schedule[curPeriodI].EMin) - ((schedule[curPeriodI].SHours * 60) + schedule[curPeriodI].SMin);
  } else {
    minsLeft = 0;
    checkCurPeriod();
  }
  if (minsLeft < 0) {
    // period over
    checkCurPeriod();
  }

  if (curPeriodI === null) {
    displayData.timer = '--:--';
    displayData.progressBar = '0%';
  } else {
    var hours = Math.floor(minsLeft / 60).toString();
    var minutes = (minsLeft % 60).toString();
    var seconds = (59 - now.getSeconds()).toString();
    hours = hours == '0' ? '' : hours + ':';
    // minutes = hours ? (minutes.padStart(2, '0') + ':') : minutes == '0' ? '' : (minutes + ':');
    minutes = hours ? (minutes.padStart(2, '0') + ':') : (minutes + ':');
    seconds = hours || minutes ? seconds.padStart(2, '0') : seconds;

    displayData.timer = hours + minutes + seconds;

    //Progress Bar
    var secLeft = 60 * minsLeft + (59 - now.getSeconds());
    var percentProgress = ((1 - (secLeft / (60 * periodTotalMin))) * 100) + '%';
    displayData.progressBar = percentProgress
  }

  displayData.paint();
  window.cancelAnimationFrame(updateClockFrame);
  updateClockFrame = window.requestAnimationFrame(updateClock);
}

function checkCurPeriod() {
  curPeriodI = checkTimeFrame(schedule);
  if(curPeriodI == null) {
    return;
  }
  disPeriodI = curPeriodI;
  curLunchI = null;
  disLunchI = null;

  if ('lunches' in schedule[curPeriodI] && showLunch) {
    if (schedule[curPeriodI].lunches.type in lunchPeriods) {
      curLunchI = checkTimeFrame(schedule[curPeriodI].lunches[lunchPeriods[schedule[curPeriodI].lunches.type]]);
      disLunchI = curLunchI;
    }
  }

  displayPeriod();
}

// Gets the current period's index
function checkTimeFrame(sched) {
  for (let i = 0; i < sched.length; i++) {
    // If it is currently between the start and end of the period
    if ((sched[i].SHours * 60) + sched[i].SMin <= curTotalMin && curTotalMin < (sched[i].EHours * 60) + sched[i].EMin) {
      return i;
    }
  }
  return null;
}

// Display the period name and start/end times
function displayPeriod() {
  var periodToDisplay;
  if (disPeriodI === null) {
    // no period
    if (schedName === 'No School') {
      displayData.periodTime = 'No School Today';
      displayData.periodName = newDateAdjusted().toLocaleDateString();
    } else {
      displayData.periodTime = 'Not School Hours';
      displayData.periodName = 'No Period';
      findElements(document.body, false, "#period__header").classList.remove('active');
      findElements(document.body, false, "#period__header").setAttribute('readonly','');
    }
    displayData.paint();
    return;
  } else if ("lunches" in schedule[disPeriodI]) {
    // lunch period
    findElements(document.body, false, "#lunch").classList.remove('hidden');
    if (schedule[disPeriodI].lunches.type in lunchPeriods && disLunchI !== null && showLunch) {
      periodToDisplay = schedule[disPeriodI].lunches[lunchPeriods[schedule[disPeriodI].lunches.type]][disLunchI];
    }
    else {
      periodToDisplay = schedule[disPeriodI];
    }
  } else {
    // normal period
    findElements(document.body, false, "#lunch").classList.add('hidden');
    periodToDisplay = schedule[disPeriodI];
  }

  var periodStart = (periodToDisplay.SHours % 24) + ':' + periodToDisplay.SMin.toString().padStart(2, '0');
  var periodEnd = (periodToDisplay.EHours % 24) + ':' + periodToDisplay.EMin.toString().padStart(2, '0');
  displayData.periodTime = periodStart + ' - ' + periodEnd;
  displayData.periodName = (periodToDisplay.name in periodNames) ? periodNames[periodToDisplay.name] : periodToDisplay.name;
  displayData.paint();
  gallery.switchActive((disPeriodI - 1) / 2);
}

function changeDisPeriod(periodI, additive = false) {
  if(additive) {
    if("lunches" in schedule[disPeriodI] && schedule[disPeriodI].lunches.type in lunchPeriods && showLunch) {
      disLunchI = (disLunchI % 2 == 0) ? disLunchI + periodI : disLunchI + periodI*2;
      if(disLunchI < 0) {
        disLunchI = null;
        disPeriodI -= 2;
      }
      else if(disLunchI >= schedule[disPeriodI].lunches[lunchPeriods[schedule[disPeriodI].lunches.type]].length) {
        disLunchI = null;
        disPeriodI += 2;
      }
      disPeriodI = (disPeriodI < 0) ? disPeriodI + schedule.length : disPeriodI %= schedule.length;
    }
    else {
      disPeriodI = (disPeriodI % 2 == 0) ? disPeriodI + periodI : disPeriodI + periodI*2;
      disPeriodI = (disPeriodI < 0) ? disPeriodI + schedule.length : disPeriodI %= schedule.length;
      if("lunches" in schedule[disPeriodI] && schedule[disPeriodI].lunches.type in lunchPeriods && showLunch) {
        disLunchI = (periodI == 1) ? disLunchI = 1 : disLunchI = schedule[disPeriodI].lunches[lunchPeriods[schedule[disPeriodI].lunches.type]].length - 1;
      }
    }
  }
  else {
    disPeriodI = periodI;
  }
  displayPeriod();
}

function chooseLunch(lunchType, button) {
  lunchPeriods[schedule[disPeriodI].lunches.type] = lunchType;
  localStorage.setItem("lunchPeriods", JSON.stringify(lunchPeriods));

  for (var i = 0; i < button.parentNode.children.length; i++) {
    button.parentNode.children[i].classList.remove("active");
  }
  button.classList.add("active");
  if("lunches" in schedule[curPeriodI]) {
    checkCurPeriod();
  }
}

function toggleLunch() {
  showLunch = showLunch ? false : true;
  if("lunches" in schedule[curPeriodI]) {
    checkCurPeriod();
  }
}

function savePeriodName() {
  if(disPeriodI != null) {
    var input = findElements(document.body, false, "#period__header").value;
    periodNames[schedule[disPeriodI].name] = (input == "") ? schedule[disPeriodI].name : input;
    localStorage.setItem("periodNames", JSON.stringify(periodNames));
  }
}

function init() {
  gallery.create();

  findElements(document.body, false, "#period__header").addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
      document.activeElement.blur();
    }
  })

  periodNames = localStorage.getItem("periodNames");
  if(periodNames == '' || periodNames == null) {
    periodNames = {};
  }
  else {
    periodNames = JSON.parse(periodNames);
  }

  lunchPeriods = localStorage.getItem("lunchPeriods");
  if(lunchPeriods == '' || lunchPeriods == null) {
    lunchPeriods = {};
  }
  else {
    lunchPeriods = JSON.parse(lunchPeriods);
  }

  updateClock();
}
