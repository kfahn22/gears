// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const gcurve = [];
let a = 1;
let b = 10;
let sc = 25;
let n = 11;
let angle = 0;
let w = 50;
let cols;
let rows;

function setup() {
  createCanvas(500, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  angleMode(DEGREES);
  let col = color(0, 0, 255);
  for (let i = 0; i < 1; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(20, 150), 30, col, 2)
    );
  }
}

function draw() {
  background(15, 16, 32);
  let w = width / 10;
  noFill();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cx = w + i * w + w / 2;
      let cy = w + j * w + w / 2;

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
  save("gear.jpg");
}
