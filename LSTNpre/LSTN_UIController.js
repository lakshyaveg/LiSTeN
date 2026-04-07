var LSTN = LSTN || {};

/**
 * Responsibility: manage UI widgets (currently: PNG file upload input).
 */
LSTN.UIController = class {
  constructor(onImageData) {
    this.onImageData = onImageData;

    this.fileInput = createFileInput(this.handleFile.bind(this));
    this.fileInput.position(20, 20);
    this.fileInput.style("color", "white");
    this.fileInput.style("font-size", "14px");
    this.fileInput.attribute("accept", "image/png, image/gif");
  }

  handleFile(file) {
    if (file.type === "image" && (file.subtype === "png" || file.subtype === "gif")) {
      this.onImageData(file.data, file.subtype);
    } else {
      alert("Please upload a PNG or GIF image!");
    }
  }

  toggleFileInput(show) {
    show ? this.fileInput.show() : this.fileInput.hide();
  }
};