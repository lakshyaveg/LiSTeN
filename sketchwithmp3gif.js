let mic, fft;
let smoothedPulse = 0;
let userImg = null;
let useHeart = true;

let imgInput, audioInput;
let imgLabel, audioLabel;

let audioFile = null;
let usingMic = true;

let rotateEnabled = false;
let rotationAngle = 0;

let bounceEnabled = false;
let posX, posY;
let velX, velY;

let showInstructions = true;

//color system
let colorModeIndex = 0;
const colorModes = [
  "rainbow",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 255, 255, 255);
  noStroke();

  // MIC DEFAULT
  mic = new p5.AudioIn();
  mic.start();
  mic.amp(2.0);

  fft = new p5.FFT(0.5, 1024);
  fft.setInput(mic);

  // PNG/GIF UPLOAD PANEL
  imgLabel = createDiv("Choose PNG/GIF file:");
  imgLabel.position(20, 0).style("color", "white");

  imgInput = createFileInput(handleImageFile);
  imgInput.position(20, 20);
  imgInput.style("color", "white");
  imgInput.style("font-size", "14px");
  imgInput.attribute("accept", "image/png, image/gif");

  // MP3 UPLOAD PANEL
  audioLabel = createDiv("Choose MP3 file:");
  audioLabel.position(20, 55).style("color", "white");

  audioInput = createFileInput(handleAudioFile);
  audioInput.position(20, 75);
  audioInput.style("color", "white");
  audioInput.style("font-size", "14px");
  audioInput.attribute("accept", "audio/*");

  posX = width / 2;
  posY = height / 2;
  velX = random(3, 6);
  velY = random(3, 6);
}

function draw() {
  background(0, 25);

  // BOUNCE
  if (bounceEnabled) {
    posX += velX;
    posY += velY;

    let shpSize = 300 * smoothedPulse;
    let halfSize = shpSize / 2;

    if (posX + halfSize > width || posX - halfSize < 0) velX *= -1;
    if (posY + halfSize > height || posY - halfSize < 0) velY *= -1;
  } else {
    posX = width / 2;
    posY = height / 2;
  }

  push();
  translate(posX, posY);

  // ROTATION
  if (rotateEnabled) {
    rotationAngle += 1;
    rotate(rotationAngle);
  }

  // MIC vs MP3 AUDIO
  let level;
  if (usingMic) {
    level = mic.getLevel(); // ~0.0 → 0.2
  } else {
    fft.analyze();
    level = fft.getEnergy("bass") / 255; // ~0.0 → 1.0

    // -------------------------
    // Subtle MP3 pulsation boost
    // -------------------------
    level *= 1.2;             // boost effect
    level = constrain(level, 0, 1); // keep within 0-1
  }

  // Smooth pulse
  let targetPulse = map(level, 0, 1, 0.3, 1.8, true);
  smoothedPulse = lerp(smoothedPulse, targetPulse, 0.15);

  let baseHue = (frameCount * 2) % 360;

  // Draw
  if (useHeart) {
    drawHeart(baseHue);
  } else if (userImg) {
    drawUserImage(baseHue);
  }

  pop();

  if (showInstructions) drawInstructions();
}

// heart color themes
function themedHue(baseHue, layerShift) {
  switch (colorModes[colorModeIndex]) {
    case "rainbow": return (baseHue + layerShift) % 360;
    case "red": return 0;
    case "orange": return 30;
    case "yellow": return 60;
    case "green": return 120;
    case "blue": return 240;
    case "purple": return 280;
    case "pink": return 330;
    default: return (baseHue + layerShift) % 360;
  }
}

function drawHeart(baseHue) {
  for (let g = 3; g >= 0; g--) {
    let glowScale = 10 + g * 6;
    let alpha = 120 - g * 30;

    let hue = themedHue(baseHue, g * 15);
    fill(hue, 255, 255, alpha);

    beginShape();
    for (let angle = 0; angle < 360; angle += 2) {
      let x = 16 * pow(sin(angle), 3);
      let y =
        13 * cos(angle) -
        5 * cos(2 * angle) -
        2 * cos(3 * angle) -
        cos(4 * angle);
      x *= glowScale * smoothedPulse * 0.6;
      y *= -glowScale * smoothedPulse * 0.6;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function drawUserImage(baseHue) {
  let imgSize = 300 * smoothedPulse;

  let tintHue = themedHue(baseHue, 30);
  tint(tintHue, 255, 255, 220);

  imageMode(CENTER);
  image(userImg, 0, 0, imgSize, imgSize);
}

// file handlers: png/gif
function handleImageFile(file) {
  if (file.type === "image" && (file.subtype === "png" || file.subtype === "gif")) {

    userImg = loadImage(file.data, () => {
      useHeart = false;
    });

  } else {
    alert("Please upload a PNG or GIF file!");
  }
}

// audio handler
function handleAudioFile(file) {
  if (file.type !== "audio") {
    alert("Please upload an MP3/WAV/OGG file.");
    return;
  }

  usingMic = false;
  mic.stop();

  if (audioFile && audioFile.isPlaying()) audioFile.stop();

  audioFile = loadSound(file.data, () => {
    audioFile.loop();
    fft.setInput(audioFile);
  });
}

// key handling
function keyPressed() {
  if (keyCode === ENTER) {
    useHeart = true;
    userImg = null;

  } else if (key === "R" || key === "r") {
    rotateEnabled = !rotateEnabled;

  } else if (key === "B" || key === "b") {
    bounceEnabled = !bounceEnabled;
    if (bounceEnabled) {
      velX = random(3, 6) * (random() > 0.5 ? 1 : -1);
      velY = random(3, 6) * (random() > 0.5 ? 1 : -1);
    }

  } else if (key === "E" || key === "e") {
    showInstructions = !showInstructions;
    if (showInstructions) {
      imgInput.show();
      audioInput.show();
      imgLabel.show();
      audioLabel.show();
    } else {
      imgInput.hide();
      audioInput.hide();
      imgLabel.hide();
      audioLabel.hide();
    }

  // COLOR CYCLING
  } else if (keyCode === RIGHT_ARROW) {
    colorModeIndex = (colorModeIndex + 1) % colorModes.length;

  } else if (keyCode === LEFT_ARROW) {
    colorModeIndex =
      (colorModeIndex - 1 + colorModes.length) % colorModes.length;

  } else {
    let fs = !fullscreen();
    fullscreen(fs);
    resizeCanvas(windowWidth, windowHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawInstructions() {
  resetMatrix();
  fill(255);
  textAlign(LEFT, TOP);
  textSize(14);

  text(
    "Upload PNG/GIF to replace heart.\n" +
    "Upload MP3 to use audio instead of mic.\n" +
    "LEFT/RIGHT arrows: change color mode.\n" +
    "Press ENTER to restore heart.\n" +
    "Press R to rotate.\n" +
    "Press B to bounce.\n" +
    "Press E to hide/show menus.\n" +
    "Press any other key for fullscreen.",
    20,
    height - 180
  );
}
