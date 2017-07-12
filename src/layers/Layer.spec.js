// @flow
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/first";
import { Model, PipedModel } from "../model/Model";
import { Layer } from "./Layer";
import ndarray from "ndarray";
import { cpsc } from "ndarray-blas-level1";
import { zeros } from "../ndarrayFunctions/util";
import type { IOptimizer } from "../types";

class BaseTestLayer extends Layer {
  compile() {
    return {
      permuteInput: (data: ndarray) => data,
      permuteGradient: (gradient: ndarray) => gradient,
      compileApplyOptimizer: (optimizer: IOptimizer) => (gradient: ndarray) => {}
    }
  }
}

test('layer is acting like abstract class', () => {
  expect(() => new Layer()).toThrow()
});

test('layer do not allow to compile non-overridden method', () => {
  class A extends Layer {}

  expect(() => new A().compile()).toThrow()
});

test('model is passing layers', () => {
  const outputLayer = new BaseTestLayer();
  expect(outputLayer).toHaveProperty('outputShape', undefined);
  const model = new Model([1, 2])
    .pipe(outputLayer);
  expect(model).toBeInstanceOf(PipedModel);
  expect(model).toHaveProperty('outputShape', [1, 2]);
  expect(outputLayer).toHaveProperty('outputShape', [1, 2]);
});

test('model is initializing layers', () => {
  class TestLayer extends BaseTestLayer {
    compile = jest.fn(BaseTestLayer.prototype.compile);
  }

  const layer = new TestLayer();

  expect(layer.compile).toHaveBeenCalledTimes(0);
  new Model([1, 2]).pipe(layer);
  expect(layer.compile).toHaveBeenCalledTimes(1);
});

test('model is utilizing initialized layers', () => {
  class TestLayer extends BaseTestLayer {
    compile = jest.fn(BaseTestLayer.prototype.compile);
  }

  const layer = new TestLayer();

  new Model([1, 2]).pipe(layer);
  new Model([1, 2]).pipe(layer);
  expect(layer.compile).toHaveBeenCalledTimes(1);
});

test('model is initializing layers', () => {
  class TestLayer extends BaseTestLayer {
    compile = jest.fn(BaseTestLayer.prototype.compile);
  }

  const layer = new TestLayer();

  new Model([1, 2]).pipe(layer);
  expect(() => new Model([2, 4]).pipe(layer)).toThrow();
});

test('model is transforming layers', () => {
  class TestLayer extends BaseTestLayer {
    compileShape() {
      return [...this.inputShape.map(x => x * 2), 8]
    }
  }

  const output = new TestLayer();

  expect(new Model([1, 2]).pipe(output))
    .toHaveProperty('outputShape', [2, 4, 8]);
});

test('model is passing data', async () => {
  const model = new Model([1, 2])
    .pipe(new BaseTestLayer())
    .compile();

  const promise = model.first().toPromise();
  model.next(ndarray(new Float32Array([-1, -2]), [1, 2]));
  const result = await promise;

  expect(result).toMatchSnapshot();
});

test('model is calling compileActivate once', async () => {
  const model = new Model([1, 2])
    .pipe(new BaseTestLayer())
    .compile();

  const promise = model.first().toPromise();
  model.next(ndarray(new Float32Array([-1, -2]), [1, 2]));
  const result = await promise;

  expect(result).toMatchSnapshot();
});

test('model is emitting data to side-observables', async () => {
  const model = new Model([1, 2])
    .pipe(new BaseTestLayer());

  const promise = model.output.first().toPromise();
  model.compile()
    .next(ndarray(new Float32Array([-1, -2]), [1, 2]));
  const result = await promise;

  expect(result).toMatchSnapshot();
});

test('model is transforming data', async () => {
  class TestLayer extends BaseTestLayer {
    i = 2;

    compile() {
      const output = zeros(this.outputShape);
      return {
        permuteInput: (data: ndarray) => {
          cpsc(this.i++, data, output);
          return output;
        },
        permuteGradient: (gradient: ndarray) => gradient,
        compileApplyOptimizer: (optimizer: IOptimizer) => (gradient: ndarray) => {}
      }
    }
  }

  const model = new Model([2])
    .pipe(new TestLayer())
    .compile();

  const promise = model.first().toPromise();
  model.next(ndarray(new Float32Array([-1, -2]), [2]));
  expect((await promise).data).toEqual(new Float32Array([-2, -4]));

  const promise2 = model.first().toPromise();
  model.next(ndarray(new Float32Array([-1, -2]), [2]));
  expect((await promise2).data).toEqual(new Float32Array([-3, -6]))
});