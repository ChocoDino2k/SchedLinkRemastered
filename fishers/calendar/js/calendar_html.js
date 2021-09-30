var calendar;

function setUserData(allYears){
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

function expandJSONCal(idx, year){
  JSON_calendar[year]= {};
  for(let i =0; i < 12; i++){
    JSON_calendar[year][i] = [];
    for(let k = 0; k < calendar.years[idx].months[i].daysInMonth;k++){
        JSON_calendar[year][i].push("Unscheduled");
    }
  }
}

function replaceDays(){
  let days = calendar.getFullMonth(),
  i =0,
  head = cSec.children[0].children[1].children[0],
  groups = cSec.children[1].children,
  child;
  head.innerHTML = MONTH_NAMES[calendar.currentMonth -1] + " " + calendar.currentYear;
  for(let day of days){
    child = groups[i%7].children[1].children[Math.trunc(i/7)];
    child.innerHTML = day.day;
    child.setAttribute("tooltip-show", day.userData.active);
    setBackground(day, child);

    child.onclick = function(){
      // let ref = dropdownRef[0].children[1].children[0].innerHTML;
      // if(ref === day.userData.active && day.userData.previous !== null){
      //   day.userData.active = day.userData.previous;
      //   day.userData.previous = ref;
      // }else{
      //   day.userData.previous = day.userData.active;
      //   day.userData.active = ref;
      // }
      // JSON_calendar[day.year][day.month-1][day.day-1] = day.userData.active;
      // setBackground(day, this);
      // clearSchedule();
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
  let background = JSON_sched[day.userData.active][0].color, rgb;
  if(background == undefined){
    background = JSON_sched["Unscheduled"][0].color;
  }
  elm.style.background = "radial-gradient(1.5rem circle," + background + " 40%," +  ((day.month - calendar.currentMonth === 0)? "transparent": "var(--secondary-background)")  + " 41%)";
  rgb = colorRGB(background);

  elm.style.color = "var(--container-color)";
  // if(needsTextColorSwitch(rgb[0], rgb[1], rgb[2])){
  //   elm.style.color = "rgb(255,255,255)";
  // }else{
  //   elm.style.color = "rgb(0,0,0)";
  // }
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
// function swapSections(){
//   sectionIdx ^= 1;
//   mSection = findElements(document.body, false, "#menu_section").children[sectionIdx];
//   sec = findElements(document.body, false, "#edit_section").children[sectionIdx];
// }
// function createScheduleOptions(){
//   let arr = [];
//   let container,
//   colCont,
//   textCont,
//   color,
//   text,
//   sortedKeys = mergeSort(Object.getOwnPropertyNames(JSON_sched)
//     .map(n => { return  {name: n, value: JSON_sched[n][0].position} } ));
//
//   for(let key of sortedKeys ){
//     container = createElement("div", ["class", "schedule_container"]);
//     colCont = createElement("div", ["class","schedule_color_container"]);
//     textCont = createElement("div", ["class","schedule_text_container"]);
//     color = createElement("span", ["style"," background:" + JSON_sched[key.name][0].color]);
//     text = createElement("p", ["text" , key.name]);
//
//     textCont.appendChild(text);
//     colCont.appendChild(color);
//     container.appendChild(colCont);
//     container.appendChild(textCont);
//     arr.push(container);
//   }
//
//   return arr;
// }

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




function createScheduleHead(name = "Unscheduled"){
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
function createScheduleMain(period = {name:"", ST: "", ET:""}, isBlock = false){
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
function createPeriodTime(period = {ST: "", ET: ""}){
  return createElement("div", ["class", "period_time"], ["children",[
  createElement("p",["text",period.ST]),
  createElement("p", ["text", "-"] ),
  createElement("p",["text",period.ET])
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
      if(JSON_sched[name][i].sub != undefined){
        for(let key of Object.getOwnPropertyNames(JSON_sched[name][i].sub) ){
            container.appendChild(createScheduleLabelBlock(key, JSON_sched[name][i].sub[key]));
        }
      }

      body.appendChild(container);
    }
  }
}
