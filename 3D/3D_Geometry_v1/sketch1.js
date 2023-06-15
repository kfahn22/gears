// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let myGeometry;

function setup() {
  createCanvas(400, 400, WEBGL);

  let detailX = 20;
  let detailY = 20;
  myGeometry = new p5.Geometry(detailX, detailY, function () {
    // these nested for loops create a simple grid of vertices
    // which are affected by sin() and cos() on the z-axis
    for (let x = 0; x <= detailX; x++) {
      for (let y = 0; y <= detailY; y++) {
        this.vertices.push(
          new p5.Vector(
            x / detailX,
            y / detailY,
            (sin((x / detailX) * TWO_PI * 4) + cos((y / detailY) * TWO_PI)) / 10
            // random()/10
          )
        );
      }
    }

    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
  });

  describe("a greenish plane shape that is warped and lit");
}

function draw() {
  background(220);

  orbitControl();
  fill(146, 201, 177);
  //set a basic light to see that normals are calculated
  pointLight(255, 255, 0, 0, 50, -50);

  push();
  stroke(128);
  let geoSize = width / 2;
  rotateY((cos(millis() / 1000) * PI) / 4);
  translate(-geoSize / 2, -geoSize / 2);
  scale(geoSize);
  model(myGeometry);
  pop();
}
