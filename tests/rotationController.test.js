import { expect } from "chai";
import sinon from "sinon";
import { RotationController } from "../LSTN_RotationController.js";

describe("LSTN.RotationController", () => {
  afterEach(() => {
    delete global.rotate;
  });

  it("updates rotationAngle only when rotateEnabled is true", () => {
    const rot = new RotationController();
    expect(rot.rotationAngle).to.equal(0);

    rot.update(false);
    expect(rot.rotationAngle).to.equal(0);

    rot.update(true);
    expect(rot.rotationAngle).to.equal(1);

    rot.update(true);
    expect(rot.rotationAngle).to.equal(2);
  });

  it("apply() calls global rotate() only when enabled", () => {
    const rotateSpy = sinon.spy();
    global.rotate = rotateSpy;

    const rot = new RotationController();
    rot.rotationAngle = 42;

    rot.apply(false);
    expect(rotateSpy.called).to.equal(false);

    rot.apply(true);
    expect(rotateSpy.calledOnce).to.equal(true);
    expect(rotateSpy.firstCall.args[0]).to.equal(42);
  });
});