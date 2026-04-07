var LSTN = LSTN || {};

/**
 * Responsibility: represent a single item on the canvas with position, size, and animation properties.
 */
LSTN.CanvasItem = class {
  constructor(x, y, width, height, type = "heart", imageFile = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // "heart" or "image"
    this.imageFile = imageFile;
    this.image = null;
    
    // Animation properties
    this.bounceEnabled = false;
    this.rotateEnabled = false;
    
    // Bounce state
    this.velX = 0;
    this.velY = 0;
    this.resetBounceVelocity();
    
    // Rotation state
    this.rotationAngle = 0;
    this.rotationSpeed = 1;
    
    // Drawing state
    this.isSelected = false;
  }

  resetBounceVelocity() {
    this.velX = random(2, 4) * (random() > 0.5 ? 1 : -1);
    this.velY = random(2, 4) * (random() > 0.5 ? 1 : -1);
  }

  setBounce(enabled) {
    this.bounceEnabled = enabled;
    if (enabled && (this.velX === 0 && this.velY === 0)) {
      this.resetBounceVelocity();
    }
  }

  setRotate(enabled) {
    this.rotateEnabled = enabled;
  }

  setImage(img) {
    this.image = img;
  }

  update(pulse) {
    if (this.bounceEnabled) {
      this.x += this.velX;
      this.y += this.velY;

      const half = max(this.width, this.height) / 2;
      if (this.x + half > width || this.x - half < 0) this.velX *= -1;
      if (this.y + half > height || this.y - half < 0) this.velY *= -1;
    }

    if (this.rotateEnabled) {
      this.rotationAngle += this.rotationSpeed;
    }
  }

  draw(baseHue, pulse) {
    push();
    translate(this.x, this.y);

    if (this.rotateEnabled) {
      rotate(this.rotationAngle);
    }

    if (this.type === "heart") {
      this.drawHeart(baseHue, pulse);
    } else if (this.type === "image" && this.image) {
      this.drawImage(baseHue, pulse);
    }

    pop();
  }

  drawHeart(baseHue, pulse) {
    for (let g = 2; g >= 0; g--) {
      let glowScale = (this.width / 60) * (5 + g * 4);
      let alpha = 120 - g * 30;
      let hue = (baseHue + g * 15) % 360;
      fill(hue, 255, 255, alpha);

      beginShape();
      for (let angle = 0; angle < 360; angle += 2) {
        let x = 16 * pow(sin(angle), 3);
        let y =
          13 * cos(angle) -
          5 * cos(2 * angle) -
          2 * cos(3 * angle) -
          cos(4 * angle);

        x *= glowScale * pulse * 0.6;
        y *= -glowScale * pulse * 0.6;

        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }

  drawImage(baseHue, pulse) {
    const size = max(this.width, this.height) * pulse;
    const tintHue = (baseHue + 30) % 360;
    tint(tintHue, 255, 255, 220);
    imageMode(CENTER);
    image(this.image, 0, 0, size, size);
  }

  drawBoundingBox(isSelected = false) {
    push();
    if (isSelected) {
      stroke(100, 255, 255, 200);
      strokeWeight(3);
    } else {
      stroke(200, 100, 255, 150);
      strokeWeight(2);
    }
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  contains(mx, my) {
    return (
      mx > this.x - this.width / 2 &&
      mx < this.x + this.width / 2 &&
      my > this.y - this.height / 2 &&
      my < this.y + this.height / 2
    );
  }
};
