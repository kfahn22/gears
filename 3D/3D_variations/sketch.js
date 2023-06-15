// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I don't know what to call this shape

// Reference for hyperbolic functions
// https://byjus.com/maths/hyperbolic-function/
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

// Variations:
// a = 1, b = 4; sc = 2, sp = 4 yields a "xmas-tree" topper like shape
// a + (1 / b) * hyperbolicSin(b * sin(sp * theta));
// If sp = 8, 16 get some different fun shapes

// a = 1, b = 4; sc = 80, sp = 4 yields a folded paper like shape
// a + (1 / b) * hyperbolicTan(b * cos(sp * theta))

// a = 1, b = 4, sc = 80, sp = 16 yields a folded structure with rounded edges
// return a + (1 / b) * hyperbolicCot(b * cos(sp * theta));

// adjusting total also yields some interesting results, but there is a
// limit to how much you can increase total before the animation slows way down
let ang = 0;
let gears = [];
let rotation = true;
let total = 16;
let num;
let sc = 3;
let sp = 8; // number of spokes

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
}

function draw() {
  background(87, 31, 78);
  rotateX(ang);
  rotateY(ang);
  //rotateZ(90);
  ambientLight(255);
  ambientMaterial(79, 117, 155);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(79, 117, 155, -dirX, -dirY, -1);
  stroke(79, 117, 155);
  //noStroke();
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
    ang += 0.01;
   
  }
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

function hyperbolicCot(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k + l) / (k - l);
}

function hyperbolicSin(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k - l) / 2;
}
function hyperbolicCos(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k + l) / 2;
}

// Function to calculate r1, r2
function gear(theta) {
  let a = 1;
  let b = 4; // changing this value yields a very different shape

  // Equation for the radius

  //return a + (1 / b) * hyperbolicTan(b * cos(sp * theta));
  return a + (1 / b) * hyperbolicSin(b * cos(sp * theta));
  // return a + (1 / b) * hyperbolicCot(b * cos(sp * theta));
}

function mousePressed() {
  save("3dshape.jpg");
}
