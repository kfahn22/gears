// Base polar coordinate code https://thecodingtrain.com/challenges/134-heart-curve
// Code to implement grid from https://thecodingtrain.com/challenges/116-lissajous-curve-table
// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html
// See https://github.com/antiboredom/p5.patgrad for info on background gradient

const gcurve = [];
// a, b are parameters to the function to calculate radius
const a = 1;
const b = 10;
const m = 6; // number of spokes
let angle = 0;
const w = 50;
let cols;
let rows;

// for backgroundgradient
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  //createCanvas(1000, 500);
  createCanvas(500, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  angleMode(DEGREES);
  let col = color(255);
  for (let i = 0; i < 1; i++) {
    gcurve.push(
      new Gear(
        width / 2,
        height / 2,
        1,
        random(1, 10),
        random(80, 160),
        30,
        col,
        4
      )
    );
  }
}

function draw() {
  let c1 = color(87, 31, 78);
  let c2 = color(146, 201, 177);
  gradient = createLinearGradient(45, 900);
  gradient.colors(0, c1, 1, c2);
  backgroundGradient(gradient);
  let w = width / 5;
  //let w = width / 10;
  noFill();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cx = -w + i * w + w / 2;
      let cy = -w + j * w + w / 2;
      for (let i = 0; i < gcurve.length; i++) {
        push();
        translate(cx, cy);
        gcurve[i].oneCurve();
        gcurve[i].show();
        pop();
      }
    }
  }
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

function mousePressed() {
  save("tile.jpg");
}

function setGradientL(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setGradientR(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
