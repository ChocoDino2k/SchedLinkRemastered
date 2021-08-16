var calendar = new Calendar(false);
let calHeadDate, calBody;
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    document.querySelector('.schedule_view_options').insertBefore(createDropDown(
        createScheduleOptions()
    ), document.querySelector('.schedule_view_options').children[0]);

    populate(true);

    //DOM elements
    calBody = findElements(document, false, '#dates');
    calHeadDate = findElements(document, false, "#calendar_date");
    addElementsTo(calHeadDate, createElement('p', ['text' , MONTH_NAMES[calendar.currentMonth-1]]));
    // addElementsTo(findElements(document, false, '.weekday_container'), weekdays);
    let groups = createDays();
    for(let group of groups){
      addElementsTo(calBody, createElement("div", ["class","calendar_group"], ["children", group]));
    }

    for(let btn of findElements(document.body, true, '.calendar_head_btn')){
      btn.onclick = function(){
      if(calendar.updateMonth(parseInt(btn.value))){
        populate(false);
      }
      updateCalendar(calBody, calHeadDate, createDays());
      // replaceElementsWith(calBody, createDays());
      // calHeadDate.children[0].innerHTML = MONTH_NAMES[calendar.currentMonth-1]+ ' ' + calendar.currentYear;
      // slide(parseInt(btn.value));
    };
  }

}
};


function createDays(){
  let displayDays = calendar.getFullMonth(calendar.currentMonth),
  htmlGroups = [
    [],[],[],[],[],[],[]
  ],
  groupNum = 0;

  DAYS_OF_WEEK_ABR.forEach((item, i) => {
    htmlGroups[i].push( createElement('p',['class','cal_itm weekday' ], ['text', item]) );
  });
  for(let group of htmlGroups){
    group.push( createElement("div", ["class","calendar_group_days"]));
  }
  for(let day of displayDays){
    htmlGroups[(groupNum)%7][1].appendChild(createElement("p",["class","day cal_itm"], ["text", day.day]));
    updateColor(day, htmlGroups[(groupNum)%7][1].children[htmlGroups[(groupNum)%7][1].children.length -1]);
    htmlGroups[(groupNum)%7][1].children[htmlGroups[(groupNum)%7][1].children.length -1].onclick = function(){
      let ref = dropdownRef[0].children[1].children[0].innerHTML;
      if(ref === day.userData.active && day.userData.previous !== null){
        day.userData.active = day.userData.previous;
        day.userData.previous = ref;
      }else{
        day.userData.previous = day.userData.active;
        day.userData.active = ref;
      }
      JSON_calendar[day.year][day.month-1][day.day-1] = day.userData.active;
      updateColor(day, this);
      if(day.month != calendar.currentMonth){
        let f = (day.month - calendar.currentMonth);
        if(calendar.updateMonth( (Math.abs(f) > 1)? (Math.abs(f)/f * -1 ) : f) ) {
          populate(false);
        }
        updateCalendar();
    }
    }
    groupNum++;
  }
  return htmlGroups;
}
function addElementsTo(parent, elms){
  if(elms instanceof Array){
  for(let elm of elms){
    parent.appendChild(elm);
    }
  }else {
    parent.appendChild(elms);
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
function populate(all){
  if(all){
    for(let y =0; y < 3; y++){
      if(JSON_calendar[calendar.years[y].year] == undefined){
        expandJSONCal(y, calendar.years[y].year);
      }
      for(let m=0; m < 12; m++){
        for(let d = 0; d < calendar.years[y].months[m].daysInMonth; d++){
          calendar.years[y].months[m].days[d].userData = {active: JSON_calendar[calendar.years[y].year][m][d], previous: null};
        }
      }
    }
  }else{
    let y = (calendar.currentMonth == 1)? 2: 0;
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
function updateCalendar(){
  if(calBody && calHeadDate){
    let groups = createDays(),
    expanded = [];
    for(let group of groups){
      expanded.push( createElement("div",["class","calendar_group"], ["children", group]) );
    }
    replaceElementsWith(calBody, expanded);
    calHeadDate.children[0].innerHTML = MONTH_NAMES[calendar.currentMonth-1] + " " + calendar.currentYear;
  }else{
    return;
  }
}

//animation for calendar
function slide(dir){

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
function updateColor(day, elm){
  let background = JSON_sched[day.userData.active][0].color,
  rgb = colorRGB(background);
  if(background !== undefined){
    elm.style.background = "radial-gradient(1.5rem circle," + background + " 40%," +  ((day.month - calendar.currentMonth === 0)? "transparent": "var(--secondary-background)")  + " 41%)";
  }
  if(needsTextColorSwitch(rgb[0], rgb[1], rgb[2])){
    elm.style.color = "rgb(255,255,255)";
  }else{
    elm.style.color = "rgb(0,0,0)";
  }
}
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}
function needsTextColorSwitch(r, g, b) {
    [r, g, b] = ([r, g, b]).map(c => { c /= 255; if (c <= 0.03928) {return c / 12.92;} else { return Math.pow(((c + 0.055 )/ 1.055), 2.4) } } );
    return !(0.2126 * r + 0.7152 * g + 0.0722 * b > Math.sqrt(1.05 * 0.05) - 0.05);
}

function createScheduleOptions(){
  let arr = [];
  let container,
  colCont,
  textCont,
  color,
  text;

  for(let key in JSON_sched) {
    container = createElement("div", ["class", "schedule_container"]);
    colCont = createElement("div", ["class","schedule_color_container"]);
    textCont = createElement("div", ["class","schedule_text_container"]);
    color = createElement("span", ["style"," background:" + JSON_sched[key][0].color]);
    text = createElement("p", ["text" , key]);

    textCont.appendChild(text);
    colCont.appendChild(color);
    container.appendChild(colCont);
    container.appendChild(textCont);
    arr.push(container);
  }

  return arr;
}

function defaultSchedule(){
}
