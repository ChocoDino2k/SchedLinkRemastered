//dropdown global variables
var currentSchedule = "000"; //Current schedule selected in the dropdown
var closeDropdown = false; //condition to close the dropdown item list

/**
 * Set schedule data on each calendar day for current month
 * containers - HTML elements containing days on calendar (stored in columns)
 * calendar - global calendar object
 * JSON_calendar - global variable representing JSON object to store in file
 */
function setMonthSchedules(containers) {
    let days = calendar.getFullMonth();
    let sched;
    for (let i = 0; i < 42; i++) {
        let dayParagraphElm = containers[i % 7].children[1].children[Math.floor(i / 7)];
        (JSON_calendar[days[i].year] === undefined)? //get schedule for the day
            sched = "000" : 
            sched = JSON_calendar[days[i].year][days[i].month - 1][days[i].day - 1];
        if (JSON_sched[sched] === undefined) {sched = "000";}
        dayParagraphElm.innerHTML = days[i].day; //set day number
        dayParagraphElm.style = 
            getBackground(JSON_sched[sched].metadata.color, (days[i].month == calendar.currentMonth)); //set day color and background
        
        if (days[i].userData === undefined) {
            days[i].userData = {active: sched, previous: null}
        } else {
            days[i].userData.active = sched;
        }

        dayParagraphElm.onclick = function() { //update schedule information when clicking on day
            if (currentSchedule === days[i].userData.active && days[i].userData.previous != null) { //check if undo
                days[i].userData.active = days[i].userData.previous;
                days[i].userData.previous = currentSchedule;
            } else {
                days[i].userData.previous = days[i].userData.active;
                days[i].userData.active = currentSchedule;
            }
            //update color
            dayParagraphElm.style = 
                getBackground(JSON_sched[days[i].userData.active].metadata.color, (days[i].month == calendar.currentMonth));
            //update JSON
            let year = days[i].year;
            if (JSON_calendar[year] === undefined) { //JSON does not have this year stored
                JSON_calendar[year] = [];
                let daysInMonth = calendar.getYear(days[i].year).getNumberDaysPerMonth();
                for (let k = 0; k < 12; k++) {
                    JSON_calendar[year][k] = [];
                    for (let j = 0; j < daysInMonth[k]; j++) {
                        JSON_calendar[year][k].push("000");
                    }
                }
            }
            JSON_calendar[year][days[i].month - 1][days[i].day - 1] = days[i].userData.active;
        }
    }
}

/**
 * Sets the month heading to current month and year
 * Sets days of month with proper schedule and coloring
 * calendarHTML - global variable reference to calendar in HTML
 * calendar - global Calendar object
 */
function setCurrentMonthDisplay() {
    calendarHTML.children[0].children[1].children[0].textContent = 
        MONTH_NAMES[calendar.currentMonth -1] + " " + calendar.currentYear;
    setMonthSchedules(calendarHTML.children[1].children);
}

/**
 * calculates if the text inside the color needs to be switched (ex. black to white)
 * returns a string for HTML stylesheet
 */
function getBackground(color, inMonth) {
    return "background:radial-gradient(1.5rem circle," + color + " 40%," +  ((inMonth)? "transparent": "var(--secondary-background-color)")  + " 41%);\
    color:var(--container-text-color)";
}

/**
 * Makes HTML for calendar un-hidden
 * Makes schedule HTML hidden
 */
function showCalendarEditor() {
    calendarHTML.classList = "container";
    menuSection.children[0].classList = "menu_options";
    scheduleHTML.classList = "container hidden";
    menuSection.children[1].classList = "menu_options hidden";
}




//----------------------------------------------------------------------------------------------------
//Dropdown stuff

/**
 * Creates an HTML dropdown
 * @param {Array} items HTML items to add to the list of items
 * Default display is first item in the list
 */
