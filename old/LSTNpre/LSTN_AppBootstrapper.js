var LSTN = LSTN || {};

/**
 * Responsibility: composition root (build + wire app dependencies).
 */
LSTN.AppBootstrapper = class {
  build() {
    // Core services
    const audioInput = new LSTN.AudioInput();
    const spectrum = new LSTN.SpectrumAnalyzer();
    const pulse = new LSTN.PulseEstimator(audioInput);
    const imageLoader = new LSTN.ImageLoader();

    // State + controllers
    const state = new LSTN.AppState();
    const motion = new LSTN.MotionController();
    const rotation = new LSTN.RotationController();
    const overlay = new LSTN.InstructionOverlay();
    const visuals = new LSTN.VisualElementManager();
    const display = new LSTN.DisplayManager();

    // UI
    const uiController = new LSTN.UIController((pngData) => {
      imageLoader.loadFromData(pngData, (img) => visuals.setUserImage(img));
    });

    // Input wiring
    const bindings = new LSTN.KeyBindings();
    const commands = new LSTN.AppCommands({
      state,
      visuals,
      motion,
      display,
      ui: uiController,
    });
    const input = new LSTN.InputController({ bindings, commands });

    // Final app runtime
    return new LSTN.VisualizerApp({
      audioInput,
      spectrum,
      pulse,
      state,
      motion,
      rotation,
      overlay,
      visuals,
      display,
      uiController,
      input,
    });
  }
};
