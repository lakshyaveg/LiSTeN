var LSTN = LSTN || {};

/**
 * Responsibility: convert file data into a p5.Image (async).
 */
LSTN.ImageLoader = class {
  loadFromData(data, onLoaded) {
    loadImage(data, (img) => onLoaded(img));
  }
};
