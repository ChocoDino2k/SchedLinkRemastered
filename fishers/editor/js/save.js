Object.defineProperty(Object.prototype, 'renameProperty',{
  enumerable: false,
  configurable: false,
  value: function (oldName, newName) {
       // Do nothing if the names are the same
       if (oldName === newName) {
           return this;
       }
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (this.hasOwnProperty(oldName)) {
          this[newName] = this[oldName];
          delete this[oldName];
      }
      return this;
  }
}

);


// Object.prototype.renameProperty = function (oldName, newName) {
//      // Do nothing if the names are the same
//      if (oldName === newName) {
//          return this;
//      }
//     // Check for the old property name to avoid a ReferenceError in strict mode.
//     if (this.hasOwnProperty(oldName)) {
//         this[newName] = this[oldName];
//         delete this[oldName];
//     }
//     return this;
// };

function setPopdown(text){
  let h = findElements(document.body, false, "#popdown");

  if(h == null){
    let cont = createElement("div", ["id","popdown"], ["children",
      [
        createElement("div", ["class","pop_text_container"], ["children", [createElement("p", ["text",text])]])
      ]
    ], ["style", " position: absolute; top:0; left: 50%; transform: translate(-50%, 3vh); padding: 0.25rem 0.5rem; width: 50%; max-width: 10rem; min-width:fit-content; box-shadow:rgb(0 0 0) 0px 2px 12px 0px"]);
    document.body.appendChild(cont);
    h = cont;
  }else{
    document.body.replaceChild(h.cloneNode(true), h);
    h = findElements(document.body, false, "#popdown");
    h.children[0].children[0].innerHTML = text;
    h.classList = "";
  }
  switch (text) {
    case "success":
      h.classList = "success";
      break;
    case "saving":
      h.classList = "saving";
      break;
    default:
      h.classList = "failed";
  }

  return;
}

async function postData(filename, varname, data){
    let myval = "var JSON_" + varname.toLowerCase() + " = " + JSON.stringify(data, null, 2);
    return await $.ajax({
  url: "update.php",
  data: {"variable": myval, "filen": filename},
  type: "POST",
  });

}
async function saveCalendar(){
  setPopdown("saving");
  let p = await postData("json/schedule-calendar.js", "calendar", JSON_calendar);
  setPopdown(p);
  return;
}

async function saveSchedule(){
  setPopdown("saving");
  let s, replace, arr;
  try{
    s = parseSchedule(),
    replace = (s.head.ogn != s.head.name) && s.head.ogn != "",
    arr = [];

    if(s.head.name == "" || checkEmpty(s.content)){
      setPopdown("failed");
      return;
    }

    s.content.splice(0,0,{color: s.head.color, position: Object.getOwnPropertyNames(JSON_sched).length -1});
    swapSections();


    if(s.head.ogn !== "" || replace){

      if(s.head.color == JSON_sched[s.head.ogn][0].color || checkColorAvaiablility(s.head.color)){
        s.content[0].position = JSON_sched[s.head.name][0].position;
        if(replace){
          JSON_sched.renameProperty(s.head.ogn, s.head.name);
        }
      }

    }else if(!checkColorAvaiablility(s.head.color)){
      setPopdown("not a viable color");
      return;
    }


    JSON_sched[s.head.name] = s.content;

    reloadDrop();
    reloadCalendar(replace, s.head.ogn, s.head.name);
    useableColors = setAvailableColors();
    
    let p = await postData("json/schedules.js","sched", JSON_sched);
    setPopdown(p);
    if(p == "success"){
      swapSections();
      swapShown();
    }

  }catch(e){
    setPopdown("failed");
    console.log(e);
    return;
  }
  return;
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
async function removeSchedule(){
  setPopdown("saving");
  try{
    let sched = findElements(document.body, false, "#schedule_head").children[0].children[1].children[0].getAttribute("originalName");
    if(JSON_sched[sched] != undefined && sched != "Unscheduled"){
      delete JSON_sched[sched];
      swapSections();
      reloadDrop();
      reloadCalendar(true, sched, "Unscheduled");
      await postData("json/filler.js", "calendar", JSON_calendar);
      swapSections();
      let p = await postData("json/schedules.js","sched", JSON_sched);
      setPopdown(p);
      if(p == "success"){
        swapShown();
      }else{
        setPopdown("could not delete");
      }
    }else{
      setPopdown("could not delete");
    }
  }catch(e){
    setTimeout(setPopdown, 10, "could not delete");
  }

}

function reloadDrop(){
  let drop = mSection.children[0].children[0];
  replaceDropdownContent(drop, createScheduleOptions());
}
function reloadCalendar(nameChange = false, ogn = null, name = null){
  if(nameChange){
    for(let year in JSON_calendar){
      for(let m in JSON_calendar[year]){
        for(let i=0; i < JSON_calendar[year][m].length; i++){
          if(JSON_calendar[year][m][i] == ogn)
            JSON_calendar[year][m][i] = name;
        }
      }
    }
    setUserData(true);
  }
  replaceDays();
}
