var calendar = new Calendar();

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    let weekdays = [];
    DAYS_OF_WEEK_ABR.forEach((item, i) => {
      weekdays.push(createElement('p','class:cal_itm' ,'text:' + item));
    });
    addElementsTo(findElements(document, false, '#calendar_date'), createElement('p', 'text:' + MONTH_NAMES[calendar.currentMonth-1]));
    addElementsTo(findElements(document, false, '.weekday_container'), weekdays);
    addElementsTo(findElements(document, false, '#dates'), createDays());
  }
};
function createDays(){
  let displayDays = calendar.getFullMonth(calendar.currentMonth),
  htmlDays = [];
  for(let day of displayDays){
    htmlDays.push(createElement("p","class:day cal_itm", "text:" + day.day));
    htmlDays[htmlDays.length -1].onclick = function(){
      if(calendar.updateMonth(day.month - calendar.currentMonth)){
        addElementsTo(findElements(document, false, '#dates'), createDays());
        findElements(document.querySelector('#calendar_date'), false, 'p').innerHTML = MONTH_NAMES[calendar.currentMonth-1];
      }
    }
  }
  return htmlDays;
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
