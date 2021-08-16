  // // Example POST method implementation:
  // async function postData(url = '', data = {}) {
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials" : true
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(data, null, 2) // body data type must match "Content-Type" header
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }
  //
async function postData(filename, varname, data){
      let myval = "var JSON_" + varname.toLowerCase() + " = " + JSON.stringify(data, null, 2);
      let r;
      try{
        r = await $.ajax({
          type: 'POST',
          url: 'update.php',
          data: {
            'variable': myval,
            'file': filename
          }
        });

        return r;
      }catch(e){
        console.log(e);
        return "failed";
      }

  }

async function save(){
  saveHeader("saving");
  let d = await postData("../json/filler.js", "calendar", JSON_calendar);
  while(d != "hello" && d != "failed"){
    console.log("sup");
  }
  let delay = setTimeout(  saveHeader, Math.random()*750 + 250, ((d != "failed")? "success":"failed"));
  return d;
  // location.reload(true);
}

function saveHeader(state){
  let header = findElements(document.body, false, "#state_display");
  header.classList = state;
  header.children[0].innerHTML = state.toUpperCase();
}
