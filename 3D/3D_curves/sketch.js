// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const gcurve = [];
// a and b are parameters that control the shape of the curve
// [1, 10] were suggested on Wolfram Alpha
let a = 1; // as a increase tends toward a circle
let b = 10; // as b decreases the spokes get longer and start to curve
let spokes = 8; // number of spokes between
let num = 8; // number of gears to draw
let sc = 100; // scale: 20
let angle = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  for (let i = -num; i < num + 1; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, i, 1, 10, spokes, abs(10 * i), num)
      //new Gear(width / 2, height / 2, z + 0.1 * i, 1, random(10), spokes, 10*i, 30)
    );
  }
}

function draw() {
  background(146, 201, 177);
  rotateX(angle);
  rotateY(angle);
  translate(-width / 2, -height / 2);
  for (let i = 0; i < gcurve.length; i++) {
    gcurve[i].oneCurve();
    gcurve[i].show();
  }
  angle += 0.5;
}

function mousePressed() {
  save("3d.jpg");
}
