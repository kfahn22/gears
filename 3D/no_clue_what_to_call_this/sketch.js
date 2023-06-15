// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// This is my best attempt at creating a 3D version

let angX = 0;
let angY = 0;
let gears = [];
let rotation = true;
let total = 16;
let num;
let sc = 120;
let sp = 4; // number of spokes

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
}

function draw() {
  background(87, 31, 78);
  rotateX(angX);
  rotateY(angY);

  ambientLight(79, 117, 155);
  stroke(146, 201, 177);

  for (let i = 0; i < total + 1; i++) {
    gears[i] = [];
    let lat = map(i, 0, total, 0, TWO_PI);
    let r2 = gear(lat);
    for (let j = 0; j < total + 1; j++) {
      let lon = map(j, 0, total, -PI, PI);
      let r1 = gear(lon);
      let r = gear(lat + lon);
      let x = sc * r1 * cos(lon) * r2 * sin(lat);
      let y = sc * r1 * sin(lon) * r2 * sin(lat);
      //let z = r + sc * (r2 * cos(lat)); // change sin(lat) to cos(lat) get two
      let z = r - sc * (r1 * cos(lon));
      gears[i].push(createVector(x, y, z));
    }
  }

  for (let i = 0; i < total; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      let v1 = gears[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = gears[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }

  if (rotation) {
    angX += 0.03;
    angY += 0.04;
  }
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

// Function to calculate r1, r2
function gear(theta) {
  let a = 1;
  let b = 4; // changing this value yields a very different shape; b = 6

  // Equation for the radius of the gear curve
  //return a + (1 / b) * hyperbolicTan(b * sin(sp * theta));
  return a + (1 / b) * hyperbolicTan(b * cos(sp * theta));
}

function mousePressed() {
  save("globe.jpg");
}
