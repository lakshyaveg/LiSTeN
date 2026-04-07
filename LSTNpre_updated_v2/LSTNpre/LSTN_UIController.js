var LSTN = LSTN || {};

/**
 * Responsibility: manage UI widgets for foreground/background image uploads and editor image uploads.
 */
LSTN.UIController = class {
  constructor(onForegroundImageData, onBackgroundImageData, onEditorImageData) {
    this.onForegroundImageData = onForegroundImageData;
    this.onBackgroundImageData = onBackgroundImageData;
    this.onEditorImageData = onEditorImageData;

    this.foregroundInput = createFileInput(this.handleForegroundFile.bind(this));
    this.foregroundInput.position(20, 20);
    this.foregroundInput.style("color", "white");
    this.foregroundInput.style("font-size", "14px");
    this.foregroundInput.attribute("accept", "image/png, image/gif");

    this.backgroundInput = createFileInput(this.handleBackgroundFile.bind(this));
    this.backgroundInput.position(20, 50);
    this.backgroundInput.style("color", "white");
    this.backgroundInput.style("font-size", "14px");
    this.backgroundInput.attribute("accept", "image/png, image/gif");

    this.editorImageInput = createFileInput(this.handleEditorImageFile.bind(this));
    this.editorImageInput.position(20, 80);
    this.editorImageInput.style("color", "white");
    this.editorImageInput.style("font-size", "14px");
    this.editorImageInput.attribute("accept", "image/png, image/gif");
    this.editorImageInput.hide();
  }

  handleForegroundFile(file) {
    if (this.isSupportedImage(file)) {
      this.onForegroundImageData(file.data, file.subtype);
    } else {
      alert("Please upload a PNG or GIF image!");
    }
  }

  handleBackgroundFile(file) {
    if (this.isSupportedImage(file)) {
      this.onBackgroundImageData(file.data, file.subtype);
    } else {
      alert("Please upload a PNG or GIF image!");
    }
  }

  handleEditorImageFile(file) {
    if (this.isSupportedImage(file)) {
      this.onEditorImageData(file.data, file.subtype);
      // Clear the input so the same file can be selected again
      this.editorImageInput.value = "";
    } else {
      alert("Please upload a PNG or GIF image!");
      // Clear the input on error too
      this.editorImageInput.value = "";
    }
  }

  isSupportedImage(file) {
    return file.type === "image" && (file.subtype === "png" || file.subtype === "gif");
  }

  toggleFileInput(show) {
    if (show) {
      this.foregroundInput.show();
      this.backgroundInput.show();
    } else {
      this.foregroundInput.hide();
      this.backgroundInput.hide();
    }
  }

  triggerImageUploadForEditor() {
    // Use DOM element to ensure click works reliably
    if (this.editorImageInput && this.editorImageInput.elt) {
      this.editorImageInput.elt.click();
    } else if (this.editorImageInput) {
      this.editorImageInput.click();
    }
  }
};
