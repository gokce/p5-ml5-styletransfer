// Based on examples by ml5.js
// https://github.com/ml5js/ml5-examples

let style;
let availableStyles = ["la_muse", "matta", "rain_princess", "scream", "udnie", "wave", "zhangdaqian", "fuchun", "wreck", "matilde_perez", "mathura"]
let currentStyle = 0;

let styleImages = [];
let video;
let result;

let modelReady = false;

function preload() {
  for (let i=0; i<availableStyles.length; i++) {
    let imageName = "images/" + availableStyles[i] + ".jpg";
    let image = loadImage(imageName);
    styleImages.push(image);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  noStroke();

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // The results image from the style transfer
  result = createImg('');
  result.hide();

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer(getCurrentStyle(), video, modelLoaded);
}

function draw(){
  background(255);
  displayThumbnails();

  image(video, 100, 200, 320, 240);

  // Switch between showing the raw camera or the style
  if (modelReady) {
    image(result, 420, 200, 320, 240);
  } else {
    text("Loading model...", width/2, height/2);
  }
}

function modelLoaded() {
  console.log("Model loaded");
  style.transfer(gotResult);
  modelReady = true;
}

function gotResult(err, img) {
  result.attribute('src', img.src);
  if (modelReady) {
    style.transfer(gotResult);
  }
}

function mousePressed() {
  nextStyle();
}

function getCurrentStyle() {
  return "models/"+availableStyles[currentStyle];
}

function nextStyle() {
  modelReady = false;
  currentStyle += 1;
  currentStyle %= availableStyles.length;
  style = ml5.styleTransfer(getCurrentStyle(), video, modelLoaded);
}

function displayThumbnails() {
  for (let i=0; i<styleImages.length; i++) {
    if (currentStyle == i) {
      rect(5+i*100, 5, 100, 100);
    }
    image(styleImages[i], 10+i*100, 10, 90, 90);
  }
}
