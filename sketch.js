let diyaShader;
let intensity = 1.0;

function preload() {
  diyaShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(diyaShader);
  background(0);
  diyaShader.setUniform("u_resolution", [width, height]);
  diyaShader.setUniform("u_time", millis() / 1000.0);
  diyaShader.setUniform("u_intensity", intensity);

  rect(-width / 2, -height / 2, width, height);

  // Slowly fade intensity back to base
  intensity = lerp(intensity, 1.0, 0.05);
}

function mousePressed() {
  intensity = 2.5; // burst of light on click
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
