var LSTN = LSTN || {};

/**
 * Responsibility: manage canvas items, box drawing, and item properties in advanced editor mode.
 */
LSTN.AdvancedEditor = class {
  constructor() {
    this.items = [];
    this.selectedItem = null;
    
    // Box drawing state
    this.isDrawingBox = false;
    this.boxStartX = 0;
    this.boxStartY = 0;
    
    // UI state
    this.showPropertyPanel = false;
    this.lastImageFile = null;
  }

  addItem(x, y, width, height, type = "heart") {
    const item = new LSTN.CanvasItem(x, y, width, height, type);
    this.items.push(item);
    this.selectItem(item);
    return item;
  }

  deleteItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      if (this.selectedItem === item) {
        this.selectItem(null);
      }
    }
  }

  selectItem(item) {
    if (this.selectedItem) {
      this.selectedItem.isSelected = false;
    }
    this.selectedItem = item;
    if (item) {
      item.isSelected = true;
    }
  }

  deleteSelectedItem() {
    if (this.selectedItem) {
      this.deleteItem(this.selectedItem);
      this.selectedItem = null;
    }
  }

  startBoxDrawing(x, y) {
    this.isDrawingBox = true;
    this.boxStartX = x;
    this.boxStartY = y;
  }

  endBoxDrawing(x, y) {
    if (!this.isDrawingBox) return;
    
    this.isDrawingBox = false;
    
    // Ensure positive width/height
    const boxX = (this.boxStartX + x) / 2;
    const boxY = (this.boxStartY + y) / 2;
    const boxWidth = abs(x - this.boxStartX);
    const boxHeight = abs(y - this.boxStartY);
    
    // Only create item if box has meaningful size
    if (boxWidth > 20 && boxHeight > 20) {
      this.addItem(boxX, boxY, boxWidth, boxHeight, "heart");
    }
  }

  cancelBoxDrawing() {
    this.isDrawingBox = false;
  }

  toggleSelectedItemBounce() {
    if (this.selectedItem) {
      this.selectedItem.setBounce(!this.selectedItem.bounceEnabled);
    }
  }

  toggleSelectedItemRotate() {
    if (this.selectedItem) {
      this.selectedItem.setRotate(!this.selectedItem.rotateEnabled);
    }
  }

  changeSelectedItemType(type) {
    if (this.selectedItem) {
      this.selectedItem.type = type;
    }
  }

  setSelectedItemImage(img) {
    if (this.selectedItem && img) {
      this.selectedItem.type = "image";
      this.selectedItem.setImage(img);
    }
  }

  getSelectedItemAtMouse(x, y) {
    // Check from top to bottom (most recently added = on top)
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].contains(x, y)) {
        return this.items[i];
      }
    }
    return null;
  }

  update(pulse) {
    for (let item of this.items) {
      item.update(pulse);
    }
  }

  draw(baseHue, pulse, showInstructions = true) {
    // Draw items
    for (let item of this.items) {
      item.draw(baseHue, pulse);
      // Only draw bounding boxes if instructions are shown
      if (showInstructions) {
        item.drawBoundingBox(item.isSelected);
      }
    }

    // Draw box being drawn
    if (this.isDrawingBox && showInstructions) {
      push();
      stroke(150, 255, 255, 200);
      strokeWeight(2);
      noFill();
      rectMode(CORNER);
      const w = mouseX - this.boxStartX;
      const h = mouseY - this.boxStartY;
      rect(this.boxStartX, this.boxStartY, w, h);
      pop();
    }
  }

  clear() {
    this.items = [];
    this.selectedItem = null;
    this.isDrawingBox = false;
  }
};
