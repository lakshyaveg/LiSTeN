import { expect } from "chai";
import { AppState } from "../LSTN_AppState.js";

describe("LSTN.AppState", () => {

  it("toggles rotate/bounce/instructions flags", () => {

    const state = new AppState();

    expect(state.rotateEnabled).to.equal(false);
    expect(state.bounceEnabled).to.equal(false);
    expect(state.showInstructions).to.equal(true);

    state.toggleRotate();
    expect(state.rotateEnabled).to.equal(true);

    state.toggleBounce();
    expect(state.bounceEnabled).to.equal(true);

    state.toggleInstructions();
    expect(state.showInstructions).to.equal(false);

  });

});