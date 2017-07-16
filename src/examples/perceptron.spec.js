//@flow
import seed from "seed-random";
import "rxjs/add/operator/first";
import "rxjs/add/operator/toPromise";
import ndarray from "ndarray";
import { layers, lossFunctions, Model, optimizers } from "../";

beforeEach(() => {
  seed('florida', { global: true });
});

it("simple sum perceptron", async () => {
  const layer = new layers.Dense(1);
  const model = new Model([1, 2])
    .pipe(layer);

  const predictor = model
    .compile();

  const optimizer = model
    .optimize(new lossFunctions.MSE(), new optimizers.SGD(0.1))
    .compile();

  await optimizer
    .process({
      x: ndarray(new Float32Array([1, 2]), [1, 2]),
      y: ndarray(new Float32Array([3]), [1, 1]),
    });

  await optimizer
    .process({
      x: ndarray(new Float32Array([5, 10]), [1, 2]),
      y: ndarray(new Float32Array([15]), [1, 1]),
    });

  await optimizer
    .process({
      x: ndarray(new Float32Array([-1, -2]), [1, 2]),
      y: ndarray(new Float32Array([-3]), [1, 1]),
    });

  const prediction = await predictor
    .process(ndarray(new Float32Array([2, 4]), [1, 2]));
  expect(await prediction).toEqual(ndarray(new Float32Array([6]), [1, 1]));
});