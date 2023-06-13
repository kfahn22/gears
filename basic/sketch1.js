function make2DArray(rows, cols) {
  var arr = new Array(rows); //like arr[]; but with number of columns hardcoded
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

let angle = 0;
let w = 50;
let cols;
let rows;
let curves;
let a = 1;
let b = 10;
let num = 1;

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

function setup() {
  createCanvas(500, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  curves = make2DArray(rows, cols);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }
}

function draw() {
  background(0);
  noFill();
  let r = a + b * hyperbolicTan(b * sin(num * angle));
  stroke(255);
  for (let i = 0; i < cols; i++) {
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    strokeWeight(1);
    stroke(255);
    let r = a + b * hyperbolicTan(b * sin(num * angle));
    let x = sc * r * cos(angle);
    let y = sc * r * sin(angle);
    strokeWeight(8);
    stroke(255);
    point(cx + x, cy + y);
    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }
  }

  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = w + j * w + w / 2;

    let x = r * cos(angle);
    let y = r * sin(angle);
    strokeWeight(1);
    stroke(255);
    point(cx + x, cy + y);
    stroke(255, 150);

    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }

  angle += 1;

  if (angle > TWO_PI) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].reset();
      }
    }
    // saveFrame("lissajous#####.png");
    angle = 0;
  }
}
