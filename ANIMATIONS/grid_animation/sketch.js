// Base polar coordinate code https://thecodingtrain.com/challenges/134-heart-curve
// Code to implement grid from https://thecodingtrain.com/challenges/116-lissajous-curve-table
// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

let gcurve = [];
// a, b are parameters to the function to calculate radius
const a = 1;
const b = 10;
let sc = 50; // scale
let m = 4; // number of spokes
let angle = 0;
const w = 100;
let cols;
let rows;
let inc = -1;
let frames = 60;

// for backgroundgradient
const Y_AXIS = 1;
const X_AXIS = 2;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/tiling.gif", frames, options);
  }
}

function setup() {
  createCanvas(1000, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  angleMode(DEGREES);
}

function draw() {
  background(87, 31, 78);
  let c1 = color(146, 201, 177);
  let c2 = color(87, 31, 78);
  let col = color(146, 201, 177);

  // setGradientL(0, 0, 500, 500, c1, c2, X_AXIS);
  // setGradientR(500, 0, 500, 500, c2, c1, X_AXIS);

  let w = width / 5;

  for (let i = 0; i < 1; i++) {
    gcurve.push(new Gear(width / 2, height / 2, a, b, sc, 30, col, 8));
  }

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
  inc += 360 / frames;
  sc = map(sin(inc), -1, 1, 100, 300);
  gcurve = [];
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
