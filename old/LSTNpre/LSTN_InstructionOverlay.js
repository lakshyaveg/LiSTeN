var LSTN = LSTN || {};

/**
 * Responsibility: render the on-screen instruction text.
 */
LSTN.InstructionOverlay = class {
  constructor() {
    this.text =
      "Upload PNG or GIF\nENTER = Heart\nR = Rotate\nB = Bounce\nE = Instructions\nAny Key = Fullscreen";
    this.marginX = 20;
    this.marginBottom = 130;
  }

  draw(shouldShow) {
    if (!shouldShow) return;
    textFont("Tahoma");
    resetMatrix();
    fill(255);
    textSize(14);
    textAlign(LEFT, TOP);
    text(this.text, this.marginX, height - this.marginBottom);
  }
};
