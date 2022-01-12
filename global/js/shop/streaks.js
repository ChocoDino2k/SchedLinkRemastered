var streakLength;
var streakChain;

function loadStreakScene() {
  document.body.querySelector("#points").textContent = POINTS;
  document.body.querySelector("#streak").textContent = STREAK;
  document.body.querySelector("#next-bonus").textContent  = (5 - STREAK % 5) + " more checks until a bonus!";
  loadStreaks(STREAK);
}

function loadStreaks(curStreak) {
  streakChain = document.querySelector("#streaks-chain");
  let start = (curStreak > 9)? curStreak - 10 : 1;
    for(let i = start; i < curStreak + 30; i++) {
      let pts;
      switch (i) {
        case 5:
          pts = 30;
          break;
        case 10:
          pts = 40;
          break;
        case 15:
          pts = 60;
          break;
        case 20:
          pts = 70;
        default:
          if(i > 0 && i % 5 == 0)
            pts = 80;
          else
            pts = 10;
          break;
      }


      if(i == start) {
        createStreakLink(streakChain, pts, i <= curStreak, "first");
      }
      else if(i == curStreak + 29) {
        createStreakLink(streakChain, pts, false, "last");
      }
      else {
        createStreakLink(streakChain, pts, i <= curStreak, "middle");
      }
    }

    streakChain.scroll(streakChain.querySelector(".streaks-link").offsetWidth* ((start == 1)? 0 : 9),0);

  // var streakInfo = document.getElementsByClassName("streaks-info__count");
  // for(var k = 0; k < 2; k++) {
  //   streakInfo[k].innerHTML = curStreak;
  // }
}

