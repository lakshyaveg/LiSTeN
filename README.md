## **About The Project**

  This project is an audio-responsive visualization created with the p5.js and p5.sound libraries. It transforms live microphone input into a rotating circular animation that visually represents different sound frequencies.
The visualizer reacts in real time to bass, mid, and treble levels, producing dynamic movement, color variation, and rhythmic motion that reflect the intensity of the incoming audio signal.

## **How It Works**

- The sketch initializes a microphone input using p5.AudioIn() and processes it with the Fast Fourier Transform (FFT) through p5.FFT().

- The FFT separates sound into frequency bands (bass, mid, treble).

- These values influence the size, position, and color of rotating ellipses displayed around the center of the canvas.

- The entire composition continuously rotates using an angle offset, and a low-opacity background creates a soft trail effect over time.

- Pressing any key toggles full-screen mode, allowing for a more immersive visual experience.

## **Key Features**

- Real-time microphone-based audio visualization

- Smooth, rotating geometric motion
  
- Dynamic color transitions in HSB color mode
  
- Gradual trail effects for motion persistence
  
- Fullscreen toggle with a single key press

## **Running The Project**

### Requirements

- A web browser that supports microphone access (Ex, Google)

- Optionally, a simple local server for best performance

### Installation

1. Place all project files in the same directory.

2. Open index.html in your browser.

3. When prompted, allow the page to access your microphone.

4. Speak, play music, or make sounds near your device, and the animation will respond to the audio input.

## Libraries and Dependencies

- p5.js v1.11.10

- p5.sound v1.0.1
