function numbersOnly(caller, parent, evt){
  let key = (evt.keyCode ? evt.keyCode : evt.which);

  if( !(key >= 48 && key <=57) ) { evt.preventDefault(); } //if it isn't a number
  if( (key != 8 && key != 46) && !parent.value.includes(":") && parent.value.length == 2) { //not a backspace and the length is 2
    if(parent.value[0] != "0" && parent.value[0] != "1" && parent.value[0] != "2") { //doesn't follow 2 digit format
      parent.value = "0" + parent.value[0] + ":" + parent.value[1];
    } else {
      parent.value += ":";
    }
  }
}

/**
 * Makes HTML for schedule editor un-hidden
 * Hides calendar HTML hidden
 */
function showScheduleEditor() {
    calendarHTML.classList = "container hidden";
    menuSection.children[0].classList = "menu_options hidden";
    scheduleHTML.classList = "container";
    menuSection.children[1].classList = "menu_options";
}

/**
 * Creates a schedule heading
 * @param {string} ID - name of the schedule
 * @param {boolean} studentsPresent - boolean should students check SchedLink for this schedule 
 * @returns HTML elements to display for the heading
 */
function createScheduleHead(ID = "", studentsPresent = false){
  let headingElements = [
    createElement("div", ["class","schedule_container edit"],
    ["children",
      [
        createElement("div",["class","schedule_color_container"],
        ["children",
          [
            createElement("span", ["style"," background:" + ((ID === "")? "transparent" : JSON_sched[ID].metadata.color) ])
          ]
        ]),
        createElement("div",["class","schedule_text_container"],
        ["children",
          [
            createElement("input", ["type","text"], ["value" , (ID === "")? "" : JSON_sched[ID].metadata.name], ["placeholder","Schedule Name"], ["referenceID", ID])
          ]
        ])
      ]
    ]),
    createElement("div", ["class", "schedule_container edit checkbox_container"],
    ["children",
      [
        createElement("input",["type","checkbox"],["id","needsCheck"],["checked", (studentsPresent)]),
        createElement("label",["for","needsCheck"],["text","Students should be present"])
      ]
    ])
  ];
  return headingElements;
}
/**
 * Create schedule HTML to display a single period name, times, and possible sub-entries
 * @param {*} period object with name, start time, end time
 * @param {*} includeAdd should include ability to create sub-entries
 * @param {*} isBlock is part of a larger block
 * @returns HTML element
 */
function createScheduleMain(period = {name:"", startTimeDigits: "", endTimeDigits:""}, includeAdd = true, isBlock = false){
  return createElement("div",["class","schedule_part"],["children",
    [
      createPeriodHeading(period.name, includeAdd, isBlock),
      createPeriodTime(period)
    ]
  ]);
}
/**
 * Creates period heading
 */
function createPeriodHeading(name = "", includeAdd = false, isBlock = false){
  return createElement("div", ["class", "period_heading"], ["children",
    [
      createElement("input",["type","text"],["placeholder","Name"],["value",name]),
      createScheduleButtons(includeAdd, !isBlock)
    ]
  ])
}
/**
 * Creates period timing HTML display
 */
function createPeriodTime(period = {startTimeDigits: "", endTimeDigits: ""}){
  return createElement("div", ["class", "period_time"], ["children",[
  createElement("input", ["type", "text"], ["value",  period.startTimeDigits], ["placeholder","00:00"], ["maxlength","5"], ["onkeydown", numbersOnly]),
  createElement("p", ["text", "-"] ),
  createElement("input", ["type", "text"], ["value",  period.endTimeDigits], ["placeholder","24:00"], ["maxlength","5"], ["onkeydown", numbersOnly])
  ] ]
  );
}
/**
 * Creates button HTML to create sub-entries
 * @param {*} includeBoth inculde both add and delete
 * @param {*} whole boolean condition to remove or add entire HTML hierarchy? (not entirely sure)
 */
