var LSTN = LSTN || {};

/**
 * Responsibility: own and swap the current visual element.
 */
LSTN.VisualElementManager = class {
  constructor() {
    // All visuals are drawn at the origin; VisualizerApp translates to the current position.
    this.element = new LSTN.Shape(0, 0, "heart");
  }

  setHeart() {
    this.element = new LSTN.Shape(0, 0, "heart");
  }

  setUserImage(img) {
    this.element = new LSTN.UserImage(0, 0, img);
  }

  draw(baseHue, pulse) {
    this.element.draw(baseHue, pulse);
  }
};
