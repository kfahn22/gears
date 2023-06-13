// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes

let angX = 0;
let angY = 0;
let gears = [];
let rotation = true;
let total = 10;
let num;
let sc = 50;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  angleMode(DEGREES);
}

function draw() {
  background("#70327E");
  rotateX(angX);
  rotateY(angY);

  ambientLight(255);
  stroke(255, 0, 0);

  // let theta = atan(sqrt(pos.x * pos.x + pos.y * pos.y), pos.z);
  // let phi = atan(pos.y, pos.x);
  for (let i = -6; i < 6; i++) {
    for (let theta = 0; theta < 361; theta++) {
      gears[i] = [];
      //console.log(gears[-6]);
      let r = gear(theta);
      let x = sc * r * sin(theta);
      let y = sc * r * cos(theta);
      //console.log(r, x, y, z)
      let z = sc * r * i;
      let p = createVector(x, y, z);
      
      gears[i][theta].push(p);
      //console.log(gears[-6][1]);
    }
  }

  fill(0, 0, 255);
  for (let i = 0; i < 6; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < 361; j++) {
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

function findRadius(sp) {
  for (let theta = 0; theta < TWO_PI; theta + sp) {
    return gear(theta);
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
  let b = 10;
  let sp = 5; // number of spokes
  // Equation for the radius of the gear curve
  return a + (1 / b) * hyperbolicTan(b * sin(sp * theta));
}

// function spherical(pos) {
//   let theta = atan(sqrt(pos.x * pos.x + pos.y * pos.y), pos.z);
//   let phi = atan(pos.y, pos.x);
//   //let w = vec3(r, theta, phi);
//   return { r, theta, phi };
// }
