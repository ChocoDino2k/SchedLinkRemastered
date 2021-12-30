// Handle accessibility
var enableAnimations = true;
var reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

// Handle animation accessibility preferences
function setAccessibilityState() {
  if (reduceMotionQuery.matches) {
    enableAnimations = false;
  } else {
    enableAnimations = true;
  }
}
setAccessibilityState();

reduceMotionQuery.addListener(setAccessibilityState);

var conCanvas = document.querySelector("#confetti"),
conCtx = conCanvas.getContext('2d'),
windowW = window.innerWidth,
windowH = window.innerHeight,
numFetti = 100,
fetti = [],
colorVariation = 21,
colors = [
  [255,0,0],
  [0,255,0],
  [0,0,255],
  [255,200,0],
  [180,255,0],
  [0,255,200],
  [200,0,255]
];

function randomColor() {
  colorSet = colors[Math.floor(Math.random() * 7)].slice();
  console.log("Color");
  console.log(colorSet[0] + "," + colorSet[1] + "," + colorSet[2]);
  return colorSet[0] + "," + colorSet[1] + "," + colorSet[2];
}

function Fetti(x, y) {
let maxWeight = 10,
    maxSpeed = 7;

this.x = x;
this.y = y;
this.r = randomBetween(0, 1);
this.a = randomBetween(0, Math.PI);
this.aStep = 0.01;
this.color = randomColor();
this.rotation = (Math.PI * 2) * Math.random();
this.length = randomBetween(1.7, 2.3);

this.weight = randomBetween(7, maxWeight);
this.alpha = (this.weight / maxWeight);
this.speed = (this.weight / maxWeight) * maxSpeed;

this.update = function() {
  this.x += Math.cos(this.a) * this.r;
  this.rotation += Math.cos(this.a) * (Math.PI * 2) * 0.01;
  this.a += this.aStep;

  this.y += this.speed;

}
}

//
// It all starts here...
//
function initConfetti() {
  if (enableAnimations) {
    if(document.readyState === "interactive" || document.readyState === "complete")
    {
      genereateConfetti();
    }
    else
    {
      window.addEventListener("DOMContentLoaded", genereateConfetti, false);
    }
    window.addEventListener("resize", scaleCanvas, false);
  }
}

function genereateConfetti() {
  var i = numFetti,
      flake,
      x,
      y;

  while (i--) {
    x = randomBetween(0, windowW, true);
    y = randomBetween(-windowH, 0, true);


    flake = new Fetti(x, y);
    fetti.push(flake);
  }

  scaleCanvas();
  confettiLoop();
}

function scaleCanvas() {
  conCanvas.width = window.innerWidth;
  conCanvas.height = window.innerHeight;
}

function confettiLoop() {
  if (enableAnimations) {
    conCanvas.style.display = "block";
  }
  else
  {
    conCanvas.style.display = "none";
  }
  scaleCanvas();

  var i = fetti.length,
      z,
      dist,
      flakeA,
      flakeB;

  // clear canvas
  conCtx.save();
  conCtx.setTransform(1, 0, 0, 1, 0, 0);
  conCtx.clearRect(0, 0, windowW, windowH);
  conCtx.restore();

  // confettiLoop
  while (i--) {

    flakeA = fetti[i];
    flakeA.update();

    conCtx.save();

    conCtx.fillStyle = 'rgba(' + flakeA.color + ', ' + flakeA.alpha + ')';
    conCtx.translate(flakeA.x + flakeA.weight / 2, flakeA.y + flakeA.weight / 2);
    conCtx.rotate(flakeA.rotation);

    conCtx.fillRect(-flakeA.weight/2, (-flakeA.weight/2)*flakeA.length, -flakeA.weight, -flakeA.weight*flakeA.length);
    if (flakeA.y - flakeA.weight * 2 - flakeA.length > windowH) {
      fetti.splice(i,1);
    }

    conCtx.restore();
  }
  if(fetti.length > 0) {
    requestAnimationFrame(confettiLoop);
  }
}

function randomBetween(min, max, round) {
  var num = Math.random() * (max - min + 1) + min;

  if (round) {
    return Math.floor(num);
  } else {
    return num;
  }
}

function distanceBetween(vector1, vector2) {
  var dx = vector2.x - vector1.x,
      dy = vector2.y - vector1.y;

  return Math.sqrt(dx*dx + dy*dy);
}


initConfetti();
