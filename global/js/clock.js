function newDateAdjusted() {
  return new Date(
      Date.now() // user's clock
    + (1000*secOffset) + (60000*minOffset) + (3600000*hourOffset) // because it's easier to do this than fix the off-by-one error
  );
}

var secOffset = -1;
var minOffset = 0;
var hourOffset = 0;

var now = newDateAdjusted();
var pageLoadDate = now.toISOString().split('T')[0];
var schedName;
if(JSON_calendar[now.getFullYear()] == undefined){
  schedName = "Unscheduled";
}else{
  schedName = JSON_calendar[now.getFullYear()][now.getMonth()][now.getDate() - 1];
}
var schedule = JSON_sched[schedName];


var updateClockFrame = 0;

var b;

var displayAll = true;
var displayData = {
  items: {
    timer: {value: '--:--', elementId: 'countdown__timer', property: 'textContent'},
    progressBar: {value: '0%', elementId: 'countdown__progress', property: 'width'},
    periodName: {value: '\u00a0', elementId: 'period__header', property: 'value'},
    periodTime: {value: 'Loading', elementId: 'period__time', property: 'textContent'}
  },
  paint: function(updateAll) {
    for(let key in this.items){
      if(!updateAll && (key == "periodName" || key == "periodTime")){continue;}
      switch (this.items[key].property) {
        case "textContent":
          findElements(document.body, false, "#" + this.items[key].elementId).innerHTML = this.items[key].value;
          break;
        case "value":
        let stor = null;
        if(key == "periodName"){
          let local = JSON.parse(window.localStorage.getItem("renamed"))[schedName],
          dCur = gallery.dots[gallery.current];
          if(local != undefined && dCur != undefined){
            let compare = (dCur.subGals != undefined && dCur.current != 0)? "" + [gallery.current, dCur.current, dCur.subGals[dCur.current].current] : "" + [gallery.current, dCur.current, 0];
            for(let n of local){
              if(n[compare] != undefined){
                stor = n[compare];
                break;
              }
            }
          }
        }
          findElements(document.body, false, "#" + this.items[key].elementId).value = (stor != null)? stor: this.items[key].value;
          break;
        case "width":
          findElements(document.body, false, "#" + this.items[key].elementId).style.width = this.items[key].value;
          break;
        default:
          findElements(document.body, false, "#" + this.items[key].elementId).innerHTML = this.items[key].value;
      }
    }
  }
};

var gallery = {
  dots: [],
  current: -1,
  activeHTML: [],
  fillDots: function(){
    for(let part in schedule){
      if(part == "0"){continue;}
      if(!schedule[part].hasSub){
        this.dots.push( {showDot:true, sched: schedule[part], htmlRef: createElement('button', ["class", "gallery-dot"]),  current: 0} );
      }else{

        this.dots.push( {showDot: true, sched: schedule[part], htmlRef: createElement('button', ["class", "gallery-dot"]), current: 0, subGals: {}
         } );
         let lastDot = this.dots[this.dots.length-1];
         for(let key in schedule[part].sub){
          lastDot.subGals[key] =  {dots: schedule[part].sub[key], current: 0};
          for(let d of lastDot.subGals[key].dots){
            d.htmlRef = createElement('button', ["class", "gallery-dot"]);
          }
         }
      }
    }
  },
  updateHTMLDots: function(){
    this.activeHTML = [];
    for(let part of this.dots){
      if(part.showDot){
      this.activeHTML.push(part.htmlRef);
      }
    }
  }
};

