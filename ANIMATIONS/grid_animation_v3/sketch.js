// Base polar coordinate code https://thecodingtrain.com/challenges/134-heart-curve
// Code to implement grid from https://thecodingtrain.com/challenges/116-lissajous-curve-table
// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

let gcurve = [];
// a, b are parameters to the function to calculate radius
const a = 1;
const b = 1;
const m = 10; // number of spokes
let sc = 25;
const w = 50;
let cols;
let rows;
let inc = -1;
const frames = 120;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/grid.gif", frames, options);
  }
}

function setup() {
  createCanvas(500, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  angleMode(DEGREES);
}

function draw() {
  let c1 = color(87, 31, 78);
  let c2 = color(146, 201, 177);
  gradient = createLinearGradient(45, 700);
  gradient.colors(0, c1, 1, c2);
  backgroundGradient(gradient);

  let w = width / 5;

  let col = color(255);
  noFill();

  for (let i = 0; i < 1; i++) {
    gcurve.push(new Gear(width / 2, height / 2, a, b, sc, 30, col, m));
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cx = w * (i - 1.5);
      let cy = w * (j - 1.5);
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
  sc = map(sin(inc), -1, 1, 25, 75);
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
