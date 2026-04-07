var LSTN = LSTN || {};

/**
 * Responsibility: manage background palette selection and optional background image rendering.
 */
LSTN.BackgroundManager = class {
  constructor() {
    this.palette = [
      { name: "Black", values: [0, 0, 0] },
      { name: "White", values: [0, 0, 255] },
      { name: "Red", values: [0, 255, 255] },
      { name: "Orange", values: [30, 255, 255] },
      { name: "Yellow", values: [60, 255, 255] },
      { name: "Green", values: [120, 255, 255] },
      { name: "Blue", values: [220, 255, 255] },
      { name: "Purple", values: [280, 255, 255] },
      { name: "Pink", values: [330, 180, 255] },
    ];

    this.colorIndex = 0;
    this.backgroundImage = null;
  }

  cycleNextColor() {
    this.colorIndex = (this.colorIndex + 1) % this.palette.length;
  }

  cyclePreviousColor() {
    this.colorIndex = (this.colorIndex - 1 + this.palette.length) % this.palette.length;
  }

  getCurrentColorName() {
    return this.palette[this.colorIndex].name;
  }

  setBackgroundImage(img) {
    this.backgroundImage = img;
  }

  draw() {
    const currentColor = this.palette[this.colorIndex].values;
    background(currentColor[0], currentColor[1], currentColor[2]);

    if (this.backgroundImage) {
      push();
      imageMode(CORNER);
      noTint();
      image(this.backgroundImage, 0, 0, width, height);
      pop();
    }
  }
};
