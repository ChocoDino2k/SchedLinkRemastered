var secOffset = -1;
var minOffset = 35;
var hourOffset = 0;

var updateClockFrame = 0;
//current time
var now = newDateAdjusted();
//time when the user opens SchedLink
const pageLoadDate = now.toISOString().split('T')[0];
//now in seconds
var nowTotalSeconds = 0;
//schedule during time now (if it does not exist, set to 'undefined')
const scheduleName = (JSON_calendar[now.getFullYear()] == undefined ?
  "Unscheduled" :
  JSON_calendar[now.getFullYear()][now.getMonth()][now.getDate() - 1]);
//schedule for the given scheduleName
const schedule = JSON_sched[scheduleName];

//gallery of periods in a schedule
// dots = each part of the schedule
// current = index of the current part in the schedule
// activeHTML = array of html elements that represent parts of the schedule
// that should be shown
// fillDots: initializes dats
// updateHTMLDots: initializes activeHTML
var gallery = {
  dots: [],
  current: -1,
  activeHTML: [],
  fillDots: function() {
    for(let part in schedule) {
      if(part == "0") {continue;}
      if(!schedule[part].hasSub) {

        this.dots.push( {showDot:true, sched: schedule[part],
          htmlRef: createElement('button', ["class", "gallery-dot"]),
          current: 0} );

      } else {

        this.dots.push( {showDot: true,
        sched: schedule[part],
        htmlRef: createElement('button', ["class", "gallery-dot"]),
        current: 0,
        subGals: {}
        } );

        let lastDot = this.dots[this.dots.length-1];
        for(let key in schedule[part].sub){
          lastDot.subGals[key] =  {dots: schedule[part].sub[key],
          current: 0};
          for(let d of lastDot.subGals[key].dots){
            d.htmlRef = createElement('button', ["class", "gallery-dot"]);
          }
        }
      }
    }
  },
  updateHTMLDots: function() {
    this.activeHTML = [];
    for(let part of this.dots) {
      if(part.showDot) {
        this.activeHTML.push(part.htmlRef);
      }
    }
  }
};


//html references in object
// timer = place where time is displayed
// progressBar = place of the pertentage based progress bar
// periodName = name of the current period
// periodTime = time frame of the current period
var displayData = {
  items: {
    timer: {value: '--:--', elementId: 'countdown__timer', property: 'textContent'},
    progressBar: {value: '0%', elementId: 'countdown__progress', property: 'width'},
    periodName: {value: '\u00a0', elementId: 'period__header', property: 'value'},
    periodTime: {value: 'Loading', elementId: 'period__time', property: 'textContent'}
  } ,

  paint: function(updatePeriodInformation) {
    if (gallery.current == -1) {return;}
    let galleryCurrent = gallery.dots[gallery.current];
    let currentDot;
    //if the current dot doesn't have a sub gallery and it's set to itself
    if(galleryCurrent.subGals == undefined || galleryCurrent.current == 0) {
      currentDot = galleryCurrent;
    } else {
      currentDot = galleryCurrent.subGals[galleryCurrent.current]
        .dots[galleryCurrent.subGals[galleryCurrent.current].current];
    }

    for(let key in this.items) {
      if(key == "progressBar") {
        findElements(document.body, false, "#" + this.items[key].elementId)
          .style.width = this.items[key].value;
      } else {
        //only update the period name and time when neccessary
        if(  (key != "periodName" && key != "periodTime") || (updatePeriodInformation) ) {
        findElements(document.body, false, "#" + this.items[key].elementId)
          .textContent = this.items[key].value;
        }
      }
    }
  }

}

//takes an array of format [hour, mintume] and
//returns a string in format 'hh:mm'
function joinTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}
//takes a string in format 'hh:mm' and
//returns an array of format [hour, mintume]
function breakTime(time){
  return (time.split(":")).map(s => parseInt(s));
}
//takes a string in format 'hh:mm'
//returns an array in 12 hour format [hour, minute]
function to12H(time){
  let t = breakTime(time);
  return joinTime([ ((t[0] > 12)? t[0]%12: t[0]), t[1]]);
}
//scales a number between two bounds to two new bounds
//modifies the number from relative to two old bounds to two new bounds
function scale_number(num, from_min, from_max, to_min, to_max){
    if(from_min != from_max && to_min != to_max){
      return (((  num - from_min ) * (to_max - to_min)) / (from_max - from_min)) + to_min;
    }else{
      return to_min;
    }
}