function updateClock(){
  now = newDateAdjusted();
  // console.log(now);
  curTotalSec = (now.getHours() * 60*60) + now.getMinutes()*60 + now.getSeconds();
  if (pageLoadDate != now.toISOString().split('T')[0]) {
    // new day
    window.location.reload();
    return;
  }
}
function getTimeRemaining(gal, idx){
  let cur = (idx != undefined)? idx : gal.current,
  part = (gal.dots[cur].sched != undefined)? gal.dots[cur].sched : gal.dots[cur],
  tf = {s:breakTime(part.ST), e:breakTime(part.ET)},
  start = tf.s[0] * 60 + tf.s[1],
  end = tf.e[0] * 60 + tf.e[1];
  if(curTotalSec > end*60){return [-1, true];}
  return (curTotalSec < start*60)? [start*60 - curTotalSec, true] : [end*60 - curTotalSec, false];

}
function updateCurrentDot(){
  let curDot = gallery.dots[gallery.current];
  if(!curDot){return;}
    for(let dot of gallery.activeHTML){
      if(dot.classList.contains("active")){
        dot.classList.remove("active");
        break;
      }
    }
    gallery.activeHTML[gallery.current].classList.add("active");
}
function updateDotGallery(){
  gallery.updateHTMLDots();
  let pGal = findElements(document,false,  "#period__gallery");
  while(pGal.firstChild){
    pGal.removeChild(pGal.firstChild);
  }
  for(let dot of gallery.activeHTML){
    pGal.appendChild(dot);
  }
  updateCurrentDot();
}
function updateSubShow(gal){
  let curDot = gal.dots[gal.current];
  if(!curDot){return;}
  if(curDot.subGals != undefined){
    replaceElementsWith( b, [createSubChoices()]  );
    b.classList = "";
    if(curDot.current != 0){

        for(let choice of b.children[0].children){
          if(choice.innerHTML == curDot.current){
            choice.classList.add("active");
            break;
          }
        }

    }
  }else if(curDot.sched != undefined){
    b.classList = "hidden";
  }
}
function createSubChoices(){
  let div = createElement("div",["class","row"], ["id","sub_choose"]),
  curDot = gallery.dots[gallery.current],
  btn;
  for(let key in curDot.subGals){
    btn = createElement("button", ["class","container hover"], ["text", key]);
    btn.onclick = function(){
      displayAll = true;
      if(key != curDot.current){


      let sub = curDot.subGals[key],
      found = false;
      for(let i = 0; i < sub.dots.length; i++){
        if(getTimeRemaining(sub, i)[0] > -1){
          sub.current = i;
          found = true;
          break;
        }
      }
      if(!found && curDot.current != 0){
        sub.current = Math.round(scale_number(curDot.subGals[curDot.current].current, 0, curDot.subGals[curDot.current].dots.length, 0, sub.dots.length));
      }
      curDot.current = key;
    }else{
      curDot.current =0;
    }
    for(let choice of this.parentNode.children){
      if(choice.classList.contains("active") || choice == this){
        choice.classList.toggle("active");
      }
    }
      updateDotGallery();
    };
    div.appendChild(btn);
  }

  return div;
}

function init(){
  b = findElements(document.body, false, "#sub");
  updateClock();
  gallery.fillDots();
  // findElements(document.body, false, "#period__header").classList.add('active');
  // findElements(document.body, false, "#period__header").removeAttribute('readonly');
  findElements(document.body, false, "#period__header").addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
      document.activeElement.blur();
    }
  });
(function(){
  for(let i =0; i < gallery.dots.length; i++){
    if(gallery.dots[i].showDot){
      let tr = getTimeRemaining(gallery, i);
      if(tr[0] > -1){
        gallery.current = (i == 0 && tr[1])? -1: i;
        if(gallery.dots[i].current != 0 && gallery.dots[i].subGals != undefined){
          let sub = gallery.dots[i].subGals[gallery.dots[i].current];
          for(let i =0; i < sub.dots.length; i++){
            if(getTimeRemaining(sub, i)[0] > -1){
              sub.current = i;
              return;
            }
          }
        }

        return;
      }
    }
  }
})();
  curDot = gallery.dots[gallery.current];
updateDotGallery();
updateCurrentDot();
updateSubShow(gallery);
loop();
}

