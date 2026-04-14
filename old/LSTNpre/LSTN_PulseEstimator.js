var LSTN = LSTN || {};

/**
 * Responsibility: convert raw audio level into a smoothed "pulse" value for visuals.
 * (No mic/FFT setup here.)
 */
LSTN.PulseEstimator = class {
  constructor(audioInput) {
    this.audioInput = audioInput;
    this.smoothedPulse = 0;
  }

  update() {
    const level = this.audioInput.getLevel();
    const target = map(level, 0, 0.2, 0.3, 1.8, true);
    this.smoothedPulse = lerp(this.smoothedPulse, target, 0.15);
    return this.smoothedPulse;
  }
};
