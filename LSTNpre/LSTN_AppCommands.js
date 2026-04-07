var LSTN = LSTN || {};

/**
 * Responsibility: provide app-level commands (side effects) for input/controller layers to call.
 */
LSTN.AppCommands = class {
  constructor(deps) {
    this.state = deps.state;
    this.visuals = deps.visuals;
    this.motion = deps.motion;
    this.display = deps.display;
    this.ui = deps.ui;
  }

  execute(commandName) {
    switch (commandName) {
      case "SET_HEART":
        this.visuals.setHeart();
        break;

      case "TOGGLE_ROTATE":
        this.state.toggleRotate();
        break;

      case "TOGGLE_BOUNCE":
        this.state.toggleBounce();
        if (this.state.bounceEnabled) this.motion.randomizeVelocity();
        break;

      case "TOGGLE_INSTRUCTIONS":
        this.state.toggleInstructions();
        this.ui.toggleFileInput(this.state.showInstructions);
        break;

      case "TOGGLE_FULLSCREEN":
      default:
        this.display.toggleFullscreen();
        break;
    }
  }
};
