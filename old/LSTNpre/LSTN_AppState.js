var LSTN = LSTN || {};

LSTN.AppState = class {
  constructor() {
    // Feature toggles / UI state
    this.rotateEnabled = false;
    this.bounceEnabled = false;
    this.showInstructions = true;
  }

  toggleRotate() { this.rotateEnabled = !this.rotateEnabled; }
  toggleBounce() { this.bounceEnabled = !this.bounceEnabled; }
  toggleInstructions() { this.showInstructions = !this.showInstructions; }
};
