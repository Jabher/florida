//@flow
import { Optimizer } from "./Optimizer";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/first";
import { Model } from "./Model";
import { Layer } from "./Layer";
import ndarray from "ndarray";
import { axpy, cpsc } from "ndarray-blas-level1";
import { LossFunction } from "./LossFunction";
import { zeros } from "../ndarrayFunctions/util";
import { dotProduct } from "../ndarrayFunctions/dotProduct";


test('optimizer function forces user to override compile method', () => {
  expect(() => new Optimizer().compile([])).toThrow();
});

class BaseTestLayer extends Layer {
  // compileShape() {
  //   return this.inputShape
  // }

  compile() {
    return {
      permuteInput: (data: ndarray) => data,
      permuteGradient: (gradient: ndarray) => gradient,
      compileApplyOptimizer: (optimizer: Optimizer) => (gradient: ndarray) => {},
    }
  }
}

class MSE extends LossFunction {
  compile(shape: number[]) {
    const error0 = zeros(shape);
    const error1 = zeros(shape);
    return {
      d0: ({ y, yPred }: { y: ndarray, yPred: ndarray }) => {
        //noinspection JSSuspiciousNameCombination
        cpsc(-1, yPred, error0);
        //noinspection JSSuspiciousNameCombination
        axpy(1, y, error0);
        const result = dotProduct(error0, error0);
        return result;
      },
      d1: ({ y, yPred }: { y: ndarray, yPred: ndarray }) => {
        //noinspection JSSuspiciousNameCombination
        cpsc(2, yPred, error1);
        //noinspection JSSuspiciousNameCombination
        axpy(-2, y, error1);
        return error1;
      },
    }
  }
}

class SGD extends Optimizer {
  compile(shape: number[]) {
    return (gradient: ndarray) => {

    }
  }
}

test('model is calling gradient optimizer', async () => {
  const optimizerFn = jest.fn();
  const compileOptimizerFn = jest.fn((optimizer: Optimizer) => optimizerFn);

  class AddLayer extends BaseTestLayer {
    compile() {
      return {
        permuteInput: (data: ndarray) => data,
        permuteGradient: (gradient: ndarray) => gradient,
        compileApplyOptimizer: compileOptimizerFn,
      }
    }
  }

  const addLayer = new AddLayer();

  const optimizer = new SGD();
  const train = new Model([2])
    .pipe(addLayer)
    .optimize(new MSE(), optimizer)
    .compile();


  expect(optimizerFn).toHaveBeenCalledTimes(0);
  expect(compileOptimizerFn).toHaveBeenCalledTimes(1);

  const data = {
    x: ndarray(new Float32Array([-3, -5]), [2]),
    y: ndarray(new Float32Array([-1, -2]), [2]),
  };

  const promise = train.first().toPromise();
  train.next(data);

  await promise;

  expect(optimizerFn).toHaveBeenCalledTimes(1);
  expect(optimizerFn.mock.calls[0][0].data).toEqual(new Float32Array([
    2 * (data.x.get(0) - data.y.get(0)),
    2 * (data.x.get(1) - data.y.get(1)),
  ]));
  expect(compileOptimizerFn).toHaveBeenCalledTimes(1);
  expect(compileOptimizerFn.mock.calls[0][0]).toBe(optimizer);
});

test('model is not re-compiling optimizations', async () => {
  const optimizerFn = jest.fn();
  const compileOptimizerFn = jest.fn((optimizer: Optimizer) => optimizerFn);

  class AddLayer extends BaseTestLayer {
    compile() {
      return {
        permuteInput: (data: ndarray) => data,
        permuteGradient: (gradient: ndarray) => gradient,
        compileApplyOptimizer: compileOptimizerFn,
      }
    }
  }

  const addLayer = new AddLayer();

  const optimizer = new SGD();
  const train = new Model([2])
    .pipe(addLayer)
    .optimize(new MSE(), optimizer)
    .compile();


  expect(optimizerFn).toHaveBeenCalledTimes(0);
  expect(compileOptimizerFn).toHaveBeenCalledTimes(1);

  const data = {
    x: ndarray(new Float32Array([-3, -5]), [2]),
    y: ndarray(new Float32Array([-1, -2]), [2]),
  };

  train.next(data);
  const promise = train.first().toPromise();
  train.next(data);

  await promise; //already validated on prev step

  expect(compileOptimizerFn).toHaveBeenCalledTimes(1);
  expect(optimizerFn).toHaveBeenCalledTimes(2);
  expect(optimizerFn.mock.calls[0][0].data).toEqual(new Float32Array([
    2 * (data.x.get(0) - data.y.get(0)),
    2 * (data.x.get(1) - data.y.get(1)),
  ]));
});

test('model is propagating gradient', async () => {
  const scaler = 3;

  class AddLayer extends BaseTestLayer {
    optimizerFn = jest.fn();

    compile() {
      const outputGradient = zeros(this.inputShape);
      return {
        permuteInput: (data: ndarray) => data,
        permuteGradient: (gradient: ndarray) => {
          cpsc(scaler, gradient, outputGradient);
          return outputGradient;
        },
        compileApplyOptimizer: (optimizer: Optimizer) => this.optimizerFn,
      }
    }
  }

  const addLayer1 = new AddLayer();
  const addLayer2 = new AddLayer();

  const optimizer = new SGD();
  const train = new Model([2])
    .pipe(addLayer1)
    .pipe(addLayer2)
    .optimize(new MSE(), optimizer)
    .compile();


  expect(addLayer1.optimizerFn).toHaveBeenCalledTimes(0);
  expect(addLayer2.optimizerFn).toHaveBeenCalledTimes(0);

  const promise = train.first().toPromise();

  const data = {
    x: ndarray(new Float32Array([-3, -5]), [2]),
    y: ndarray(new Float32Array([-1, -2]), [2]),
  };

  train.next(data);

  await promise; //already validated on prev step

  expect(addLayer1.optimizerFn).toHaveBeenCalledTimes(1);
  expect(addLayer2.optimizerFn).toHaveBeenCalledTimes(1);


  expect(addLayer1.optimizerFn.mock.calls[0][0].data).toEqual(new Float32Array([
    scaler * 2 * (data.x.get(0) - data.y.get(0)),
    scaler * 2 * (data.x.get(1) - data.y.get(1)),
  ]));

  expect(addLayer2.optimizerFn.mock.calls[0][0].data).toEqual(new Float32Array([
    2 * (data.x.get(0) - data.y.get(0)),
    2 * (data.x.get(1) - data.y.get(1)),
  ]));
});