function createStreakLink(streakChain, points, isActive, pos) {
  var link = document.createElement("div");
  var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  var pathOne = document.createElementNS("http://www.w3.org/2000/svg","path");
  if(pos == "middle") {
    var pathTwo = document.createElementNS("http://www.w3.org/2000/svg","path");
  }
  var number = document.createElement("p");

  link.setAttribute("class","streaks-link" + (isActive ? " active" : ""));
  svg.setAttribute("class","streaks-link__svg");
  svg.setAttribute("viewBox","0 0 362.23 129.1");
  if(pos == "first") {
    pathOne.setAttribute("d","M324.92,88.23c0-.39.34-.59.54-.85a30,30,0,0,0,6.74-17.46,86.64,86.64,0,0,0,0-10.81C331.35,48,326,39.61,316.39,34a29.25,29.25,0,0,0-15.1-4H61a31.17,31.17,0,0,0-30.4,25.27,31.65,31.65,0,0,0-.56,6c0,2.19,0,4.37,0,6.56A31.21,31.21,0,0,0,54.46,98.35a30,30,0,0,0,6.4.7q88.47,0,176.94,0a1.83,1.83,0,0,1,1.95,1.19A59.27,59.27,0,0,0,251,116c1.95,2,3.92,3.93,5.89,5.89a60.17,60.17,0,0,0,7.57,6.33l.87.65c-.3.22-.58.13-.83.15s-.42,0-.63,0q-101.16,0-202.33,0A59.84,59.84,0,0,1,24,116.34,60.32,60.32,0,0,1,1.09,79.1a56.07,56.07,0,0,1-1-9.5A99,99,0,0,1,.68,52.47,60.39,60.39,0,0,1,22.53,13.83,59.8,59.8,0,0,1,51,.88,60.84,60.84,0,0,1,61.32,0Q181.17,0,301,0a61.12,61.12,0,0,1,56.11,36.65,59.88,59.88,0,0,1,4.7,17.49A118.72,118.72,0,0,1,362.17,70a58.08,58.08,0,0,1-3.1,17.32c-.33,1-.33,1-1.38,1H325.84A1.55,1.55,0,0,1,324.92,88.23Z");
  }
  if(pos == "middle") {
    pathOne.setAttribute("d","M324.61,88.37c.3-.39.44-.58.6-.76a30,30,0,0,0,6.87-17.08,66.31,66.31,0,0,0-.1-13.29c-1.4-10.5-6.87-18.35-16.06-23.56a29.62,29.62,0,0,0-14.85-3.77q-88.24.06-176.5.16a2,2,0,0,1-2.18-1.34A57.78,57.78,0,0,0,112,13.89c-2.9-3-5.8-6-8.89-8.76A55.17,55.17,0,0,0,97.79.92,2.47,2.47,0,0,1,97,.12h1.19L194.89.05q52.86,0,105.73,0a59.94,59.94,0,0,1,38,12.93,60.18,60.18,0,0,1,22.66,37.6,66.28,66.28,0,0,1,1,11.07c0,3.6.07,7.21-.2,10.81a61.63,61.63,0,0,1-3.13,15.32c-.16.46-.37.68-.88.65-.66,0-1.32,0-2,0h-31.4Z");
    pathTwo.setAttribute("d","M37.28,40.93a2.15,2.15,0,0,1-.59.91,30.79,30.79,0,0,0-6.51,15.63,26.41,26.41,0,0,0-.2,3.32c0,3.15-.13,6.32.08,9.46a30,30,0,0,0,8.44,19.2A30.66,30.66,0,0,0,56.81,98.9a28.75,28.75,0,0,0,4.15.29q88.14-.07,176.29-.16a2.47,2.47,0,0,1,2.65,1.62,58.65,58.65,0,0,0,11.18,15.56l5.52,5.51a60,60,0,0,0,7.63,6.43l.91.68a2.46,2.46,0,0,1-1.26.14q-31.53,0-63.07.07-69.57,0-139.14.05A60.06,60.06,0,0,1,20.8,113.85,60,60,0,0,1,1.07,79.28,60.68,60.68,0,0,1,0,67.71c0-3-.06-6.1.07-9.15a61.54,61.54,0,0,1,3.17-17c.17-.5.4-.75,1-.71s1,0,1.56,0l30.07,0A4.83,4.83,0,0,1,37.28,40.93Z");
  }
  if(pos == "last") {
    pathOne.setAttribute("d","M37.47,40.82c-.27.36-.49.65-.72.94a30,30,0,0,0-6.6,16.77,66,66,0,0,0,.11,13.18C31.61,82,36.91,89.79,45.84,95a29.55,29.55,0,0,0,15.2,4H301.16a31.1,31.1,0,0,0,30.47-24.79,28,28,0,0,0,.62-6c0-3,.17-6.05-.05-9.05-.81-11-6.05-19.35-15.45-25A29.51,29.51,0,0,0,301.19,30H125.08a4.59,4.59,0,0,0-.83,0c-.86.15-1.26-.27-1.62-1a56.88,56.88,0,0,0-9.42-13.9A140.74,140.74,0,0,0,101.78,3.84c-1.29-1.11-2.65-2.13-4-3.11a2.3,2.3,0,0,1-.7-.72H202q49.44,0,98.88,0a59.9,59.9,0,0,1,37.67,12.85,60.26,60.26,0,0,1,22.09,34.4,55.91,55.91,0,0,1,1.55,12.35c.05,3.47.08,6.94,0,10.4a57.1,57.1,0,0,1-4.51,21Q346.13,118,318,126.61A58.84,58.84,0,0,1,300.78,129H61.5A59.8,59.8,0,0,1,26.67,118.3,61,61,0,0,1,0,68.36c0-4-.1-7.91.19-11.86A61.48,61.48,0,0,1,3.32,41.38a.82.82,0,0,1,1-.68c.21,0,.42,0,.62,0H36.15A3.69,3.69,0,0,1,37.47,40.82Z");
    link.classList.add("last");
  }
  number.setAttribute("class","streaks-link__number");
  number.innerHTML = "+" + points

  svg.appendChild(pathOne);
  if(pos == "middle") {
    svg.appendChild(pathTwo);
  }
  link.appendChild(svg);
  link.appendChild(number);
  streakChain.appendChild(link);
}
