//@flow
import {get} from '../memory';
import {axpy, copy} from 'ndarray-blas-level1';
import {Tensor, OndemandComputationTensor} from '../tensors';

export const rmse = (x: Tensor, y: Tensor) => {
    if (x.shape.length === 2 && y.shape.length === 2) {
        //$FlowFixMe
        const resultShape = [x.shape[0], y.shape[1]];
        return new OndemandComputationTensor(resultShape, [x, y], (result: Tensor) => function rmse() {
            copy(get(y), get(result));
            axpy(-1, get(x), get(result));
        });
    }
    throw new Error();
};
