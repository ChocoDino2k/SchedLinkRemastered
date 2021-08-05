function newDateAdjusted() {
  return new Date(
      Date.now() // user's clock
    - 1000 // because it's easier to do this than fix the off-by-one error
  );
}

var curPeriodI = null;
var curLunchI = null;
var curTotalMin;

var now = newDateAdjusted();
var pageLoadDate = now.toISOString().split('T')[0];
var schedName = JSON_calendar[now.getMonth()][now.getDate() - 1];
var schedule = JSON_schedule[schedName];

var updateClockFrame = 0;

var displayData = {
  items: {
    timer: {value: '--:--', elementId: 'countdown__timer', property: 'textContent'},
    periodName: {value: '\u00a0', elementId: 'period__header', property: 'textContent'},
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
      this.dots[i] = createElement('button', 'class:gallery-dot', 'onclick:skipToPeriod(' + i + ')');
      findElements(document.body, false, "#period__box").appendChild(this.dots[i]);
    }
  },
  switchActive: function(curDot) {
    for (var i = 0; i < this.dots.length; i++)
    {
      this.dots[i].setAttribute("class", "gallery-dot");
    }
    if (curDot != -1 && curDot % 1 == 0)
      this.dots[curDot].setAttribute("class", "gallery-dot active");
    }
};

function updateClock() {
  var minsLeft;
  var periodTotalMin;
  now = newDateAdjusted();
  curTotalMin = (now.getHours() * 60) + now.getMinutes();

  if (pageLoadDate != now.toISOString().split('T')[0]) {
    // new day
    window.location.reload();
    return;
  } else if (curPeriodI !== null && curLunchI !== null) {
    // period with lunches
    minsLeft = (schedule[curPeriodI].lunches[curLunchI].EHours * 60)
        + schedule[curPeriodI].lunches[curLunchI].EMin - curTotalMin - 1;
    periodTotalMin = ((schedule[curPeriodI].lunches[curLunchI].EHours * 60) + schedule[curPeriodI].lunches[curLunchI].EMin) - ((schedule[curPeriodI].lunches[curLunchI].SHours * 60) + schedule[curPeriodI].lunches[curLunchI].SMin);
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
    var percentProgress = ((1 - (secLeft / (60 * periodTotalMin + 59))) * 100) + '%';
    displayData.progressBar = percentProgress

    console.log(periodTotalMin);
  }

  displayData.paint();
  window.cancelAnimationFrame(updateClockFrame);
  updateClockFrame = window.requestAnimationFrame(updateClock);
}

function checkCurPeriod() {
  curPeriodI = checkTimeFrame(schedule);
  curLunchI = null;

  if (curPeriodI !== null && 'lunches' in schedule[curPeriodI]) {
    curLunchI = checkTimeFrame(schedule[curPeriodI].lunches);
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
  if (curPeriodI === null) {
    // no period
    if (schedName === 'No School') {
      displayData.periodTime = 'No School Today';
      displayData.periodName = newDateAdjusted().toLocaleDateString();
    } else {
      displayData.periodTime = 'Not School Hours';
      displayData.periodName = '';
    }
    displayData.paint();
    return;
  } else if (curLunchI !== null) {
    // lunch period
    periodToDisplay = schedule[curPeriodI].lunches[curLunchI];
  } else {
    // normal period
    periodToDisplay = schedule[curPeriodI];
  }
  var periodStart = (periodToDisplay.SHours % 24) + ':' + periodToDisplay.SMin.toString().padStart(2, '0');
  var periodEnd = (periodToDisplay.EHours % 24) + ':' + periodToDisplay.EMin.toString().padStart(2, '0');
  displayData.periodTime = periodStart + ' - ' + periodEnd;
  displayData.periodName = periodToDisplay.name;
  displayData.paint();
  gallery.switchActive((curPeriodI - 1) / 2);
}

function init() {
  gallery.create();
  updateClock();
}