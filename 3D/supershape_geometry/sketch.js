// Supershape Geometry
// The Coding Train / Daniel Shiffman
// https://github.com/CodingTrain/Coding-Challenges/blob/main/026_SuperShape3D/Processing/CC_026_SuperShape3D/CC_026_SuperShape3D.pde

let ang = 0;
const r = 200;
const a = 1;
const b = 1;
let m = 7; //m = 0 yields a sphere
let mchange = 0;
const detailX = 75;
const detailY = 75;
let rotation = true;
const sc = 120;
let myGeometry;

function setup() {
  createCanvas(500, 500, WEBGL);
  noFill();
  strokeWeight(2);
  stroke(200);
  myGeometry = new p5.Geometry(detailX, detailY, function () {
    for (let i = 0; i < detailX + 1; i++) {
      let lat = map(i, 0, detailX, -PI / 2, PI / 2);
      let r2 = supershape(lat, m, 0.2, 1.7, 1.7);
      for (let j = 0; j < detailY + 1; j++) {
        let lon = map(j, 0, detailY, -PI, PI);
        let r1 = supershape(lon, m, 0.2, 1.7, 1.7);
        let x = r * r1 * cos(lon) * r2 * cos(lat);
        let y = r * r1 * sin(lon) * r2 * cos(lat);
        let z = r * r2 * sin(lat);
        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    this.computeFaces();
    // this will calculate the normals to help with lighting
    // this will attach all our vertices and create faces automatically

    this.computeNormals();
  });
}

function draw() {
  // m = map(sin(mchange), -1, 1, 0, 7);
  // mchange += 1;

  background(50);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  stroke(255);
  //noStroke();

  orbitControl();
  fill(93, 81, 121);
  //set a basic light to see that normals are calculated
  pointLight(255, 255, 255, 0, 50, -50);
  normalMaterial();
  push();
  //stroke(128);
  let geoSize = width / 2;
  rotateY((cos(millis() / 1000) * PI) / 4);
  //translate(-width / 2, -width / 2);
  // scale(geoSize);
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function supershape(theta, m, n1, n2, n3) {
  let t1 = abs((1 / a) * cos((m * theta) / 4));
  t1 = pow(t1, n2);

  let t2 = abs((1 / b) * sin((m * theta) / 4));
  t2 = pow(t2, n3);

  t3 = t1 + t2;
  let r = pow(t3, -1 / n1);
  return r;
}
