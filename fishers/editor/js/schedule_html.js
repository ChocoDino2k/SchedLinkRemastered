var useableColors = setAvailableColors();

function swapShown(){
  mSection.classList.toggle("hidden");
  eSection.classList.toggle("hidden");
  swapSections();
  mSection.classList.toggle("hidden");
  eSection.classList.toggle("hidden");
}

function createScheduleHead(name = ""){
  let container = createElement("div", ["class","schedule_container edit"],
  ["children",
    [
      createElement("div",["class","schedule_color_container"],
      ["children",
        [
          createElement("span", ["style"," background:" + ((name == "")? useableColors[0] : JSON_sched[name][0].color) ], ["starting_color", ((name == "")? useableColors[0] : JSON_sched[name][0].color)])
        ]
      ]),
      createElement("div",["class","schedule_text_container"],
      ["children",
        [
          createElement("input", ["type","text"], ["value" , name], ["placeholder","Schedule Name"], ["originalName", name])
        ]
      ])
    ]
  ]);

  return container;
}
function createScheduleMain(period = {name:"", ST: "", ET:""}, includeAdd = true, isBlock = false){
  return createElement("div",["class","schedule_part"],["children",
    [
      createPeriodHeading(period.name, includeAdd, isBlock),
      createPeriodTime(period)
    ]
  ]);
}
function createPeriodHeading(name = "", includeAdd = false, isBlock = false){
  return createElement("div", ["class", "period_heading"], ["children",
    [
      createElement("input",["type","text"],["placeholder","Name"],["value",name]),
      createScheduleButtons(includeAdd, !isBlock)
    ]
  ])
}
function createPeriodTime(period = {ST: "", ET: ""}){
  return createElement("div", ["class", "period_time"], ["children",[
  createElement("input", ["type", "text"], ["value",  period.ST], ["placeholder","00:00"], ["maxlength","5"]),
  createElement("p", ["text", "-"] ),
  createElement("input", ["type", "text"], ["value",  period.ET], ["placeholder","24:00"], ["maxlength","5"])
  ] ]
  );
}
function createScheduleButtons(includeBoth = false, whole = false){
  return createElement("div",["class", "operation_container"],
  ["children",
    [
      createElement("img", ["src","/global/images/trash_can.svg"], ["onclick", "removePart(this," + whole + ")"]),
      ((includeBoth) ? createElement("img", ["src", "/global/images/plus_sign.svg"], ["onclick","addPart(this, " + !whole + ", true)"]) : null )
    ]
  ]);
}
function createScheduleLabelBlock(name = "", subParts = []){
  let block = createElement("div", ["class","label_block"], ["children",
  [createPeriodHeading(name, true, true)]
  ]);
  for(let part of subParts){
    block.appendChild(createScheduleMain(part, false, true));
  }

  return block;
}
function fillSchedule(name = ""){
  let head = eSection.children[0],
  body = eSection.children[1],
  container;

  if(name == "" || JSON_sched[name] == undefined){
    head.appendChild(createScheduleHead());
    body.appendChild(createElement("div", ["class","part_container"], ["children",[createScheduleMain()]]));
  }else{
    head.appendChild(createScheduleHead(name));
    for(let i=1; i < JSON_sched[name].length; i++){
      container = createElement("div", ["class","part_container"]);
      container.appendChild(createScheduleMain(JSON_sched[name][i]));
      if(JSON_sched[name][i].sub != undefined){
        for(let key of Object.getOwnPropertyNames(JSON_sched[name][i].sub) ){
            container.appendChild(createScheduleLabelBlock(key, JSON_sched[name][i].sub[key]));
        }
      }

      body.appendChild( container );
    }
  }
}

function removePart(img, whole = false){
  if(whole)
  img.parentNode.parentNode.parentNode.parentNode.remove();
  else
  img.parentNode.parentNode.parentNode.remove();
}
function addPart(el, isBlock = false, inBody = false){
  if(inBody){
    if(isBlock){
      el.parentNode.parentNode.parentNode.appendChild(createScheduleMain({name:"", ST: "", ET:""}, false, true))
    }else{
      el.parentNode.parentNode.parentNode.parentNode.appendChild(createScheduleLabelBlock());
    }
  }else{
    eSection.children[1].appendChild(createElement("div", ["class","part_container"], ["children", [createScheduleMain()]]));
  }
}
function clearSchedule(){
  for(let i =0; i < 2; i++){
    while(eSection.children[i].firstChild){
      eSection.children[i].removeChild(eSection.children[i].firstChild);
    }
  }
}
function edit(isNew = true){
  swapShown();
  clearSchedule();
  fillSchedule( ((isNew)? "" : dropdownRef[0].children[1].children[0].innerHTML) );
}
function toStringTime(hm){
  return (hm.map(s => (s < 10)? "0" + s: "" + s)).join(":");
}
function toNumberTime(time){
  return (time.split(":")).map(s => parseInt(s));
}



