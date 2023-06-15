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
let detailX = 32; // 16
let detailY = 32; // 16
let num;
let sc = 50;
let sp = 8; // number of spokes
let myGeometry;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detailX, detailY, function () {
    for (let i = 0; i < detailX + 1; i++) {
      gears[i] = [];
      let lat = map(i, 0, detailX, -PI, PI);
      let r2 = gear(lat);
      for (let j = 0; j < detailY + 1; j++) {
        let lon = map(j, 0, detailY, -PI, PI);
        let r1 = gear(lon);
        let r = gear(lat + lon);
        let x = r1 * cos(lon) * r2 * cos(lat);
        let y = r1 * sin(lon) * r2 * sin(lat);
        let z = r - (r1 * cos(lon));
        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
  });
}

function draw() {
  background(100);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  noStroke();

  orbitControl();
  fill(93, 81, 121);
  //set a basic light to see that normals are calculated
  pointLight(255, 255, 255, 0, 50, -50);
  normalMaterial();
  push();
  //stroke(128);

  //rotateY((cos(millis() / 1000) * PI) / 4);
  //translate(-width / 2, -width / 2);
  scale(sc);
  model(myGeometry);
  pop();

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
  let b = 4; //4 changing this value yields a very different shape

  // Equation for the radius

  return a + (1 / b) * hyperbolicSin(b * cos(sp * theta));
  //return a + (1 / b) * hyperbolicCot(b * cos(sp * theta));
}

function mousePressed() {
  save("3dshape.jpg");
}
