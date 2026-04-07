let app;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 255, 255, 255);
  noStroke();

  const bootstrapper = new LSTN.AppBootstrapper();
  app = bootstrapper.build();
  app.start();
}

function draw() {
  app.draw();
}

function keyPressed() {
  app.handleKeyPress(key, keyCode);
}

function windowResized() {
  app.windowResized();
}
