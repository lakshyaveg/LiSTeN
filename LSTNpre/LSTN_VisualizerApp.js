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
    this.overlay = deps.overlay;
    this.visuals = deps.visuals;
    this.display = deps.display;

    this.uiController = deps.uiController;
    this.input = deps.input;

    // Connect FFT to mic once everything exists
    this.spectrum.setInput(this.audioInput.getMic());
  }

  start() {
    this.audioInput.start();
  }

  draw() {
    background(0, 25);

    const pulse = this.pulseEstimator.update();

    // Update motion + rotation state
    this.motion.update(this.state.bounceEnabled, pulse);
    this.rotation.update(this.state.rotateEnabled);

    push();
    translate(this.motion.posX, this.motion.posY);
    this.rotation.apply(this.state.rotateEnabled);

    const baseHue = (frameCount * 2) % 360;
    this.visuals.draw(baseHue, pulse);

    pop();

    this.overlay.draw(this.state.showInstructions);
  }

  handleKeyPress(key, keyCode) {
    this.input.handleKeyPress(key, keyCode);
  }

  windowResized() {
    this.display.handleWindowResized();
  }
};
