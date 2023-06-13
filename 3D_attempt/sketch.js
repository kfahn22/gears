// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const gcurve = [];
// a and b are parameters that control the shape of the curve
// [1, 10] were suggested on Wolfram Alpha
let a = 1; // as a increase tends toward a circle
let b = 10; // as b decreases the spokes get longer and start to curve
let spokes = 4; // number of spokes between
let n = 5; // number of gears to draw
let sc = 30; // scale: 20
let angle = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(HSL, 360, 100, 100, 100);
  angleMode(DEGREES);
  let z = -n;
  for (let i = 0; i < n; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, z + 1 * i, a, b, spokes, sc - 3*i, 30)
    );
  }
}

function draw() {
  background(280, 100, 80, 100);
  rotateX(angle);
  // rotateY(angle);
  rotateZ(angle); // only use this if you want 2D rotating gear
  translate(-width / 2, -height / 2);
  for (let i = 0; i < gcurve.length; i++) {
    gcurve[i].oneCurve();
    gcurve[i].show(angle);
  }
  angle += 0.5;
}

function mousePressed() {
  save("gear.jpg");
}
