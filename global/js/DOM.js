//returns HTML element specified. Can overload arguments to give the element attributes. Syntax is "attr:value"
function createElement(type){
    let elm = document.createElement(type),
    a;
    for(let i = 1; i < arguments.length; i++){
      a = arguments[i].split("::");
      switch (a[0]) {
        case "text":
          elm.innerHTML = a[1];
          break;
        case "children":

          if(arguments[i+1] instanceof Array){
            for(let e of arguments[i+1]){
              elm.appendChild(e);
            }
          }else{
            elm.appendChild(arguments[i+1]);
          }
          i++;
          break;
        default:
        elm.setAttribute(a[0], a[1]);
      }
    }
    return elm;
}
//returns all HTML elements within the parent. findAll specifies if all elements of the same name should be found. Overload arguments with element(s) descriptor
function findElements(parent, findAll, desc){
  if(parent == undefined || desc == undefined){return;}
  let elms = [];
  for(let i = 2; i < arguments.length; i++){
    if(findAll){
      let q = parent.querySelectorAll(arguments[i]);
      for(let thing of q){
        elms.push(thing);
      }
    }else{
      elms.push(parent.querySelector(arguments[i]));
    }
  }

  return (elms.length > 1)? elms : elms[0];
}
function replaceElementsWith(parent, newNodes){
  for(let i=0; i < newNodes.length; i++){
    parent.replaceChild(newNodes[i],parent.children[i]);
  }
}







function createDropDown(nodeList, maxShow = 3){
  let table = createElement('table', 'style::border-collapse: collapse;'),
  thead = createElement('thead'),
  tbody = createElement('tbody', 'style:: visibility:collapse'),
  wrapper = createElement('div', 'class:: dropdown_wrapper', 'style:: width: fit-content;display: inline-block;line-height: 0;position: relative;box-sizing: content-box;'),
  overflowContainer = createElement('div', 'class:: overflow_container',  'style::position: absolute;width: max-content;cursor: pointer;overflow:auto;')
  tr = createElement('tr'),
  closeDropdown = true;
  var comp;
  var r = function(n){
    return function(){
    thead.replaceChild(n.cloneNode(true), thead.children[0]);
    window.dropdownRef = getDropDownCurrentNode();
    dropdownUpdated();
    closeDropdown = true;
    };
  };
  for(let node of nodeList){
    node.classList += ' drop_itm';
    node.addEventListener('click', r(node));
    tr.appendChild( node );
  }

  thead.onclick = function(){
      overflowContainer.style.height = "";
      overflowContainer.style.overflow = "auto";
      tbody.style = "";
      closeDropdown = false;
  }


  tbody.appendChild(tr);
  thead.appendChild( ( (tr.cloneNode()).appendChild(  nodeList[0].cloneNode(true)  ) )  );
  table.appendChild(thead);
  table.appendChild(tbody);
  overflowContainer.appendChild(table);
  wrapper.appendChild(overflowContainer);
  window.addEventListener('load', function size(){
    comp = window.getComputedStyle(thead);
    wrapper.style.width = comp.width;
    wrapper.style.height = comp.height;
    overflowContainer.style.maxHeight = (parseInt( (comp.height.split("px")[0]) ) * maxShow * 1.2) + "px";
    overflowContainer.style.height = parseInt( (comp.height.split("px")[0]) ) + "px";
    //global variables to check if a new option has been selected
    window.dropdownRef = getDropDownCurrentNode();
    this.removeEventListener('load', size);
  });
  window.addEventListener('resize', function size(){
    comp = window.getComputedStyle(thead);
    wrapper.style.width = comp.width;
    wrapper.style.height = comp.height;
    overflowContainer.style.maxHeight = (parseInt( (comp.height.split("px")[0]) ) * maxShow * 1.2) + "px";
    if(closeDropdown){overflowContainer.style.height = parseInt( (comp.height.split("px")[0]) ) + "px";}
  });
  window.addEventListener('click', function(){
     if(closeDropdown){
    overflowContainer.style.overflow = "hidden";
    overflowContainer.style.height = parseInt( (comp.height.split("px")[0]) ) + "px";
    overflowContainer.scrollTop = 0;
    tbody.style = "visibility:hidden";
     }
     closeDropdown = true;
  });
  var addRule = (function (style) {
      var sheet = document.head.appendChild(style).sheet;
      return function (selector, css) {
          var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
              return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
          }).join(";");
          sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
      };
  })(document.createElement("style"));
addRule(".overflow_container::-webkit-scrollbar",{
  display: "none"
});

  return wrapper;
}

function getDropDownCurrentNode(){
  let drop = findElements(document.body, false, ".dropdown_wrapper");
  if(drop){
    return drop.children[0].children[0].children[0].children;
  }else{
    return;
  }
}
function dropdownUpdated(){return;}