function createScheduleButtons(includeBoth = false, whole = false){
  return createElement("div",["class", "operation_container"],
  ["children",
    [
      createElement("img", ["src","/global/images/trash_can.svg"], ["onclick", "removePart(this," + whole + ")"]),
      ((includeBoth) ? createElement("img", ["src", "/global/images/plus_sign.svg"], ["onclick","addPart(this, " + !whole + ", true)"]) : null )
    ]
  ]);
}
/**
 * 
 */
function createScheduleLabelBlock(name = "", subParts = []){
  let block = createElement("div", ["class","label_block"], ["children",
  [createPeriodHeading(name, true, true)]
  ]);
  for(let part of subParts){
    block.appendChild(createScheduleMain(part, false, true));
  }

  return block;
}
/**
 * Displays schedule passed in
 * @param {*} ID id of the schedule to display
 * @param {boolean} needsCheck students should check SchedLink for this schedule
 */
function fillSchedule(ID = "", needsCheck = true){
  let head = scheduleHTML.children[0],
  body = scheduleHTML.children[1],
  container;

  if(ID == "" || JSON_sched[ID] == undefined){
    for (let item of createScheduleHead("", needsCheck)) {
      head.appendChild(item);
    }
    body.appendChild(createElement("div", ["class","part_container"], ["children",[createScheduleMain()]]));
  }else{
    for (let item of createScheduleHead(ID, needsCheck)) {
      head.appendChild(item);
    }
    for(let i=0; i < JSON_sched[ID].periods.length; i++){
      container = createElement("div", ["class","part_container"]);
      container.appendChild(createScheduleMain(JSON_sched[ID].periods[i]));
      if(JSON_sched[ID].periods[i].intraschedule != null){
        for(let key of Object.getOwnPropertyNames(JSON_sched[ID].periods[i].intraschedule) ){
            container.appendChild(createScheduleLabelBlock(key, JSON_sched[ID].periods[i].intraschedule[key]));
        }
      }

      body.appendChild( container );
    }
  }
}

/**
 * removes part from HTML/schedule
 * @param {*} img image reference this is called from
 * @param {boolean} whole remove from further in HTML hierarchy
 */
function removePart(img, whole = false){
  if(whole)
  img.parentNode.parentNode.parentNode.parentNode.remove();
  else
  img.parentNode.parentNode.parentNode.remove();
}
/**
 * Add additional schedule part
 * @param {*} el element to add
 * @param {boolean} isBlock is part of a larger block
 * @param {*} inBody no clue
 */
function addPart(el, isBlock = false, inBody = false){
  if(inBody){
    if(isBlock){
      el.parentNode.parentNode.parentNode.appendChild(createScheduleMain({name:"", startTimeDigits: "", endTimeDigits:""}, false, true));
    }else{
      el.parentNode.parentNode.parentNode.parentNode.appendChild(createScheduleLabelBlock());
    }
  }else{
    scheduleHTML.children[1].appendChild(createElement("div", ["class","part_container"], ["children", [createScheduleMain()]]));
  }
}
/**
 * clears currently displayed HTML
 */
function clearSchedule(){
    for(let i =0; i < 2; i++){
        while(scheduleHTML.children[i].firstChild){
            scheduleHTML.children[i].removeChild(scheduleHTML.children[i].firstChild);
        }
    }
}

/**
 * fills schedule editing section with the current schedule
 * @param {boolean} isNew whether a new or existing schedule
 */
function displaySchedule(isNew = false) {
    clearSchedule();
    if (isNew) {
        fillSchedule();
    } else {
        fillSchedule(currentSchedule, JSON_sched[currentSchedule].metadata.needsCheck);
    }
}

function toStringTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}
function toNumberTime(time){
  return (time.split(":")).map(s => parseInt(s));
}


/**
 * Gets each period part from the active schedule displayed
 * @returns array of HTML elements
 */
function getScheduleEntries() {
    let entries = scheduleHTML.children[1].children;
    if (entries.length == 0) {
        return null;
    }
    let entryArr = new Array(entries.length);
    for (let i = 0; i < entryArr.length; i++) {
        if (entries[i].children.length == 0) {
            entryArr[i] = [null];
        } else {
            entryArr[i] = entries[i].children;
        }
    }
    return entryArr;
}
/**
 * Converts schedule HTML into JSON
 * @param {HTMLDivElement} entry schedule part to be parsed
 * @returns JSON reprsentative of entry given. Null if malformed, throws error if poor time information is given
 */
