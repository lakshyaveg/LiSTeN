import { expect } from "chai";
import { MotionController } from "../LSTN_MotionController.js";

describe("LSTN.MotionController", () => {

  beforeEach(() => {
    global.width = 800;
    global.height = 600;
    global.random = () => 0.6;
  });

  afterEach(() => {
    delete global.width;
    delete global.height;
    delete global.random;
  });

  it("resetToCenter() uses width/height", () => {

    const motion = new MotionController();

    expect(motion.posX).to.equal(width / 2);
    expect(motion.posY).to.equal(height / 2);

  });

  it("update(false, pulse) keeps the element centered", () => {

    const motion = new MotionController();

    motion.posX = 10;
    motion.posY = 20;

    motion.update(false, 1);

    expect(motion.posX).to.equal(width / 2);
    expect(motion.posY).to.equal(height / 2);

  });

  it("update(true, pulse) inverts velocity when hitting bounds", () => {

    const motion = new MotionController();

    motion.posX = 299;
    motion.posY = 150;
    motion.velX = 5;
    motion.velY = 0;

    global.width = 300;
    global.height = 300;

    motion.update(true, 0.1);

    expect(motion.velX).to.equal(-5);

  });

});