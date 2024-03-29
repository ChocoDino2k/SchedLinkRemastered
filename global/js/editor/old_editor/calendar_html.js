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
  head = eSection.children[0].children[1].children[0],
  groups = eSection.children[1].children,
  child;
  head.innerHTML = MONTH_NAMES[calendar.currentMonth -1] + " " + calendar.currentYear;
  for(let day of days){
    child = groups[i%7].children[1].children[Math.trunc(i/7)];
    child.innerHTML = day.day;
    child.setAttribute("tooltip-show", day.userData.active);
    setBackground(day, child);

    child.onclick = function(){
      let ref = dropdownRef[0].children[1].children[0].textContent;
      if(ref === day.userData.active && day.userData.previous !== null){
        day.userData.active = day.userData.previous;
        day.userData.previous = ref;
      }else{
        day.userData.previous = day.userData.active;
        day.userData.active = ref;
      }
      JSON_calendar[day.year][day.month-1][day.day-1] = day.userData.active;
      setBackground(day, this);
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
function swapSections(){ //switch reference between calendar editor and schedule editor
  sectionIdx ^= 1;
  mSection = findElements(document.body, false, "#menu_section").children[sectionIdx];
  eSection = findElements(document.body, false, "#edit_section").children[sectionIdx];
}
function createScheduleOptions(){
  let arr = [];
  let container,
  colCont,
  textCont,
  color,
  text,
  sortedKeys = insertionSort(Object.getOwnPropertyNames(JSON_sched)
    .map(n => { return  {name: n, value: JSON_sched[n][0].position} } )); //should only be slightly out of order

  for(let key of sortedKeys ){
    container = createElement("div", ["class", "schedule_container"]);
    colCont = createElement("div", ["class","schedule_color_container"]);
    textCont = createElement("div", ["class","schedule_text_container"]);
    color = createElement("span", ["style"," background:" + JSON_sched[key.name][0].color]);
    text = createElement("p", ["text" , key.name]);

    textCont.appendChild(text);
    colCont.appendChild(color);
    container.appendChild(colCont);
    container.appendChild(textCont);
    arr.push(container);
  }

  return arr;
}


function insertionSort(arr) {
  let temp;
  let j;
  for (let i = 1; i < arr.length; i++) {
    j = i;
    while (j > 0 && arr[j].value < arr[j - 1].value) {
      temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }
  return arr;
}
