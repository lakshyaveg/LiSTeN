var LSTN = LSTN || {};

/**
 * Responsibility: perform FFT analysis over a provided audio source.
 */
LSTN.SpectrumAnalyzer = class {
  constructor() {
    this.fft = new p5.FFT(0.5, 1024);
  }

  setInput(audioSource) {
    this.fft.setInput(audioSource);
  }

  /**
   * Returns average energy in a frequency range (Hz).
   */
  getFrequencyEnergy(freqRange = [20, 20000]) {
    const spectrum = this.fft.analyze();
    const lowIndex = this.fft.getBandIndex(freqRange[0]);
    const highIndex = this.fft.getBandIndex(freqRange[1]);

    let total = 0;
    for (let i = lowIndex; i <= highIndex; i++) total += spectrum[i];
    return total / (highIndex - lowIndex + 1);
  }
};