//adjust clock by offsets
function newDateAdjusted() {
  return new Date(
      Date.now() // user's clock
    + (1000*secOffset) + (60000*minOffset) + (3600000*hourOffset) // because it's easier to do this than fix the off-by-one error
  );
}
//updates the running clock
function updateClock(){
  now = newDateAdjusted();
  // console.log(now);
  nowTotalSeconds = (now.getHours() * 60*60) + now.getMinutes()*60 + now.getSeconds();
  if (pageLoadDate != now.toISOString().split('T')[0]) {
    // new day
    console.log("here");
    window.location.reload(true);
    return;
  }
}

//gets the time remaining from the current time from a specified period
//if currently in the period time frame, returns [time remaining, true]
//if currently before the period time frame, returns [time until, false]
//if currently after the period time frame, returns [-1, true]
function getTimeRemaining(gal, idx){
    let current = (idx != undefined)? idx : gal.current,
    part = (gal.dots[current].sched != undefined)?
      gal.dots[current].sched : gal.dots[current],
    tf = {s:breakTime(part.ST), e:breakTime(part.ET)},
    start = tf.s[0] * 60 + tf.s[1],
    end = tf.e[0] * 60 + tf.e[1];
    if(nowTotalSeconds > end*60){return [-1, true];}
    return (nowTotalSeconds < start*60)? [start*60 - nowTotalSeconds, true] : [end*60 - nowTotalSeconds, false];
}
//updates the html to the current dot in the gallery, highlights the current
function updateCurrentDot() {
  let curDot = gallery.dots[gallery.current];
  if(curDot == undefined){
    displayData.items["timer"].value = "--:--";
    displayData.items["progressBar"].value = '0%';
    displayData.items["periodTime"].value  = "Not School Hours";
    displayData.items["periodName"].value = "Not School Hours";
    return;
  }
    for(let dot of gallery.activeHTML){
      if(dot.classList.contains("active")){
        dot.classList.remove("active");
        break;
      }
    }
    gallery.activeHTML[gallery.current].classList.add("active");


    displayData.items["periodTime"].value =
      to12H(sched.ST) +
      " - " +
      to12H(sched.ET);
    displayData.items["timer"].value = (timeRemaining[0] > 0 )?
      joinTime( (timeRemaining[0] > 60*60)?
        [Math.trunc(timeRemaining[0]/60/60), Math.trunc(timeRemaining[0]/60%60), timeRemaining[0]%60 ]
        : [Math.trunc(timeRemaining[0]/60%60), timeRemaining[0]%60] )
      : "--:--";
    displayData.items["periodName"].value = sched.name;

    let endTime = breakTime(sched.ET),
    startTime = breakTime(sched.ST);
    displayData.items["progressBar"].value =
      (timeRemaining[1])?
      "0%" :
      ( (1 - (timeRemaining[0]/
        (( endTime[0]*60*60 + endTime[1]*60 + endTime[0] )
        - ( startTime[0]*60*60 + startTime[1]*60 + startTime[0] )  )))
         * 100) + "%";
}
//updates the html to show all dots in gallery.activeHTML
function updateDotGallery() {
  gallery.updateHTMLDots();
  let periodGal = findElements(document,false,  "#period__gallery");
  while(periodGal.firstChild){
    periodGal.removeChild(periodGal.firstChild);
  }
  for(let dot of gallery.activeHTML){
    periodGal.appendChild(dot);
  }
  updateCurrentDot();
}