function createDropDown(items) {
    let container = createElement("div", ["id", "dropdown_container", "style"]);
    let displayItem = createElement("div", ["id", "dropdown_display_item"]);
    let itemList = createElement("div", ["id", "dropdown_item_list"], ["class", "hidden"]);

    displayItem.appendChild(items[0].cloneNode(true));
    displayItem.onclick = function() { //clicking on dropdown item displays list of items
        itemList.classList = "";
        closeDropdown = false; //because of the order in which the document processes HTML entity clicks, this must be done
    }
    currentSchedule = items[0].getAttribute("scheduleref");
    for (let item of items) {
        itemList.appendChild(item);
        item.classList.add("dropdown_item");
        item.onclick = function() { //clicking on an item replaces it as the current item
            let clone = this.cloneNode(true);
            displayItem.replaceChild(clone, displayItem.children[0]);
            currentSchedule = this.getAttribute("scheduleref");
        }
    }

    container.appendChild(
        createElement("div", ["id", "dropdown_display_item_bounding"], ["children",
            displayItem
        ]));
    container.appendChild(itemList);
    return container;
}

/**
 * Makes the list of dropdown items hidden
 */
function hideDropdown() {
    let elm = findElements(menuSection, false, "#dropdown_item_list");
    elm.classList = "hidden";
    closeDropdown = false;
 }

/**
 * Creates dropdown for the schedules
 */
function createScheduleDropdown() {
    let container;
    let scheduleElements = [];
    for (let key of Object.getOwnPropertyNames(JSON_sched)) {
        container = createElement("div", ["class", "schedule_container"], ["scheduleref", key], ["children", [
            createElement("div", ["class","schedule_color_container"], ["children", 
                createElement("span", ["style"," background:" + JSON_sched[key].metadata.color])
            ]),
            createElement("div", ["class","schedule_text_container"], ["children", 
                createElement("p", ["text" , JSON_sched[key].metadata.name])
            ])
        ]
        ]);
        scheduleElements.push(container);
    }
    window.addEventListener('click', function() {
        if (closeDropdown)
            hideDropdown();
        closeDropdown = true;
    });
    return createDropDown(scheduleElements);
}

/**
 * Adds an item to the dropdown list
 * Automatically makes it the active item
 * @param {HTMLDivElement} dropdown reference to the dropdown element
 * @param {*} item HTML item to add
 */
function appendDropdownItem(dropdown, item) {
    dropdown.children[0].children[0].replaceChild(item.cloneNode(true), dropdown.children[0].children[0].children[0]);
    dropdown.children[1].appendChild(item);
    currentSchedule = item.getAttribute("scheduleref");
}

/**
 * Removes an item fromt the dropdown list
 * By default, makes first item in the list the active item
 * @param {HTMLDivElement} dropdown reference to the dropdown element
 * @param {*} removeItem HTML item to remove
 */
function removeDropdownItem(dropdown, removeItem) {
    for (let item of dropdown.children[1].children) {
        if (item.getAttribute("scheduleref") === removeItem.getAttribute("scheduleref")) {
            dropdown.children[1].removeChild(item);
            dropdown.children[0].children[0].replaceChild(dropdown.children[1].children[0].cloneNode(true),
                dropdown.children[0].children[0].children[0]);
            currentSchedule = dropdown.children[1].children[0].getAttribute("scheduleref");
        }
    }
}

/**
 * Updates items in the dropdown to reflect any changes in JSON_sched
 * @param {HTMLDivElement} dropdown 
 */
function updateDropdown(dropdown) {
    //update list of schedules
    let schedref = "";
    for (let item of dropdown.children[1].children) {
        schedref = item.getAttribute("scheduleref");
        if (JSON_sched[schedref] === undefined) {
            dropdown.children[1].removeChild(item);
        } else {
            item.children[0].children[0].style.background = JSON_sched[item.getAttribute("scheduleref")].metadata.color;
            item.children[1].children[0].textContent = JSON_sched[item.getAttribute("scheduleref")].metadata.name;
        }
    }
    //update item in active display
    schedref = dropdown.children[0].children[0].children[0];
    if (JSON_sched[schedref.getAttribute("scheduleref")] === undefined) {
        dropdown.children[0].children[0].replaceChild(dropdown.children[1].children[0].cloneNode(true),
                dropdown.children[0].children[0].children[0]);
            currentSchedule = dropdown.children[1].children[0].getAttribute("scheduleref");
    } else {
        schedref.children[0].children[0].style.background = JSON_sched[schedref.getAttribute("scheduleref")].metadata.color;
        schedref.children[1].children[0].textContent = JSON_sched[schedref.getAttribute("scheduleref")].metadata.name;
    }
}

//just for funzies
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