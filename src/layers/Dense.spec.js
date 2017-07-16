//@flow
import { Model } from "../";
import { Dense } from "./Dense";
import { ops, zeros } from "../ndarrayFunctions";

// internal functionality tests are missing; just very rough validations
// math is checked

describe("it should reshape properly", () => {
  it('should reshape on 2d', () => {
    const layer = new Dense(3);
    new Model([1, 2]).pipe(layer).compile();

    expect(layer.outputShape).toEqual([1, 3]);
  });
  it('should throw error on 1d', () => {
    expect(() => new Model([1]).pipe(new Dense(3)).compile()).toThrow();
  });
  it('should throw error on 3d', () => {
    expect(() => new Model([1, 2, 3]).pipe(new Dense(3)).compile()).toThrow();
  });

  it('should produce proper output back and forth', () => {
    const layer = new Dense(3);
    new Model([1, 2]).pipe(layer).compile();

    const input = zeros([1, 2]);
    ops.random(input);
    const output = layer.compilation.permuteInput(input);
    expect(output.shape).toEqual([1, 3]);

    const gradient = layer.compilation.permuteGradient(output);
    expect(gradient.shape).toEqual([1, 2]);
  });

  // const subject = model.compile()
});