function loop(){
  updateClock();
  let curDot = gallery.dots[gallery.current];

  if(curDot){
  let tf;
  if(curDot.current != 0 && curDot.subGals != undefined){
    tf = getTimeRemaining(curDot.subGals[curDot.current]);
  }else{
    tf = getTimeRemaining(gallery);
  }
  if(tf[0] == 0){
    updatePeriod(gallery, 1, false);
    displayAll = true;
  }
  if(curDot.current != undefined && curDot.current != 0){
    curDot =  curDot.subGals[curDot.current].dots[curDot.subGals[curDot.current].current];
  }else{
    curDot = curDot.sched;
  }
  if(displayAll){
    displayData.items["periodTime"].value  = to12H(curDot.ST) + " - " + to12H(curDot.ET);
    displayData.items["periodName"].value = curDot.name;
  }

  displayData.items["timer"].value = (tf[0] > 0 )? joinTime( (tf[0] > 60*60)? [Math.trunc(tf[0]/60/60), Math.trunc(tf[0]/60%60), tf[0]%60 ] : [Math.trunc(tf[0]/60%60), tf[0]%60] ): "--:--";
  let endTime = breakTime(curDot.ET),
  startTime = breakTime(curDot.ST);

  displayData.items["progressBar"].value = (tf[1])? "0%" :( (1 - (tf[0]/ (( endTime[0]*60*60 + endTime[1]*60 + endTime[0] ) - ( startTime[0]*60*60 + startTime[1]*60 + startTime[0] )  ))) * 100) + "%";
  displayData.paint(displayAll);
  displayAll = false;
}else{
  displayData.items["timer"].value = "--:--";
  displayData.items["progressBar"].value = '0%';
  displayData.items["periodTime"].value  = "Not School Hours";
  displayData.items["periodName"].value = "Not School Hours";
  displayAll = true;
  displayData.paint(displayAll);
}
  window.cancelAnimationFrame(updateClockFrame);
  updateClockFrame = window.requestAnimationFrame(loop);

}
function updatePeriod(gal, dir, wrap){
  dir /= Math.abs(dir);
  //checks if adding dir will cause out of bounds
  let outOfBounds = (gal.dots[gal.current + dir] == undefined);
  //checks if current index is already out of bounds
  if(gal.dots[gal.current] == undefined){
    if(!outOfBounds){
    gal.current += dir;
    displayAll = true;
    updateCurrentDot();
  }
    return (gal.dots[gal.current] == undefined);
  }

  //checks if the current part has sub parts
  let curDot = gal.dots[gal.current],
  hasSub = curDot.subGals != undefined;
  if(hasSub && curDot.current != 0){
      if(updatePeriod(curDot.subGals[curDot.current], dir, false)){
        if(!outOfBounds){
          gal.current += dir;
          displayAll = true;
        }
        updateSubShow(gal);
      }
  }else if(!outOfBounds){
    gal.current += dir;
    displayAll = true;
    updateSubShow(gal);
  }
  updateCurrentDot();
  return outOfBounds;
}

function joinTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}
function breakTime(time){
  return (time.split(":")).map(s => parseInt(s));
}
function to12H(time){
  let t = breakTime(time);
  return joinTime([ ((t[0] > 12)? t[0]%12: t[0]), t[1]]);
}
function scale_number(num, from_min, from_max, to_min, to_max){
    if(from_min != from_max && to_min != to_max){
      return (((  num - from_min ) * (to_max - to_min)) / (from_max - from_min)) + to_min;
    }else{
      return to_min;
    }
}
function savePeriodName(inpt){
  let local = JSON.parse(window.localStorage.getItem("renamed"));
  if(local[schedName] != undefined){
    let dCur = gallery.dots[gallery.current];
    if(dCur == undefined){return;}
    let compare = (dCur.subGals != undefined && dCur.current != 0)? "" + [gallery.current, dCur.current, dCur.subGals[dCur.current].current] : "" + [gallery.current, dCur.current, 0];
    for(let n of local[schedName]){
      if(n[compare] != undefined){
        n[compare] = inpt.value;
        break;
      }
    }
    local[schedName].push( makeObj([compare, inpt.value]) );
    window.localStorage.setItem("renamed", JSON.stringify(local));
  }else{
    local[schedName] = [];
    window.localStorage.setItem("renamed", JSON.stringify(local));
    savePeriodName(inpt);
  }
}
function makeObj(){
  let obj = {};
  for(let arg of arguments){
    obj[arg[0]] = arg[1];
  }
  return obj;
}
