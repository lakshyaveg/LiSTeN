var LSTN = LSTN || {};

/**
 * Responsibility: route raw input events to commands (no direct app side-effects).
 */
LSTN.InputController = class {
  constructor(deps) {
    this.bindings = deps.bindings;     // KeyBindings
    this.commands = deps.commands;     // AppCommands
  }

  handleKeyPress(key, keyCode) {
    const commandName = this.bindings.getCommandForKey(key, keyCode);
    this.commands.execute(commandName);
  }
};
