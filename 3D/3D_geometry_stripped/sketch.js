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
const detail = 47; // must be odd
const sc = 150;
// gear curve parameters -- changing will yield different shapes
// a = 1, b = 10 were the values given on Mathworld
const a = 1; // keep this = 1
const b = 10;
const sp = 8; // number of spokes
let myGeometry;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  //github.com/davepagurek/p5.warp
  https: distort = createWarp(({ glsl, millis, position }) => {
    const t = millis.div(1000);
    return glsl.vec3(
      t.mult(2).add(position.y().mult(4)).sin().mult(0.15),
      t.mult(0.5).add(position.z().mult(2)).sin().mult(0.15),
      t.mult(1.5).add(position.x().mult(3)).sin().mult(0.15)
    );
  });
  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let k = 0; k < detail + 1; k++) {
      for (let j = 0; j < detail + 1; j++) {
        let lat = map(j, 0, detail, -PI, PI);
        let r2 = gear(lat, a, b);
        for (let i = 0; i < detail + 1; i++) {
          let lon = map(i, 0, detail, -PI, PI);
          let r1 = gear(lon, a, b);
          let x = sc * r1 * cos(lon) * r2 * sin(lat);
          let y = sc * r1 * sin(lon) * r2 * sin(lat);
          //let z = sc * ((r1 + r2) * cos(lat)); // get an football-like shape
          let z = sc * (r2 * cos(lat));
          this.vertices.push(new p5.Vector(x, y, z));
        }
      }
    }
    // // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // // this will calculate the normals to help with lighting
    this.computeNormals();
    // this.normalize();
    // this.averageNormals();
    // this.averagePoleNormals();
  });
}

function draw() {
  background(79, 117, 155);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  noStroke();

  // orbitControl allows us to track with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // View the shape with normal material and you will see that the normals change with each band
  // normalMaterial();
  // directionalLight(128, 128, 128, 0, 0, -1);
  // directionalLight(128, 128, 128, 0, 0, 1);
  // ambientLight(79, 117, 155);
  // ambientMaterial(79, 117, 155);

  // If we add different colors to each directional light, we get stripes
  directionalLight(146, 201, 177, 0, 0, -1);
  directionalLight(93, 81, 121, 0, 0, 1);
  distort(); 
  push();
  rotateY((cos(millis() / 1000) * PI) / 4);

  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function hyperbolicTan(theta) {
  const e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

// Function to calculate r
function gear(theta, a, b) {
  // Equation for the gear curve
  return a + (1 / b) * hyperbolicTan(b * sin(sp * theta));
}

function spherical(x, y, z) {
  let theta = atan2(sqrt(x * x + y * y), z);
  let r = gear(theta, a, b);
  let phi = atan(y, x);
  return r;
}

function mousePressed() {
  save("3dshape.jpg");
}
