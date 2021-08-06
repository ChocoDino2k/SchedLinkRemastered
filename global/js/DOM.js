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















//bruh idk
function createDropDown(nodeList, maxShow = 3){
  let main = createElement('dropdown', 'class::drop','style::display: inline-block; z-index:2; cursor:default'),
  container = createElement('div','class::dropcontainer', 'style::z-index: 1;cursor:pointer; visibility:hidden;');
  for(let i =0; i < nodeList.length; i++){
    container.appendChild( (createElement('opt','style:: display:block; cursor:pointer').appendChild(nodeList[i])).cloneNode(true) );
  }
  main.appendChild( (createElement('p','class::dropface').appendChild(nodeList[0])) );
  main.appendChild(container);
  for(let opt of container.children){
    opt.onclick = function(){
      main.replaceChild(opt.cloneNode(true), main.children[0]);
    }
  }
  //if they click off
  window.onclick = function(event) {
    if (!event.target.parentNode.matches('.drop') && !event.target.matches('.drop')) {
      container.setAttribute('style','display: block;z-index: 1; visibility:hidden;');
      main.style.height = window.getComputedStyle(main.children[0]).height;
    }
  }
  //when click on the closed dropdown
  main.onclick = function(){
  container.setAttribute('style', 'display: block;z-index: 1;overflow:auto');
  container.style.height = (parseInt( ( (window.getComputedStyle(main.children[0]).height).split('px')[0]) ) * maxShow * 1.2) + "px";
  main.style.height = 'auto';
  };
  window.onload = function(){
    main.style.height = window.getComputedStyle(main.children[0]).height;
  };

  return main;
}
