// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I don't know what to call this shape

// Reference for hyperbolic functions
// https://byjus.com/maths/hyperbolic-function/
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

let ang = -1;
let rotation = true;
let num;
const sc = 3;
const sp = 8; // number of spokes
let myGeometry;
const detailX = 16;
const detailY = 16;
const frames = 180;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/star.gif", frames, options);
  }
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  myGeometry = new p5.Geometry(detailX, detailY, function () {
    for (let i = 0; i < detailX + 1; i++) {
      let lat = map(i, 0, detailX, -PI, PI);
      let r2 = gear(lat);
      for (let j = 0; j < detailY + 1; j++) {
        let lon = map(j, 0, detailY, -PI, PI);
        let r1 = gear(lon);
        let r = gear(lat + lon);
        let x = sc * r1 * cos(lon) * r2 * sin(lat);
        let y = sc * r1 * sin(lon) * r2 * sin(lat);
        //let z = r + sc * (r2 * cos(lat)); // change sin(lat) to cos(lat) get two
        let z = r - sc * (r1 * cos(lon));
        this.vertices.push(createVector(x, y, z));
      }
    } // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
  });
}

function draw() {
  background(22, 16, 50);
  rotateX(ang);
  rotateY(ang);
  //rotateZ(ang);

  noStroke();

  orbitControl();
  directionalLight(128, 128, 128, 0, 0, -1);
  directionalLight(128, 128, 128, 0, 0, 1);
  ambientLight(255, 197, 58);
  ambientMaterial(255, 197, 58);
  //normalMaterial();
  push();

  model(myGeometry);
  pop();

  if (rotation) {
    ang += TWO_PI / frames;
  }
}

function hyperbolicSin(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k - l) / 2;
}

// Function to calculate r1, r2
function gear(theta) {
  let a = 1;
  let b = 4;
  // Equation for the radius
  return a + (1 / b) * hyperbolicSin(b * cos(sp * theta));
}

function mousePressed() {
  save("star.jpg");
}
