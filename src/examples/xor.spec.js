//@flow
import "rxjs/add/observable/from";
import "rxjs/add/operator/reduce";
import "rxjs/add/operator/publishBehavior";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/observable/range";
import {Subject} from "rxjs/Subject";
import { layers, loss, Model, optimizer } from "../index";
import Observable from 'rxjs/observable';
import R from 'ramda';
import ndarray from 'ndarray';


test('it should train to solve XOR', () => {
  const model = new Model([1, 2])
    .pipe(new layers.DenseLayer(5))
    .pipe(new layers.activation.Sigmoid())
    .pipe(new layers.DenseLayer(2))
    .pipe(new layers.activation.Sigmoid());

  const learningModel = model
    .loss(new loss.MSE())
    .optimize(new optimizer.SGD(0.1))
    .compile();

  const weightenedError = learningModel
    .reduce((acc, val) => [...acc, val].slice(-3), [])
    .filter(acc => acc.length >= 4)
    .map(R.mean)
    .publishBehavior(Infinity);

  const dataset = [
    { x: ndarray(new Float32Array([0, 0]), [1, 2]), y: ndarray(new Float32Array([0]), [1, 1]) },
    { x: ndarray(new Float32Array([1, 0]), [1, 2]), y: ndarray(new Float32Array([1]), [1, 1]) },
    { x: ndarray(new Float32Array([0, 1]), [1, 2]), y: ndarray(new Float32Array([1]), [1, 1]) },
    { x: ndarray(new Float32Array([1, 1]), [1, 2]), y: ndarray(new Float32Array([0]), [1, 1]) },
  ];

  const epoch = Observable
    .range(1)
    .share();

  const infiniteEmitter = epoch
    .flatMap(() => Observable.from(dataset));

  const trainDataEmitter = infiniteEmitter
    .withLatestFrom(weightenedError, (record, error) => ({record, error}))
    .takeWhile(({error}) => error > .5);

  trainDataEmitter
    .subscribe(learningModel);

  const arrayToMatrix = (input: number[]) => ndarray(new Float32Array(input), [1, 2]);

  const userModel = model
    .pipe(new layers.activation.Hardmax())
    .compile(new Subject().map(arrayToMatrix))
    .map((result: ndarray) => result.get(0, 0))
    .publishBehavior();

  userModel.next(ndarray(new Float32Array([0, 0])));
  expect(userModel.getValue()).toEqual(0);
  userModel.next(ndarray(new Float32Array([1, 0])));
  expect(userModel.getValue()).toEqual(1);
  userModel.next(ndarray(new Float32Array([0, 1])));
  expect(userModel.getValue()).toEqual(1);
  userModel.next(ndarray(new Float32Array([0, 0])));
  expect(userModel.getValue()).toEqual(0);
});