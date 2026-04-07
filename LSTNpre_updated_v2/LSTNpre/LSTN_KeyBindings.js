var LSTN = LSTN || {};

/**
 * Responsibility: map raw key events -> command names (pure mapping, no side effects).
 */
LSTN.KeyBindings = class {
  getCommandForKey(key, keyCode) {
    if (keyCode === ENTER) return "SET_HEART";
    if (keyCode === LEFT_ARROW || keyCode === DOWN_ARROW) return "PREVIOUS_BG_COLOR";
    if (keyCode === RIGHT_ARROW || keyCode === UP_ARROW) return "NEXT_BG_COLOR";
    if (keyCode === DELETE || key === "d" || key === "D") return "DELETE_SELECTED";
    if (key === "r" || key === "R") return "TOGGLE_ROTATE";
    if (key === "b" || key === "B") return "TOGGLE_BOUNCE";
    if (key === "a" || key === "A") return "TOGGLE_MODE";
    if (key === "h" || key === "H") return "SET_HEART_TYPE";
    if (key === "i" || key === "I") return "UPLOAD_IMAGE_FOR_SELECTED";
    if (key === "e" || key === "E") return "TOGGLE_INSTRUCTIONS";
    return "TOGGLE_FULLSCREEN";
  }
};
