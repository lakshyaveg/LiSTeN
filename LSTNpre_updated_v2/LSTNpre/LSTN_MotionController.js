var LSTN = LSTN || {};

/**
 * Responsibility: maintain and update the visual's position (centered or bouncing).
 */
LSTN.MotionController = class {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.velX = 0;
    this.velY = 0;
    this.resetToCenter();
    this.randomizeVelocity();
  }

  resetToCenter() {
    this.posX = width / 2;
    this.posY = height / 2;
  }

  randomizeVelocity() {
    this.velX = random(3, 6) * (random() > 0.5 ? 1 : -1);
    this.velY = random(3, 6) * (random() > 0.5 ? 1 : -1);
  }

  /**
   * @param {boolean} bounceEnabled
   * @param {number} pulse - used to estimate the drawn size for boundary checks
   */
  update(bounceEnabled, pulse) {
    if (!bounceEnabled) {
      this.resetToCenter();
      return;
    }

    this.posX += this.velX;
    this.posY += this.velY;

    // Conservative bounding box based on pulse-scaled size
    const size = 300 * pulse;
    const half = size / 2;

    if (this.posX + half > width || this.posX - half < 0) this.velX *= -1;
    if (this.posY + half > height || this.posY - half < 0) this.velY *= -1;
  }
};
