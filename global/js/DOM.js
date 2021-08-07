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
  let table = createElement('table', 'style::border-collapse: collapse;box-sizing: border-box;'),
  thead = createElement('thead'),
  tbody = createElement('tbody', 'style:: visibility:collapse'),
  wrapper = createElement('div', 'class:: dropdown_wrapper', 'style:: width: fit-content;display: inline-block;line-height: 0;position: relative;box-sizing: border-box;'),
  overflowContainer = createElement('div', 'class:: overflow_container',  'style::position: absolute;top: 0;left: 0;width: max-content;cursor: pointer;overflow:auto;box-sizing: border-box;')
  tr = createElement('tr');

  for(node of nodeList){
    node.classList += ' drop_itm';
    tr.appendChild( node );
  }
  tbody.appendChild(tr);
  thead.appendChild( ( (tr.cloneNode()).appendChild(  nodeList[0].cloneNode(true)  ) )  );
  table.appendChild(thead);
  table.appendChild(tbody);
  overflowContainer.appendChild(table);
  wrapper.appendChild(overflowContainer);


  window.addEventListener('load', function size(){
    let comp = window.getComputedStyle(thead);
    wrapper.style.width = comp.width;
    wrapper.style.height = comp.height;
    overflowContainer.style.maxHeight = (parseInt( (comp.height.split("px")[0]) ) * maxShow * 1.2) + "px";
    this.removeEventListener('load', size);
  });
  window.addEventListener('resize', function size(){
    let comp = window.getComputedStyle(thead);
    wrapper.style.width = comp.width;
    wrapper.style.height = comp.height;
    overflowContainer.style.maxHeight = (parseInt( (comp.height.split("px")[0]) ) * maxShow * 1.2) + "px";
  });
  window.addEventListener('click', function(event){
    let style = "visibility:collapse";
    if(event.target.classList.contains('drop_itm')){
      if(event.target.parentNode == thead){
        overflowContainer.style.width =  window.getComputedStyle(thead).width;
        style = "";
      }
        thead.replaceChild(event.target.cloneNode(true), thead.children[0]);
    }
    tbody.style = style;
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
