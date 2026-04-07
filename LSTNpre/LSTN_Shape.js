// LSTN_Shape.js
var LSTN = LSTN || {};

LSTN.Shape = class Shape extends LSTN.VisualElement {
  constructor(x, y, shapeType = "heart") {
    super(x, y);
    this.shapeType = shapeType;
  }

  draw(baseHue, pulse) {
    if (this.shapeType === "heart") this.drawHeart(baseHue, pulse);
  }

  drawHeart(baseHue, pulse) {
    for (let g = 3; g >= 0; g--) {
      let glowScale = 10 + g * 6;
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
};
