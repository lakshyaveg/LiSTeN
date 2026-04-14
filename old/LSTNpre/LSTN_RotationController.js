var LSTN = LSTN || {};

/**
 * Responsibility: manage rotation state and apply rotation transform.
 */
LSTN.RotationController = class {
  constructor() {
    this.rotationAngle = 0;
    this.speed = 1; // degrees per frame (angleMode is set in main.js)
  }

  update(rotateEnabled) {
    if (rotateEnabled) this.rotationAngle += this.speed;
  }

  apply(rotateEnabled) {
    if (rotateEnabled) rotate(this.rotationAngle);
  }
};
