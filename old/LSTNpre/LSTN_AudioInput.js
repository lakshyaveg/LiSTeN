var LSTN = LSTN || {};

/**
 * Responsibility: manage microphone input lifecycle + provide current amplitude level.
 */
LSTN.AudioInput = class {
  constructor() {
    this.mic = new p5.AudioIn();
  }

  start() {
    this.mic.start();
    // Keep mic gain configuration here (input concern)
    this.mic.amp(2.0);
  }

  getLevel() {
    return this.mic.getLevel();
  }

  getMic() {
    return this.mic;
  }
};
