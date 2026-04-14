var LSTN = LSTN || {};

/**
 * Responsibility: fullscreen toggling and canvas resizing.
 */
LSTN.DisplayManager = class {
  toggleFullscreen() {
    const fs = !fullscreen();
    fullscreen(fs);
    resizeCanvas(windowWidth, windowHeight);
  }

  handleWindowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
};
