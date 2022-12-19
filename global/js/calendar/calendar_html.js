var calendar; //global calendar to interact with

function setUserData(allYears){ //updates days with schedules
  let start = (allYears)? 0 : (calendar.currentMonth == 1)? 2: 0,
  end = (allYears)? 3 : start+1;
  for(let y =start; y < end; y++){
    if(JSON_calendar[calendar.years[y].year] == undefined){
      expandJSONCal(y, calendar.years[y].year);
    }
    for(let m=0; m < 12; m++){
      for(let d = 0; d < calendar.years[y].months[m].daysInMonth; d++){
        calendar.years[y].months[m].days[d].userData = {active: JSON_calendar[calendar.years[y].year][m][d], previous: null};
      }
    }
  }
}

function expandJSONCal(idx, year){ //initialize year with default schedule
  JSON_calendar[year]= {};
  for(let i =0; i < 12; i++){
    JSON_calendar[year][i] = [];
    for(let k = 0; k < calendar.years[idx].months[i].daysInMonth;k++){
        JSON_calendar[year][i].push("Unscheduled");
    }
  }
}

function replaceDays(){ //updates HTML month view
  let days = calendar.getFullMonth(),
  i =0,
  head = cSec.children[0].children[1].children[0],
  groups = cSec.children[1].children,
  child;
  head.innerHTML = MONTH_NAMES[calendar.currentMonth -1] + " " + calendar.currentYear;
  for(let day of days){
    child = groups[i%7].children[1].children[Math.trunc(i/7)];
    child.innerHTML = day.day;
    child.setAttribute("tooltip-show", day.userData.active); //TODO hover shows schedule without having to click
    setBackground(day, child);

    child.onclick = function(){
      sSec.classList.toggle("hidden");

      fillSchedule(day.userData.active);
      if(day.month != calendar.currentMonth){
        let f = (day.month - calendar.currentMonth);
        if(calendar.updateMonth( (Math.abs(f) > 1)? (Math.abs(f)/f * -1 ) : f) ) {
          setUserData(false);
        }
        replaceDays();
      }
  }
  i++;
}
}
function setBackground(day, elm){
  let background = JSON_sched[day.userData.active], rgb;
  if(background == undefined){
    background = JSON_sched["Unscheduled"][0].color;
  } else {
    background = background[0].color;
  }
  elm.style.background = "radial-gradient(1.5rem circle," + background + " 40%," +  ((day.month - calendar.currentMonth === 0)? "transparent": "var(--secondary-background-color)")  + " 41%)";
  rgb = colorRGB(background);

  elm.style.color = "var(--container-text-color)";
}
function colorRGB(c){
  let clr = c.substring(c.indexOf("(")+1, c.indexOf(")")).split(","),
  rgb = [
      Number(clr[0]),
      Number(clr[1]),
      Number(clr[2])
  ];
  return rgb;
}
function needsTextColorSwitch(r, g, b) {
    [r, g, b] = ([r, g, b]).map(c => { c /= 255; if (c <= 0.03928) {return c / 12.92;} else { return Math.pow(((c + 0.055 )/ 1.055), 2.4) } } );
    return !(0.2126 * r + 0.7152 * g + 0.0722 * b > Math.sqrt(1.05 * 0.3) - 0.05);
}

//idk why this is here
/**
function merge(left, right){
  let i = j = 0,
  merged = [];
  while(i < left.length && j < right.length){

    if(left[i].value <= right[j].value){
      merged.push(left[i]);
      i++;
    }else{
      merged.push(right[j]);
      j++;
    }

  }

  while( i < left.length){
    merged.push(left[i]);
    i++;
  }
  while( j < right.length){
    merged.push(right[j]);
    j++;
  }
  return merged;
}


function mergeSort(arr){

if(arr.length > 1){
  let mid = Math.trunc((arr.length -1)/2),
  left = [],
  right = [];

  for(let i=0; i < arr.length; i++){
    if(i <= mid){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }
    return merge(mergeSort(left), mergeSort(right));
  }else{
    return arr;
  }



}
*/


/**
 * 
 * The following displays the schedule when a user clicks on the day
 */
function createScheduleHead(name = "Unscheduled"){ //
  let container = createElement("div", ["class","schedule_container"],
  ["children",
    [
      createElement("div",["class","schedule_color_container"],
      ["children",
        [
          createElement("span", ["style"," background:" + JSON_sched[name][0].color])
        ]
      ]),
      createElement("div",["class","schedule_text_container"],
      ["children",
        [
          createElement("p", ["text", name])
        ]
      ])
    ]
  ]);

  return container;
}
function createScheduleMain(period = {name:"", startTimeDigits: "", endTimeDigits:""}, isBlock = false){
  return createElement("div",["class","schedule_part"],["children",
    [
      createPeriodHeading(period.name, isBlock),
      createPeriodTime(period)
    ]
  ]);
}
function createPeriodHeading(name = "", isBlock = false){
  return createElement("div", ["class", "period_heading"], ["children",
    [
      createElement("p",["text",name])
    ]
  ])
}
function createPeriodTime(period = {startTimeDigits: "", endTimeDigits: ""}){
  return createElement("div", ["class", "period_time"], ["children",[
  createElement("p",["text",to12H(period.startTimeDigits)]),
  createElement("p", ["text", "-"] ),
  createElement("p",["text",to12H(period.endTimeDigits)])
  ] ]
  );
}
// function createScheduleButtons(includeBoth = false, whole = false){
//   return createElement("div",["class", "operation_container"],
//   ["children",
//     [
//       createElement("img", ["src","/global/images/trash_can.svg"], ["onclick", "removePart(this," + whole + ")"]),
//       ((includeBoth) ? createElement("img", ["src", "/global/images/plus_sign.svg"], ["onclick","addPart(this, " + !whole + ", true)"]) : null )
//     ]
//   ]);
// }
function createScheduleLabelBlock(name = "", subParts = []){
  let block = createElement("div", ["class","label_block"], ["children",
  [createPeriodHeading(name, true)]
  ]);
  for(let part of subParts){
    block.appendChild(createScheduleMain(part, true));
  }

  return block;
}
function fillSchedule(name = ""){
  let head = sSec.children[0].children[0],
  body = sSec.children[0].children[1],
  container;

  clearChildren(body);
  clearChildren(head);

  if(name == "" || JSON_sched[name] == undefined){
    head.appendChild(createScheduleHead());
    body.appendChild(createElement("div", ["class","part_container"], ["children",[createScheduleMain()]]));
  }else{
    head.appendChild(createScheduleHead(name));
    for(let i=1; i < JSON_sched[name].length; i++){
      container = createElement("div", ["class","part_container"]);
      container.appendChild(createScheduleMain(JSON_sched[name][i]));
      if(JSON_sched[name][i].intraschedule != null){
        for(let key of Object.getOwnPropertyNames(JSON_sched[name][i].intraschedule) ){
            container.appendChild(createScheduleLabelBlock(key, JSON_sched[name][i].intraschedule[key]));
        }
      }

      body.appendChild(container);
    }
  }
}

function joinTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}
function breakTime(time){
  return (time.split(":")).map(s => parseInt(s));
}
function to12H(time){
  let t = breakTime(time);
  return joinTime([ ((t[0] > 12)? t[0]%12: t[0]), t[1]]);
}
