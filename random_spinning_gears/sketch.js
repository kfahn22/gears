// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const knobs = [];
const num = 10;
let angle = 0;
const spokes = 8; // number of spokes on the gears
const sc = 10;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB);
  for (let i = 0; i < num; i++) {
    knobs.push(
      new Gear(
        width / 2,
        height / 2,
        random(2),
        random(10),
        spokes,
        sc + 10 * i,
        color(random(100, 255), 100, random(200, 255))
      )
    );
  }
}

function draw() {
  colorMode(RGB);
  background(0);
  rotate(angle);
  for (let i = 0; i < knobs.length; i++) {
    knobs[i].oneCurve();
    knobs[i].show(angle);
  }
  angle += 0.5;
}

function mousePressed() {
  save("gear.jpg");
}
