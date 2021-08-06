//returns HTML element specified. Can overload arguments to give the element attributes. Syntax is "attr:value"
function createElement(type){
    let elm = document.createElement(type),
    a;
    for(let i = 1; i < arguments.length; i++){
      a = arguments[i].split(":");
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
