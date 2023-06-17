// See https://github.com/kfahn22/gears for other gear curve sketches

// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// Reference for gear curve https://mathworld.wolfram.com/GearCurve.html
// Reference for hyperbolic functions
// https://byjus.com/maths/hyperbolic-function/
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table
// Reference for how to create p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let ang = 0;
let rotation = true;
const detailX = 75; // must be odd
const detailY = 75;
const sc = 130;
// gear curve parameters -- changing will yield different shapes
// a = 1, b = 10 were the values given on Mathworld
const a = 1; // keep this = 1
const b = 10;
const sp = 10; // number of spokes
let myGeometry;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detailX, detailY, function () {
    for (let i = 0; i < detailX + 1; i++) {
      let lat = map(i, 0, detailX, -PI, PI);
      let r2 = gear(lat, a, b);
      for (let j = 0; j < detailY + 1; j++) {
        let lon = map(j, 0, detailY, -PI, PI);
        let r1 = gear(lon, a, b);
        let x = sc * r1 * cos(lon) * r2 * sin(lat);
        let y = sc * r1 * sin(lon) * r2 * sin(lat);
        //let z = sc * ((r1 + r2) * cos(lat)); // get an football-like shape
        let z = sc * (r2 * cos(lat));
        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();

    // This is a bit of trouble-shooting code writtem by Dave Pagurek
    // I was getting an error when I had the detailX,Y set to an even number
    // https://github.com/processing/p5.js/issues/4791#issuecomment-1595003663
    // p5.Geometry.prototype._getFaceNormal = function (faceId) {
    //   //This assumes that vA->vB->vC is a counter-clockwise ordering
    //   const face = this.faces[faceId];
    //   const vA = this.vertices[face[0]];
    //   const vB = this.vertices[face[1]];
    //   const vC = this.vertices[face[2]];
    //   const ab = p5.Vector.sub(vB, vA);
    //   const ac = p5.Vector.sub(vC, vA);
    //   const n = p5.Vector.cross(ab, ac);
    //   if (n.x === 0 && n.y === 0 && n.z === 0) {
    //     console.warn(
    //       "p5.Geometry.prototype._getFaceNormal:",
    //       "face has colinear sides or a repeated vertex"
    //     );
    //   }
    //   return n;
    // };
  });
}

function draw() {
  background(87, 31, 78);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  noStroke();

  // orbitControl allows us to track with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // We need two directional lights coming from opposite directions
  // View the shape with normal material and you will see that the normals change
  // with each band
  // normalMaterial();
  directionalLight(128, 128, 128, 0, 0, -1);
  directionalLight(128, 128, 128, 0, 0, 1);
  ambientLight(146, 201, 177);
  ambientMaterial(146, 201, 177);

  push();
  rotateY((cos(millis() / 1000) * PI) / 4);
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function hyperbolicCos(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k + l) / 2;
}

// Function to calculate r1, r2, r
function gear(theta, a, b) {
  // Equation for the gear curve
  return a + (1 / b) * hyperbolicCos(sin(sp * theta));
}

function mousePressed() {
  save("3dshape.jpg");
}
