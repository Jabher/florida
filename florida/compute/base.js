//@flow
import * as fns from './fns/base';
import {OndemandComputationTensor} from '../tensors';
import type {ITensor} from '../tensors/types';

export const multiply = (x: ITensor, y: ITensor) => {
    if (x.shape.length === 2 && y.shape.length === 2) {
        //$FlowFixMe
        const resultShape = [x.shape[0], y.shape[1]];
        return new OndemandComputationTensor(resultShape, [x, y], (result: ITensor) => fns.multiply(result, x, y));
    }
    throw new Error();
};
