var calendar = new Calendar(true);
let calHeadDate, calBody;
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    for(let m = 0; m < JSON_calendar.length; m++){
      for(let d =0; d < JSON_calendar[m].length; d++){
        if(d >= calendar.years[1].months[m].daysInMonth){continue;}
        calendar.years[1].months[m].days[d].userData = {active: JSON_calendar[m][d], previous: null};
      }
    }

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
      calendar.updateMonth(parseInt(btn.value));
      updateCalendar(calBody, calHeadDate, createDays());
      // replaceElementsWith(calBody, createDays());
      // calHeadDate.children[0].innerHTML = MONTH_NAMES[calendar.currentMonth-1]+ ' ' + calendar.currentYear;
      // slide(parseInt(btn.value));
    };
  }

}
};
function createDays(){
  let displayDays = calendar.getFullMonth(calendar.currentMonth, true),
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
      JSON_calendar[day.month-1][day.day-1] = day.userData.active;
      updateColor(day, this);
      if(day.month != calendar.currentMonth){
        calendar.updateMonth( (day.month == 1 || (day.month > calendar.currentMonth && calendar.currentMonth != 1))? 1 : -1 );
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
function updateCalendar(){
  if(calBody && calHeadDate){
    let groups = createDays(),
    expanded = [];
    for(let group of groups){
      expanded.push( createElement("div",["class","calendar_group"], ["children", group]) );
    }
    replaceElementsWith(calBody, expanded);
    calHeadDate.children[0].innerHTML = MONTH_NAMES[calendar.currentMonth-1];
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