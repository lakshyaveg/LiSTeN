var LSTN = LSTN || {};

/**
 * Responsibility: draw a user-provided image with a pulse-scaled size + tint.
 */
LSTN.UserImage = class extends LSTN.VisualElement {
  constructor(x, y, img) {
    super(x, y);
    this.img = img;
  }

  draw(baseHue, pulse) {
    const size = 300 * pulse;
    const tintHue = (baseHue + 30) % 360;

    tint(tintHue, 255, 255, 220);
    imageMode(CENTER);

    // VisualizerApp translates to the current position; draw at local origin.
    image(this.img, 0, 0, size, size);
  }
};
