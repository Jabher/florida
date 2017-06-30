// @flow
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/first";
import { Model } from "./Model";

test('model have shape', () => {
  const model = new Model([1, 2]);
  expect(model).toHaveProperty('outputShape', [1, 2]);
});
