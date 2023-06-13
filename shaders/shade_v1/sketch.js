// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file
// So far the code doesn't do what I am trying to do but does craete a "daisy-like" shape
let theShader;

function preload() {
  // load the shader
  theShader = loadShader("super.vert", "super.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
}

function draw() {
  background(0);

  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis() / 1000.0);

  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}

function mousePressed() {
  save("shape.jpg");
}
