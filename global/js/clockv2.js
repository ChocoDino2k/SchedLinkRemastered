/**
* @fileoverview This file updates the current time in reference to the schedule
* that the current day is running. This file only applies to the home page of
* each school, otherwise known as the main, timer page.
* @version December 20th, 2021
* @authors Logan Cover, Skylar Smith, Gabriel Iskandar
**/

/**
* corrects the current time based on the offset (testing) variables
* @returns a new Date object given the offsets
**/
function newDateAdjusted() {
  return new Date(
    Date.now() // user's clock
    + (1000*secOffset) + (60000*minOffset) + (3600000*hourOffset) // because it's easier to do this than fix the off-by-one error
  );
}

var updateClockFrame = 0; //used for animation frame tracking

var secOffset = -1; //seconds offset (always set to -1)
var minOffset = 0; //minute offset (testing variable)
var hourOffset = 0; //hour offset (testing variable)

var now = newDateAdjusted(); //user's current time
var curTotalSec = 0; //user's current time in seconds
const pageLoadDate = now.toISOString().split('T')[0]; //date the user loaded the page
const schedname = (JSON_calendar[now.getFullYear()] == undefined)? "Unscheduled" : JSON_calendar[now.getFullYear()][now.getMonth()][now.getDate() - 1]; //name of the day's schedule
const schedule = JSON_sched[schedname]; //schedule the timer follows
var schedule_links = new LinkedList(); //schedule converted into a doubly linked list
var display_node; //node in linked list that is actively being displayed
var parent_node; //parent of the display node, tracks the gallery dots


/**
* initializes schedule and timer
**/
function init() {
  for(let period of schedule) {
    if(period.startTime == null) continue; //ignore initial heading information

    schedule_links.append(new Node(period.name, period.ID, period.startTimeDigits,
      period.startTime, period.endTimeDigits, period.endTime, false, {},
      period.intraindex, createElement('button', ["class", "gallery-dot"])));

      if(period.intraschedule != null) {
        let sub_links, obj;
        for(let key in period.intraschedule) {
          sub_links = new LinkedList();
          for(let subP of period.intraschedule[key]) {
            sub_links.append(new Node(
              subP.name, subP.ID, subP.startTimeDigits, subP.startTime,
              subP.endTimeDigits, subP.endTime
            ));
          }
          schedule_links.tail.intraschedule[key] = sub_links;
        }
      }
    }
    display_node = null; //initial value, final value if nothing is found within the time range
    parent_node = null; //initial value, final value if nothing is found within the time range
    let checking_node = schedule_links.head;
    let gal = findElements(document.body, false, "#period__gallery");
    updateClock();
    do {
      if(getTimeRemaining(checking_node)[1]) {
        display_node = checking_node;
        parent_node = checking_node;
        parent_node.dot.classList.toggle("active");
        break;
      }
      gal.appendChild(checking_node.dot);
      checking_node = checking_node.next;
    } while(checking_node != null);
    if(parent_node != null)
    updateClockVisual(true, false, [-1, false]);
    while(checking_node != null) { //fills in the rest of the gallery dots
      gal.appendChild(checking_node.dot);
      checking_node = checking_node.next;
    }
    tick();
  }

/**
* updates the current time (now and curTotalSec variables) and checks for a new day
**/
function updateClock(){
  now = newDateAdjusted();
  curTotalSec = (now.getHours() * 60*60) + now.getMinutes()*60 + now.getSeconds();
  if (pageLoadDate != now.toISOString().split('T')[0]) {
    // new day
    window.location.reload(true);
    return false;
  }
  return true;
}

//main loop
function tick() {
  if(updateClock()) {
    checkPeriod();
    window.cancelAnimationFrame(updateClockFrame);
    updateClockFrame = window.requestAnimationFrame(tick);
  } else {
    window.cancelAnimationFrame(updateClockFrame);
  }
}

/**
* returns the difference between the current time and the period time
* @param {Node} period in which to check the time difference
* @returns if the current time is before the period, returns start - current, false
* if the current time is during the period, returns end - current, true
* if the current time is after period, returns -1, false
* if the period is null, returns -2, false
**/
function getTimeRemaining(period) {
  if(period == null) return [-2, false];
  if(curTotalSec > period.endTime) {
    return [-1, false];
  } else {
    return (curTotalSec < period.startTime)?
    [period.startTime - curTotalSec, false] :
    [period.endTime - curTotalSec, true];
  }

}

/**
* checks if the currently displayed period needs to be updated
* If an update needs to occur, this invokes the updateClockVisual method
* and updates the display_node and parent_node variables appropriately
**/
function checkPeriod() {

  if(display_node == null) { //currently before or after the schedule
    let checking_node = schedule_links.head;
    do {
      if(getTimeRemaining(checking_node)[1]) {
        display_node = checking_node;
        parent_node = checking_node;
        parent_node.dot.classList.toggle("active");
        break;
      }
      checking_node = checking_node.next;
    } while(checking_node != null);
    if(parent_node != null) {
      updateClockVisual(true, false, [-1, false]);
    } else { //still before or after the schedule
      return;
    }
  }



  let tr = getTimeRemaining(display_node);
  if(tr[0] == 0) { //current period ended
    if(display_node.next != null) {
      parent_node.dot.classList.toggle("active")
      display_node = (tr[1])? display_node.next : display_node;
      if(!display_node.isChild) {
        parent_node = display_node;
      }
      updateClockVisual(true, false, tr);
      parent_node.dot.classList.toggle("active");
    } else {
      if(display_node.isChild) {
        display_node = parent_node;
      }
      updateClockVisual(true, true, [-1, false]);
      parent_node.dot.classList.remove('active');
      parent_node = null;
      display_node = null;
      checkSubPrompt(display_node);
    }
  } else if(tr[0] == -2) { //current period is null
    updateClockVisual(true, true, tr);
  } else { //current period is still active
    updateClockVisual(false, false, tr);
  }
}