// saving/removing schedule
// ________________________________________________________________________________
function getParts(){
  let children = findElements(document.body, false, "#schedule_body").children,
  arr = [];
  for(let child of children){
    arr.push({c:child, multipleChildren: child.children.length > 1})
  }
  return arr;
}
function parsePart(p){
  let nc = findElements(p, false, ".period_heading"),
  tc = findElements(p, false, ".period_time"),
  tcc = findElements(tc, true, "input");
  return {name: findElements(nc, false, "input").value, ST: tcc[0].value, ET: tcc[1].value };
}
function parseBlock(b){
  let nc = findElements(b, false, ".period_heading"),
  sc = findElements(b, true, ".schedule_part"),
  obj = {name: findElements(nc, false, "input").value, sub: []};

  for(child of sc){
    obj.sub.push(parsePart(child));
  }


  return obj;
}
function parseSchedule(){
  let heading = findElements(document.body, false, "#schedule_head").children[0].children,
  parts = getParts().map(p => mapPart(p));

  return {head: {color: heading[0].children[0].style.background, name: heading[1].children[0].value, ogn:heading[1].children[0].getAttribute("originalName") }, content: parts};
}
function mapPart(p){
  let obj = {};
  obj = parsePart(p.c.children[0]);
  obj["sub"] = {};
  obj["hasSub"] = p.multipleChildren;
  if(p.multipleChildren){
    let b;
    for(let i=1; i < p.c.children.length; i++){
        b = parseBlock(p.c.children[i]);
        obj["sub"][b.name] = b.sub;
    }
  }

  return obj;
}
function realBkgColor(elem){
    let outer = elem.outerHTML.replace(/\s/g,'');
    let tag = outer.split('<'+elem.tagName).pop().split('>')[0];
    let style = tag.split('style="').pop().split('"')[0];
    let color = style.split('background:').pop().split(';')[0];
    return color;
}


function createColors(){
  let list = [],
  hue = [];
  for(let h = 0; h <= 330; h+= 33){
    for(let l = 50; l >= 25; l-= 25)
        for(let s=100; s >= 40; s-= 30){
                list.push(hueToRGB(h,s,l));
              }
            }
    for(let i =100; i >= 0; i-= 20){
      list.push(hueToRGB(0,0,i));
    }
  return list;
}
// function arrToHue(h,s,l){
//   return "hsl(" + h + "," + s + "%," + l + "%)";
// }
// function showColors(){
//   let cont = findElements(mSection, false, "#color_picker");
//   if(cont !== null){
//     for(let c of createColors()){
//       cont.appendChild( createElement("div", ["class","color"], ["style", "background: " + c]) );
//     }
//   }
// }
function setAvailableColors(){
  let bl = Object.getOwnPropertyNames(JSON_sched).map(n => {return JSON_sched[n][0].color}),
  colors = createColors(),
  l = [];
  let found;
  for(let c of colors){
    found = false;
    for(let i=0; i < bl.length; i++){
      if(c == bl[i]){
        bl.splice(i, 1);
        found = true;
        break;
      }
    }
    if(!found)
    l.push(c);
  }
  return l;
}

function checkColorAvaiablility(color){
  let found = false;
  for(let i=0; i < useableColors.length; i++){
    if(color == useableColors[i]){
      found = true;
      break;
    }
  }
  return found;
}

function swapColors(el){
  let h= findElements(eSection, false, "#schedule_head").children[0].children[0].children[0];
  if(h.getAttribute("starting_color") == el.style.background || checkColorAvaiablility(el.style.background)){
    // useableColors[useableColors.indexOf(el.style.background)] = h.style.background;
    h.style.background = el.style.background;
  }else{
    let bl = Object.getOwnPropertyNames(JSON_sched);
    for(n of bl){
      if (el.style.background == JSON_sched[n][0].color){
        console.log(n);
      }
    }
  }
}
function hueToRGB(h,s,l){
  h = parseFloat(h);
  s = parseFloat(s);
  l = parseFloat(l);
  if( h<0 ) h=0;
  if( s<0 ) s=0;
  if( l<0 ) l=0;
  if( h>=360 ) h=359;
  if( s>100 ) s=100;
  if( l>100 ) l=100;
  s/=100;
  l/=100;
  let C = (1-Math.abs(2*l-1))*s;
  let hh = h/60;
  let X = C*(1-Math.abs(hh%2-1));
  let r = g = b = 0;
  if( hh>=0 && hh<1 )
  {
    r = C;
    g = X;
  }
  else if( hh>=1 && hh<2 )
  {
    r = X;
    g = C;
  }
  else if( hh>=2 && hh<3 )
  {
    g = C;
    b = X;
  }
  else if( hh>=3 && hh<4 )
  {
    g = X;
    b = C;
  }
  else if( hh>=4 && hh<5 )
  {
    r = X;
    b = C;
  }
  else
  {
    r = C;
    b = X;
  }
  let m = l-C/2;
  r += m;
  g += m;
  b += m;
  r *= 255.0;
  g *= 255.0;
  b *= 255.0;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  // let hex = r*65536+g*256+b;
  // hex = hex.toString(16,6);
  // len = hex.length;
  // if( len<6 )
  //   for(i=0; i<6-len; i++)
  //     hex = '0'+hex;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
