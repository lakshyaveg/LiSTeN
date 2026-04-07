var LSTN = LSTN || {};

LSTN.AppState = class {
  constructor() {
    // Feature toggles / UI state
    this.rotateEnabled = false;
    this.bounceEnabled = false;
    this.showInstructions = true;
    
    // Mode management
    this.mode = "normal"; // "normal" or "advanced"
  }

  toggleRotate() { this.rotateEnabled = !this.rotateEnabled; }
  toggleBounce() { this.bounceEnabled = !this.bounceEnabled; }
  toggleInstructions() { this.showInstructions = !this.showInstructions; }
  
  toggleMode() {
    this.mode = this.mode === "normal" ? "advanced" : "normal";
  }
  
  setMode(mode) {
    if (mode === "normal" || mode === "advanced") {
      this.mode = mode;
    }
  }
};
