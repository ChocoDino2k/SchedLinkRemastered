/**
 * creates and displays a popdown that displays the saving status
 * text - promise text status
 */
function setPopdown(text){
    let popdown = findElements(document.body, false, "#popdown");
  
    if(popdown == null){
      let container = createElement("div", ["id","popdown"], ["children",
        [
          createElement("div", ["class","pop_text_container"], ["children", [createElement("p", ["text",text])]])
        ]
      ], ["style", " position: absolute; top:0; left: 50%; transform: translate(-50%, 3vh); padding: 0.25rem 0.5rem; width: 50%; max-width: 10rem; min-width:fit-content; box-shadow:rgb(0 0 0) 0px 2px 12px 0px"]);
      document.body.appendChild(container);
      popdown = container;
    }else{
      document.body.replaceChild(popdown.cloneNode(true), popdown);
      popdown = findElements(document.body, false, "#popdown");
      popdown.children[0].children[0].innerHTML = text;
      popdown.classList = "";
    }
    switch (text) {
      case "success":
        popdown.classList = "success";
        break;
      case "saving":
        popdown.classList = "saving";
        break;
      default:
        popdown.classList = "failed";
    }
  }

/**
 * save JSON_calendar to schedule-calendar.js
 */
const saveCalendar = async function () {
    setPopdown("saving");

    /**
     * TODO: implement functionality to decrease chance of uploading stale data
     * Current assumption is one person at a time is editing the schedules
     * solution? pull latest version and update changes as needed??
     */

    let payload = "var JSON_calendar = " + JSON.stringify(JSON_calendar, null, 1);
    let status = await $.ajax({
        url: "update.php",
        data: {"variable": payload, "filen": "json/schedule-calendar.js"},
        type: "POST",
    });
    setPopdown(status);
    return status;
}

const saveSchedule = async function () {
    setPopdown("saving");
    let status = "failure";
    try {
        let scheduleBody = parseSchedulePeriods();
        let scheduleHead = parseScheduleHeading();
        let newSchedule = (scheduleHead.id === "");
        const id = (newSchedule)? createUUID() : scheduleHead.id;
        //check if chosen a color
        if (scheduleHead.color == "transparent") {
            throw new Error("Please choose a color", {cause : "collision"});
        }
        //check if the chosen color is available
        Object.entries(JSON_sched).forEach( ([key, value]) => {
            if (key != id && value.metadata.color == scheduleHead.color) {
                throw new Error(`Color is used by ${value.metadata.name}`, {cause : "collision"});
            }
        });


        delete scheduleHead.id;
        JSON_sched[id] = {metadata: scheduleHead, periods: scheduleBody};

        let payload = "var JSON_sched = " + JSON.stringify(JSON_sched, null, 1);
        let status = await $.ajax({
            url: "update.php",
            data: {"variable": payload, "filen": "json/schedules.js"},
            type: "POST",
        });
        //update dropdown
        if (newSchedule) {
            appendDropdownItem(findElements(menuSection, false, "#dropdown_container"), 
                createElement("div", ["class", "schedule_container"], ["scheduleref", id], ["children", [
                    createElement("div", ["class","schedule_color_container"], ["children", 
                        createElement("span", ["style"," background:" + JSON_sched[id].metadata.color])
                    ]),
                    createElement("div", ["class","schedule_text_container"], ["children", 
                        createElement("p", ["text" , JSON_sched[id].metadata.name])
                    ])
                ]
                ]));
        } else {
            updateDropdown(findElements(menuSection, false, "#dropdown_container"));
        }
    } catch (e) {
        if (e.cause == "collision" || e.cause == "parse") {
            window.alert(e.message);
        }
        console.error(e);
        setPopdown("failure");
        return;
        //throw new Error(e);
    }

    setPopdown("success");
    setCurrentMonthDisplay();
    showCalendarEditor();
}

const removeSchedule = async function () {
    let copy = JSON_sched[currentSchedule];
    let copyId = currentSchedule;
    if (copyId == "000") {
        window.alert("Forbidden Deletion");
        setPopdown("failure");
        return;
    }
    delete JSON_sched[currentSchedule];
    try {
        //update file
        let payload = "var JSON_sched = " + JSON.stringify(JSON_sched, null, 1);
        let status = await $.ajax({
            url: "update.php",
            data: {"variable": payload, "filen": "json/schedules.js"},
            type: "POST",
        });
        updateDropdown(findElements(menuSection, false, "#dropdown_container"));
        setCurrentMonthDisplay();
    } catch (e) {
        console.error(e);
        JSON_sched[copyId] = copy;
        currentSchedule = copyId;
        setPopdown("failure");
        return;
    }

    setPopdown("success");
    showCalendarEditor();
}

function checkEmpty(parts){
    for(let part of parts){
      if(part.name == "" || part.ST == "" || part.ET == ""){
        return true;
      }
      if(part.hasSub){
        for(let sub in part.sub){
          if(sub == "" || checkEmpty(part.sub[sub])){
            return true;
          }
        }
      }
    }
    return false;
  }