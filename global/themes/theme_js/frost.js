// -----------------------BEGIN THEME JS-------------------------
console.log("Frost: yay pretty snow!")
var colors = [
  [0,100,180],
  [30,150,230],
  [200,240,255],
];

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

var canvas, ctx,
  windowW = window.innerWidth,
  windowH = window.innerHeight,
  numFlakes = 100,
  flakes = [];

canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");
start();


function Flake(x, y) {
  var maxWeight = 4,
      maxSpeed = 3;

  this.x = x;
  this.y = y;
  this.r = randomBetween(0, 1);
  this.a = randomBetween(0, Math.PI);
  this.aStep = 0.01;


  this.weight = randomBetween(2, maxWeight);
  this.alpha = (this.weight / maxWeight);
  this.speed = (this.weight / maxWeight) * maxSpeed;

  this.update = function() {
    this.x += Math.cos(this.a) * this.r;
    this.a += this.aStep;

    this.y += this.speed;
  }
}

//
// It all starts here...
//
function start() {
  if (enableAnimations) {
    if(document.readyState === "interactive" || document.readyState === "complete")
    {
      generateSnowflakes();
    }
    else
    {
      window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
    }
    window.addEventListener("resize", scaleCanvas, false);
  }
}

function generateSnowflakes() {
  var i = numFlakes,
      flake,
      x,
      y;

  while (i--) {
    x = randomBetween(0, windowW, true);
    y = randomBetween(0, windowH, true);


    flake = new Flake(x, y);
    flakes.push(flake);
  }

  scaleCanvas();
  loop();
}

function scaleCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loop() {
  if (enableAnimations) {
    canvas.style.display = "block";
  }
  else
  {
    canvas.style.display = "none";
  }
  scaleCanvas();

  var i = flakes.length,
      z,
      dist,
      flakeA,
      flakeB;

  // clear canvas
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, windowW, windowH);
  ctx.restore();

  // loop through each flake
  while (i--) {

    flakeA = flakes[i];
    flakeA.update();

    ctx.beginPath();
    ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
    ctx.fill();

    if (flakeA.y >= windowH) {
      flakeA.y = -flakeA.weight;
    }
  }

  requestAnimationFrame(loop);
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
