var isPortrait = (window.innerWidth < window.innerHeight);

// Listen for orientation changes
window.addEventListener("resize", function() {
  // Announce the new orientation number
  if(isPortrait != window.innerWidth < window.innerHeight) {
    isPortrait = window.innerWidth < window.innerHeight;
    startImageLoad();
  }
}, false);

function loadThemeScene() {
  createImages(UNLOCKS);

  document.body.querySelector("#scrim").onclick = function() {
    for(let s of document.querySelectorAll(".shown")) {
      if(s.id == "puzzle-scrim") {
        s.children[0].classList = "container";
        s.children[0].children[1].children[1].classList = "preview";
        s.children[0].children[1].children[1].src = "";
      }
      s.classList.toggle("shown");
    }
  }
  if(LOAD) {
    let btn = document.querySelector("#" + THEME);
    btn.click();
    btn.previousElementSibling.children[1].click();
    if(ANI) {
      initConfetti();
    } else {
      document.querySelector("#puzzle-container").classList.toggle("incorrect");
    }
  }
}

function createThemeImage(imageName, isUnlocked) {
  let fullButton = createElement("button", ["text", (isUnlocked) ? "Activate" : "Unlock"], ["value", imageName]);
  if(isUnlocked) {
  fullButton.onclick = function() {
    activateTheme(this.value);
  }
} else {
  if(COOKIESENABLE) {
    fullButton.onclick = function() {
      showThemePuzzle(this.value);
      this.parentNode.classList.toggle("shown");
    }
  } else {
    fullButton.onclick = function() {
      alert("You need to enable cookies to unlock themes!\n(We only use cookies to track the themes used on your device)");
    }
  }
}
  let parent = createElement("div", ["class", "theme-unit"]),
  fullscreen = createElement("div", ["class", "theme-fullscreen container"], ["children",
  [createElement("img", ["alt", imageName], ["src", ""]),
    fullButton]
]),
  btn = createElement("button", ["class", "unit-button"], ["id", imageName], ["children",
  createElement("div", ["class", "unit-img-container" + ((isUnlocked) ? "" : " locked")], ["children",
      createElement("img", ["class", "preview"], ["src", ""], ["alt", imageName])])
]);
btn.onclick = function() {
  this.previousElementSibling.classList += " shown";
  document.querySelector("#scrim").classList = "shown";
}
parent.appendChild(fullscreen);
parent.appendChild(btn);

  return parent;
}

function createImages(unlocks) {
  let parent = document.querySelector("#theme-content");
  for(let name of names) {

    parent.appendChild(createThemeImage(name, unlocks.includes(name)));
  }
  startImageLoad();
}


function startImageLoad() {
  let imgs = document.body.querySelectorAll("img");
  let loading;
  for(let img of imgs) {
    if(img.alt == "noPreload"){continue;}
    //img.src = "../../global/images/preLoad.png";
    loading = new Image();
    loading.onload = function() {
      img.src = this.src;
      if(img.classList.contains("preview")) {
      img.classList = "loading";
    }
    };
    if(img.classList.contains("loading")) {
      img.classList = "preview";
    }
    loading.src = "../../global/themes/theme_images/" + img.alt + "-" + ((isPortrait)? "portrait" : "landscape") + ".png?v=2";
}
}

function activateTheme(theme) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      console.log(this.readyState, this.status);
      if (this.readyState == 4 && this.status == 200) {
        window.location.replace("index.php");
      } else if(this.readyState == 4 && this.status == 500) {
        alert("Something went wrong. Try again later");
        return;
      }
    };
    xmlhttp.open("POST", "../../global/php/activateTheme.php?theme=" + theme, true);
    xmlhttp.send();
}

function showThemePuzzle(theme) {
  let cont = document.querySelector("#puzzle-container");
  let question = QUESTIONS[theme],
  num = QUESTIONSNUMS[theme],
  pts = QUESTIONPOINTS[theme];
  cont.children[0].textContent = theme.toUpperCase() + " - Part " + (num + 1);
  cont.children[2].children[1].value = theme;
  cont.children[2].children[2].value = theme;
  cont.children[2].children[2].textContent = "Use Points (" + pts + ")";
  if(question.includes("../../")) {
    let combined = parseText(question),
    src = combined.shift().textContent;
    replaceAllChildren(cont.children[1].children[0], combined);
    let img = cont.children[1].children[1];
    img.alt = theme;
    let loading = new Image();
    loading.onload = function() {
      img.src = this.src;
      if(img.classList.contains("preview")) {
      img.classList = "loading";
    }
    };
    if(img.classList.contains("loading")) {
      img.classList = "preview";
    }
    loading.src = src + "-" + ((isPortrait)? "portrait" : "landscape") + ".png";
  } else {
    cont.children[1].children[1].classList = "preview hidden";
    replaceAllChildren(cont.children[1].children[0], parseText(question));
    cont.children[1].children[0].classList = "";
  }
  cont.parentNode.classList = "shown";
}

function parseText(text) {
  let breaks = text.split("<br>");
  let p;
  let parts = [];
  for(let phrase of breaks) {
    p = document.createElement("p");
    p.textContent = phrase;
    parts.push(p);
  }
  return parts;
}
