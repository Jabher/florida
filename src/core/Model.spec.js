// @flow
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/first";
import { Model, PipedModel } from "./Model";
import { Layer } from "./Layer";
import ndarray from "ndarray";
import { axpy, cpsc } from "ndarray-blas-level1";
import { LossFunction } from "./LossFunction";
import { zeros } from "../util";
import { dotProduct } from "../ndarrayFunctions/dotProduct";
import { Optimizer } from "./Optimizer";
import R from 'ramda';

test('model have shape', () => {
  const model = new Model([1, 2]);
  expect(model).toHaveProperty('outputShape', [1, 2]);
});
