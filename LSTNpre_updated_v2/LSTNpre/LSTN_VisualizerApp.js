var LSTN = LSTN || {};

/**
 * Responsibility: runtime coordinator (frame loop orchestration).
 * Construction/wiring is handled by AppBootstrapper.
 */
LSTN.VisualizerApp = class {
  constructor(deps) {
    this.audioInput = deps.audioInput;
    this.spectrum = deps.spectrum;
    this.pulseEstimator = deps.pulse;

    this.state = deps.state;
    this.motion = deps.motion;
    this.rotation = deps.rotation;
    this.backgrounds = deps.backgrounds;
    this.overlay = deps.overlay;
    this.visuals = deps.visuals;
    this.display = deps.display;

    this.uiController = deps.uiController;
    this.input = deps.input;
    this.editor = deps.editor;

    // Connect FFT to mic once everything exists
    this.spectrum.setInput(this.audioInput.getMic());
  }

  start() {
    this.audioInput.start();
  }

  draw() {
    this.backgrounds.draw();

    const pulse = this.pulseEstimator.update();

    if (this.state.mode === "normal") {
      this.drawNormalMode(pulse);
    } else if (this.state.mode === "advanced") {
      this.drawAdvancedMode(pulse);
    }

    this.overlay.draw(this.state.showInstructions, this.state.mode);
  }

  drawNormalMode(pulse) {
    // Update motion + rotation state
    this.motion.update(this.state.bounceEnabled, pulse);
    this.rotation.update(this.state.rotateEnabled);

    push();
    translate(this.motion.posX, this.motion.posY);
    this.rotation.apply(this.state.rotateEnabled);

    const baseHue = (frameCount * 2) % 360;
    this.visuals.draw(baseHue, pulse);

    pop();
  }

  drawAdvancedMode(pulse) {
    const baseHue = (frameCount * 2) % 360;
    this.editor.update(pulse);
    this.editor.draw(baseHue, pulse, this.state.showInstructions);
  }

  handleKeyPress(key, keyCode) {
    this.input.handleKeyPress(key, keyCode);
  }

  handleMousePressed() {
    if (this.state.mode === "advanced") {
      const item = this.editor.getSelectedItemAtMouse(mouseX, mouseY);
      this.editor.selectItem(item);
      
      // Start box drawing if nothing was clicked
      if (!item) {
        this.editor.startBoxDrawing(mouseX, mouseY);
      }
    }
    return false;
  }

  handleMouseReleased() {
    if (this.state.mode === "advanced" && this.editor.isDrawingBox) {
      this.editor.endBoxDrawing(mouseX, mouseY);
    }
    return false;
  }

  handleMouseDragged() {
    if (this.state.mode === "advanced") {
      if (this.editor.selectedItem && !this.editor.isDrawingBox) {
        // Allow dragging selected item
        this.editor.selectedItem.x += mouseX - pmouseX;
        this.editor.selectedItem.y += mouseY - pmouseY;
      }
    }
    return false;
  }

  windowResized() {
    this.display.handleWindowResized();
  }
};
