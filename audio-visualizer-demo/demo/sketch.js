let mic, fft;
let angleOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  noStroke();
  frameRate(60);
}

function draw() {
  background(0, 20); // Slight trail

  translate(width / 2, height / 2);
  angleOffset += 0.5; // rotate slowly

  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  let totalBands = 100;
  let radiusBase = map(bass, 0, 255, 100, 300);
  
  for (let i = 0; i < totalBands; i++) {
    let angle = i * (360 / totalBands) + angleOffset;
    let r = radiusBase + sin(frameCount + i * 10) * 50;

    let x = r * cos(angle);
    let y = r * sin(angle);

    let hue = (angle + frameCount) % 360;
    fill(hue, 255, 255, 150);
    ellipse(x, y, map(mid, 0, 255, 5, 20), map(treble, 0, 255, 5, 20));
  }
}

function keyPressed() {
  // Press any key to go fullscreen!
  let fs = fullscreen();
  fullscreen(!fs);
}

function preload() {
  colorMode(HSB, 360, 255, 255, 255);
}