var LSTN = LSTN || {};

LSTN.VisualElement = class {
  constructor(x, y) {
    if (this.constructor === LSTN.VisualElement) {
      throw new Error("Cannot instantiate VisualElement directly.");
    }
    this.x = x;
    this.y = y;
  }

  draw() {}
};
  