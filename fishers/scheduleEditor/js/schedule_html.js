var scheduleHTML = findElements(document.body, "false", "#schedule_view", "#schedule_head","#schedule_body");

function createSchedHead(){
  let child = dropdownRef[0].cloneNode(true);
  child.classList = "schedule_container schedule_display";
  return child;
}
function createSchedRow(period, isSub = false){
var nameRow = createElement("div", "class::period_name", "children::", createElement("p", "text::" +  period["name"])),
bodyRow = createElement("div", "class::period_time", "children::",[
createElement("p", "text::" +  toStringTime([period["SHours"], period["SMin"]])),
createElement("p", "text::-" ),
createElement("p", "text::" +  toStringTime([period["EHours"], period["EMin"]]))
]
),
row = createElement("div", "class::name_body_container"  + ((isSub)? " sub": ""), "children::", [nameRow, bodyRow]);


return row;

}
function loadSchedule(sched){
  scheduleHTML[1].appendChild(createSchedHead());
  for(let p of sched){
    scheduleHTML[2].appendChild(createSchedRow(p));
    if(p["lunches"] !== undefined && p["lunches"] !== null){
      for(let l in p["lunches"]){
        for(let stupid of p["lunches"][l]){
          if(stupid instanceof Object)
            scheduleHTML[2].appendChild(createSchedRow(stupid, true));
        }
      }
    }
  }
}
function clearSchedule(){
    replaceElementsWith(scheduleHTML[0],[
      scheduleHTML[1].cloneNode(),
      scheduleHTML[2].cloneNode()
    ]);
    scheduleHTML = findElements(document.body, "false", "#schedule_view", "#schedule_head","#schedule_body");
}
function toStringTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}
function toNumberTime(time){
  return (time.split(":")).map(s => parseInt(s));
}
dropdownUpdated = function(){
    clearSchedule();
    loadSchedule(JSON_schedule[dropdownRef[0].children[1].children[0].innerHTML]);
};
dropdownLoaded = function(){
  loadSchedule(JSON_schedule[dropdownRef[0].children[1].children[0].innerHTML]);
};
