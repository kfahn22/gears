// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const gcurve = [];
let a = 1;
let b = 10;
let n = 120;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  let c1 = color(162, 250, 163, 255);
  let c2 = color(146, 201, 177, 255);
  let c3 = color(79, 117, 155, 255);
  let c4 = color(93, 81, 121, 255);
  for (let i = 0; i < 0.15 * n; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(80, 140), 30, c1, 2)
    );
  }
  for (let i = 0.15 * n + 1; i < n * 0.4; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(60, 120), 30, c2, 2)
    );
  }
  for (let i = n * 0.4 + 1; i < n * 0.8; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(80, 140), 30, c3, 2)
    );
  }
  for (let i = n * 0.8 + 1; i < n; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(60, 120), 30, c4, 2)
    );
  }
}

function draw() {
  background(87, 31, 78);
  translate(width / 2, height / 2);
  rotate(angle);
  for (let i = 0; i < gcurve.length; i++) {
    gcurve[i].oneCurve();
    gcurve[i].show();
  }
  angle += 1;
}

function mousePressed() {
  save("gear.jpg");
}
