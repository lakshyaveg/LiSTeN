 export function createPluginAPI(app) {
  return {
    // Safe p5 reference (optional but useful)
    p5: app.p5,

    // Canvas info
    width: () => app.p5.width,
    height: () => app.p5.height,

    // Mouse
    mouseX: () => app.p5.mouseX,
    mouseY: () => app.p5.mouseY,

    // Audio data (connect to your existing classes)
    getAudioLevel: () => app.audio?.getLevel?.() || 0,
    getSpectrum: () => app.spectrumAnalyzer?.getSpectrum?.() || [],

    // Shared state
    getState: () => app.state,
    setState: (key, value) => {
      app.state[key] = value;
    },

    // Safe fetch helper
    fetchJSON: async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  };
}