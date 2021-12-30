var isPortrait = (window.innerWidth < window.innerHeight);

// Listen for orientation changes
window.addEventListener("resize", function() {
  // Announce the new orientation number
  if(isPortrait != window.innerWidth < window.innerHeight) {
    isPortrait = window.innerWidth < window.innerHeight;
    startImageLoad();
  }
}, false);


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
    loading.src = "../../global/themes/theme_images/" + img.alt + "-" + ((isPortrait)? "portrait" : "landscape") + ".png";
}
}

function activateTheme(theme) {
  let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    window.location.replace("index.php");
  }
};
xmlhttp.open("GET", "checkAvailable.php?checkTheme=" + theme, true);
xmlhttp.send();
}

function showThemePuzzle(theme) {
  let cont = document.querySelector("#puzzle-container");
  let question = QUESTIONS[theme],
  num = QUESTIONSNUMS[theme];
  cont.children[0].textContent = theme + " - Part " + (num + 1);
  cont.children[2].children[1].value = theme;
  if(question[num].includes("../../")) {
    cont.children[1].children[0].classList = "hidden";
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
    loading.src = question[num] + "-" + ((isPortrait)? "portrait" : "landscape") + ".png";
  } else {
    cont.children[1].children[1].classList = "preview hidden";
    cont.children[1].children[0].textContent = question[num];
    cont.children[1].children[0].classList = "";
  }
  cont.parentNode.classList = "shown";
}
