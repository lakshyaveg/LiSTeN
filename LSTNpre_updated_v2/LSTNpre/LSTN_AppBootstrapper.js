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
    const backgrounds = new LSTN.BackgroundManager();
    const overlay = new LSTN.InstructionOverlay(backgrounds);
    const visuals = new LSTN.VisualElementManager();
    const display = new LSTN.DisplayManager();
    const editor = new LSTN.AdvancedEditor();

    // UI
    const uiController = new LSTN.UIController(
      (imageData) => {
        imageLoader.loadFromData(imageData, (img) => visuals.setUserImage(img));
      },
      (imageData) => {
        imageLoader.loadFromData(imageData, (img) => backgrounds.setBackgroundImage(img));
      },
      (imageData) => {
        imageLoader.loadFromData(imageData, (img) => {
          if (editor.selectedItem) {
            editor.setSelectedItemImage(img);
          }
        });
      }
    );

    // Input wiring
    const bindings = new LSTN.KeyBindings();
    const commands = new LSTN.AppCommands({
      state,
      visuals,
      motion,
      display,
      ui: uiController,
      backgrounds,
      editor,
    });
    const input = new LSTN.InputController({ bindings, commands });

    // Final app runtime
    const app = new LSTN.VisualizerApp({
      audioInput,
      spectrum,
      pulse,
      state,
      motion,
      rotation,
      backgrounds,
      overlay,
      visuals,
      display,
      uiController,
      input,
      editor,
    });

    return app;
  }
};