//searches for the first instance where the current time is in a period's
// timeframe. returns the index, -1 if there are none
function findActivePeriod(gal) {
  let i;
  for(i = 0; i < gal.dots.length; i++) {
    if(getTimeRemaining(gal, i)[0] > -1) {
      return i;
    }
  }
  return -1;
}
//creates the buttons and container for keys in the sub gallery
function createSubGalleryChoices() {
  let div = createElement("div",["class","row"], ["id","sub_choose"]),
  currentDot = gallery.dots[gallery.current],
  btn;

  for(let key in currentDot.subGals) {
    btn = createElement("button", ["class","container hover"], ["text", key]);
    btn.onclick = function() {
      //if the key is the same as the active
      if(key == currentDot.current) {
        currentDot.current = 0;
      } else {
        //find the dot in the current time frame
        let idx = findActivePeriod(currentDot.subGals);
        let currentSub;
        if(idx != -1 && currentDot.current != 0) {
          currentSub = currentDot.subGals[key];

          currentSub.current = Math.round(
            scale_number(
              currentDot.subGals[currentDot.current].current,
              0,
              current.subGals[currentDot.current].length,
              0,
              currentSub.dots.length
            )
          );

        }
      }
      //updating the highlight
      for(let choice of this.parentNode.children) {
        if(choice.classList.contains("active") || choice == this) {
          choice.classList.toggle("active");
        }
      }
      //updateDotGallery();
    };
    div.append(btn);

    return div;
  }
}
//updates the visibility of a sub gallery for the current period
function updateSubGalleryOptions() {
  let container = findElements(document.body, false, "#sub");
  if(gallery.current == -1 || gallery.dots[gallery.current].subGals == undefined) {
    clearChildren(container);
  } else {
    replaceElementsWith(container, [createSubGalleryChoices()]);
  }
}

function updatePeriod(gal, dir) {
  //checks if adding dir will cause out of bounds
  let outOfBounds = (gal.dots[gal.current + dir] == undefined);

  //checks if current index is already out of bounds
  if(gal.dots[gal.current] == undefined) {
    if(!outOfBounds) {
      gal.current += dir;
    }
    updateCurrentDot();
    return (gal.dots[gal.current] != undefined);
  }

  if(outOfBounds) {
    updateCurrentDot();
    return false;
  } else {
    gal.current += dir;
    updateCurrentDot();
    return true;
  }
}

function loop(firstTime) {
  updateClock();

  let currentDot = gallery.dots[gallery.current];;
  if(currentDot == undefined) {
    updateCurrentDot();
    displayData.paint(true);
  } else {
    let timeRemaining = 0;
    let updateAll = false;
    let inbounds = false;
    if(currentDot.subGals == undefined || currentDot.current == 0) {
      timeRemaining = getTimeRemaining(gallery);
      if(timeRemaining[0] == 0) {
        updateAll = true;
        if(!updatePeriod(gallery, 1)) {
          gallery.current = -1;
        }
        currentDot = gallery.dots[gallery.current];
      }
    } else {
      //check to see if user gave a current value that doesn't exist or is empty
      if(currentDot.subGals[currentDot.current].dots.length > 0) {

        timeRemaining = getTimeRemaining(curDot.subGals[curDot.current]);

        if(timeRemaining[0] == 0) {
          updateAll = true;
          let inbounds = updatePeriod(currentDot.subGals[currentDot.current], 1);
          updateAll = true;
          if(!inbounds) {
            inbounds = updatePeriod(gallery, 1);
          }
          //if still not inbounds, schedule is done
          if(!inbounds) {
            gallery.current = -1;
          }

          currentDot = gallery.dots[gallery.current];
        }
      } else {
        currentDot.current = 0;
        timeRemaining = getTimeRemaining(gallery);

        if(timeRemaining[0] == 0) {
          updateAll = true;
          if(!updatePeriod(gallery, 1)) {
            gallery.current = -1;
          }
          currentDot = gallery.dots[gallery.current];
        }
      }
    }

      if(currentDot != undefined) {
        let sched;
        if(currentDot.subGals != undefined && currentDot.current != 0) {
          sched = currentDot.subGals[currentDot.current].dots[currentDot.subGals[currentDot.current].current];
        } else {
          sched = currentDot.sched;
        }

        updateCurrentDot(//pass in gallery or schedule?);
        displayData.paint(updateAll || firstTime);
      } else {
        displayData.items["timer"].value = "--:--";
        displayData.items["progressBar"].value = '0%';
        displayData.items["periodTime"].value  = "Not School Hours";
        displayData.items["periodName"].value = "Not School Hours";
        displayData.paint(true);
      }


  }

  window.cancelAnimationFrame(updateClockFrame);
  updateClockFrame = window.requestAnimationFrame(function() {
    loop(false);
  });
}

function init() {
  findElements(document.body, false, "#nav-tabs__home").classList.toggle("selected");
  gallery.fillDots();

  updateClock();
  gallery.current = findActivePeriod(gallery);

  updateDotGallery();
  updateCurrentDot();
  updateSubGalleryOptions();
  loop(true);
}