function parseEntry(entry) {
    //parsing period
    if (entry == null) {return null;}
    if (entry.className == "schedule_part") {
        let name = entry.firstChild.firstChild.value;
        if (name === "") {throw new Error("Missing Name", {cause : "parse"});}
        let times = [entry.lastChild.children[0].value, entry.lastChild.children[2].value];
        times = times.map(stringValue => createTimeObj(stringValue));
        return {name : name, startTimeDigits: times[0].digits, endTimeDigits: times[1].digits, 
                startTime: times[0].time, endTime: times[1].time};
    } else if (entry.className == "label_block") { //gives obj in the form {name : [periods]}
        let periods = new Array(entry.children.length - 1);
        for (let i = 0; i < periods.length; i++) {
            periods[i] = parseEntry(entry.children[i + 1]);
            if (periods[i] == null) {
                throw new Error("Malformed Div Element", {cause : "parse"});
            }
        }
        return {name : entry.firstChild.firstChild.value, periods: periods};
    } else { //malformed div element
        return null;
    }
}
/**
 * Creates a JSON time
 * @param {String} time "00:00" to "24:00"
 * @returns JSON reprsentative of the time
 */
function createTimeObj(time) {
    if (time.length != 5) {throw new Error("Malformed Time", {cause : "parse"});}
    for (let i = 0; i < 5; i++) {
        if ( (i == 2 && time[i] != ":") || (i != 2 && parseInt(time[i]) == NaN)) {
            throw new Error("Malformed Time", {cause : "parse"});
        }
    }
    let hours = parseInt(time.substring(0,2));
    let min = parseInt(time.substring(3,5));
    if (hours > 24 || min > 59) {
        throw new Error("Malformed Time", {cause : "parse"});
    }
    return {digits : time, time : (3600 * hours + 60 * min)};
}

/**
 * Parses HTML of schedule and transforms into a JSON template
 * @returns array of JSON representing schedule periods
 */
function parseSchedulePeriods() {
    let entries = getScheduleEntries();
    if (entries.length == 0) {return null;}
    let periods = new Array(entries.length);
    let i = 0;
    for (let entry of entries) {
        periods[i] = parseEntry(entry[0]);
        if (periods[i] == null) {return null;}
        periods[i]["intraschedule"] = {};
        periods[i]["intraindex"] = -1;
        if (entry.length > 1) {
            for (let j = 1; j < entry.length; j++) {
                let temp = parseEntry(entry[j]);
                if (temp == null) {return null;}
                periods[i].intraschedule[temp.name] = temp.periods;
            }
        }
        i++;
    }
    return periods;
}
/**
 * parses the name, color, and student checking of the schedule
 * @returns JSON representing the parse
 */
function parseScheduleHeading() {
    let head = scheduleHTML.children[0];
    let name = head.firstChild.children[1].firstChild.value;
    if (name === "") {
        throw new Error("Empty Name", {cause : "parse"});
    }
    return {name : name, color : head.firstChild.children[0].children[0].style.background, 
            needsCheck : head.children[1].children[0].checked, 
            id : head.firstChild.children[1].firstChild.getAttribute("referenceID")};
}

/**
 * Sets the schedule color to the color provided
 * @param {String} color valid css color
 */
function setScheduleColor(color) {
    let scheduleColor = findElements(scheduleHTML, false, "#schedule_head").children[0].children[0].children[0];
    scheduleColor.style.background = color;
}

/**
 * Creates schedule identifier based on epoch time created
 * @returns string representing the identifier
 */
function createUUID() { //JavaScript only supports 32-bit integers, so you have to use built in methods for conversions
    return  (Date.now().toString(32)).toLocaleUpperCase();
}

function breakTime(time){
  return (time.split(":")).map(s => parseInt(s));
}
function sumTotal(total, num) {
  return num + total;
}
function calculateTotalSeconds(arr) {
  return (arr.map( (n, i) => Math.pow(60, arr.length - i) * n)).reduce(sumTotal, 0);
}
