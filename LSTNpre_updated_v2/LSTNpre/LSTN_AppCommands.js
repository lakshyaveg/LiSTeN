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
    this.backgrounds = deps.backgrounds;
    this.editor = deps.editor;
  }

  execute(commandName) {
    switch (commandName) {
      case "SET_HEART":
        if (this.state.mode === "normal") {
          this.visuals.setHeart();
        }
        break;

      case "PREVIOUS_BG_COLOR":
        this.backgrounds.cyclePreviousColor();
        break;

      case "NEXT_BG_COLOR":
        this.backgrounds.cycleNextColor();
        break;

      case "TOGGLE_ROTATE":
        if (this.state.mode === "normal") {
          this.state.toggleRotate();
        } else {
          this.editor.toggleSelectedItemRotate();
        }
        break;

      case "TOGGLE_BOUNCE":
        if (this.state.mode === "normal") {
          this.state.toggleBounce();
          if (this.state.bounceEnabled) this.motion.randomizeVelocity();
        } else {
          this.editor.toggleSelectedItemBounce();
        }
        break;

      case "TOGGLE_INSTRUCTIONS":
        this.state.toggleInstructions();
        if (this.state.mode === "normal") {
          this.ui.toggleFileInput(this.state.showInstructions);
        }
        break;

      case "TOGGLE_MODE":
        this.state.toggleMode();
        this.ui.toggleFileInput(this.state.mode === "normal" && this.state.showInstructions);
        break;

      case "DELETE_SELECTED":
        if (this.state.mode === "advanced") {
          this.editor.deleteSelectedItem();
        }
        break;

      case "SET_HEART_TYPE":
        if (this.state.mode === "advanced") {
          this.editor.changeSelectedItemType("heart");
        }
        break;

      case "UPLOAD_IMAGE_FOR_SELECTED":
        if (this.state.mode === "advanced") {
          // The UI controller needs to handle this - signal that we want to upload
          // For now, just trigger the file input
          this.ui.triggerImageUploadForEditor();
        }
        break;

      case "TOGGLE_FULLSCREEN":
      default:
        this.display.toggleFullscreen();
        break;
    }
  }
};
