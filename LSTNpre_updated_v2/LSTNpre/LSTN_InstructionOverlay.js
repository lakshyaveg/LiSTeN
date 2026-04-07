var LSTN = LSTN || {};

/**
 * Responsibility: render the on-screen instruction text based on current mode.
 */
LSTN.InstructionOverlay = class {
  constructor(backgroundManager) {
    this.backgroundManager = backgroundManager;
    this.marginX = 20;
    this.marginBottom = 165;
  }

  draw(shouldShow, mode) {
    if (!shouldShow) return;

    let textValue;
    
    if (mode === "advanced") {
      textValue =
        "ADVANCED EDITOR MODE\n" +
        "DRAG = Draw box to create item\n" +
        "CLICK = Select item\n" +
        "DELETE/D = Delete selected item\n" +
        "H = Switch selected item to Heart\n" +
        "I = Upload custom image for selected item\n" +
        "B = Toggle bounce on selected item\n" +
        "R = Toggle rotate on selected item\n" +
        "A = Toggle between Normal/Advanced mode\n" +
        "E = Hide/Show Instructions";
    } else {
      textValue =
        "1. Upload PNG or GIF (main visual)\n" +
        "2. Upload PNG or GIF (background)\n" +
        "ENTER = Heart\n" +
        "R = Rotate\n" +
        "B = Bounce\n" +
        "Left/Down Arrow = Previous BG Color\n" +
        "Right/Up Arrow = Next BG Color\n" +
        "BG Colors = Black, White, Red, Orange, Yellow, Green, Blue, Purple, Pink\n" +
        "A = Advanced Editor Mode\n" +
        "E = Hide/Show Instructions\n" +
        "Any Other Key = Fullscreen";
    }

    textFont("Tahoma");
    resetMatrix();
    fill(255);
    textSize(14);
    textAlign(LEFT, TOP);
    text(textValue, this.marginX, height - this.marginBottom);
  }
};
