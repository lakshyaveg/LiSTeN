var LSTN = LSTN || {};

/**
 * Responsibility: map raw key events -> command names (pure mapping, no side effects).
 */
LSTN.KeyBindings = class {
  getCommandForKey(key, keyCode) {
    if (keyCode === ENTER) return "SET_HEART";
    if (key === "r" || key === "R") return "TOGGLE_ROTATE";
    if (key === "b" || key === "B") return "TOGGLE_BOUNCE";
    if (key === "e" || key === "E") return "TOGGLE_INSTRUCTIONS";
    return "TOGGLE_FULLSCREEN";
  }
};