/**
* updates the HTML progress bar and timer, if specified, will also update
* the period name and times.
* @param {boolean} updateAll If it should also update the period information
* @param {boolean} end If the schedule has ended or not begun
* @param {int} tf timeframe of the remaining time
**/
function updateClockVisual(updateAll, end, tf) {
  let headerN, headerT, timer, bar;
  if(end) {
    headerN = "Not School Hours";
    headerT = "Not School Hours";
    timer = "--:--";
    bar = "0%";
  } else {
    headerN = display_node.name;
    headerT = to12H(display_node.startTimeDigits) + " - " + to12H(display_node.endTimeDigits);
    bar = (tf[1])? ( (1 - (tf[0] /(display_node.endTime - display_node.startTime))) * 100) + "%" : "0%";
    let d = [];
    if(tf[0] > 0) {
      do {
        d.unshift(tf[0] % 60);
        tf[0] = Math.trunc(tf[0] / 60);
      } while(tf[0] != 0);
      if(d.length == 1) {
        d.unshift(0);
      }
      timer = joinTime(d);
    } else {
      timer = "--:--";
    }
  }


  if(updateAll) {
    findElements(document.body, false, "#period__header").innerHTML = headerN;
    findElements(document.body, false, "#period__time").innerHTML =
    headerT;
    checkSubPrompt(display_node); //checks if has to display sub periods
  }
  findElements(document.body, false, "#countdown__timer").innerHTML = timer;
  findElements(document.body, false, "#countdown__progress").style.width = bar;

}

/**
* displays if the given period has sub periods
* @param {Node} period period to check
**/
function checkSubPrompt(period) {
  let b = document.querySelector("#sub");
  if(period == null) {
    b.classList = "hidden";
  } else if(period.isChild) {
    replaceElementsWith(b,
      [createSubChoices(parent_node)]);
      b.classList = "";
    return;
  }else if(period.intraschedule != null) {
    replaceElementsWith(b,
      [createSubChoices(period)]);
      b.classList = "";
    } else {
      b.classList = "hidden";
    }
  }

/**
* creates html buttons for each sub period choice
* @param {Node} period period to generate buttons for
**/
function createSubChoices(period) {
  let div = createElement("div",["class","row"], ["id","sub_choose"]),
  btn;
  for(let key in period.intraschedule) {
    btn = createElement("button", ["class","container hover"], ["text", key]);
    if(key == period.intraindex) {
      btn.classList.toggle("active");
    }
    btn.onclick = function() {
      if(period.intraindex != key) {
        display_node = period.intraschedule[key].head;
        period.intraindex = key;
        let checking_node = display_node;
        while(checking_node != null) {
          if(getTimeRemaining(checking_node)[1]) {
            display_node = checking_node;
            break;
          }
          checking_node = checking_node.next;
        }
      } else {
        period.intraindex = -1;
        display_node = period;
      }
      for(let choice of this.parentNode.children) {
        if(choice.classList.contains("active") || choice == this){
          choice.classList.toggle("active");
        }
      }
      updateClockVisual(true, false, getTimeRemaining(display_node));
    };
    div.appendChild(btn);
  }
  return div;
}

/**
* joins an array of digits in a time format tt:tt:etc
* @returns String in the format tt:tt:etc
**/
function joinTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}

/**
* breaks tt:tt:etc into an array of digits
* @returns Array of integers
**/
function breakTime(time){
  return (time.split(":")).map(s => parseInt(s));
}

/**
* converts 24 hour time format to 12 hour
* @returns String in the 12 hour format
**/
function to12H(time){
  let t = breakTime(time);
  return joinTime([ ((t[0] > 12)? t[0]%12: t[0]), t[1]]);
}

/**
* allows arrow button on home page to scroll through the schedule and updates
* the display_node and parent_node variables accordingly
* @param {int} dir direction to traverse. Positive for right, negative for left
**/
function scrollPeriod(dir) {
  if(dir >= 0) {
    if(display_node == null) {
      display_node = schedule_links.head;
      parent_node = schedule_links.head;
      parent_node.dot.classList.toggle("active");
    } else if(display_node.next) {
      parent_node.dot.classList.toggle("active");
      display_node = display_node.next;
      if(!display_node.isChild) {
        parent_node = display_node;
      }
      if(display_node.intraindex != -1 ) {
        display_node = display_node.intraschedule[display_node.intraindex].head;
      }
      parent_node.dot.classList.toggle("active");
    } else if(display_node.isChild) {
      display_node = parent_node;
      scrollPeriod(1);
    }
  } else {
    if(display_node == null) {
      display_node = schedule_links.tail;
      parent_node = schedule_links.tail;
      parent_node.dot.classList.toggle("active");
    } else if(display_node.previous) {
      parent_node.dot.classList.toggle("active");
      display_node = display_node.previous;
      if(!display_node.isChild) {
        parent_node = display_node;
      }
      if(display_node.intraindex != -1 ) {
        display_node = display_node.intraschedule[display_node.intraindex].tail;
      }
      parent_node.dot.classList.toggle("active");
    } else if(display_node.isChild) {
      display_node = parent_node;
      scrollPeriod(-1);
    }
  }
  updateClockVisual(true, false, getTimeRemaining(display_node));
}
