//@flow
import {Tensor} from '../Tensor';
import {get} from '../memory';
import {copy, axpy, scal} from 'ndarray-blas-level1';
import {OndemandComputationTensor} from './utility/tensor';

export const rmse = (x: Tensor, y: Tensor) => {
    if (x.shape.length === 2 && y.shape.length === 2) {
        //$FlowFixMe
        const resultShape = [x.shape[0], y.shape[1]];
        return new OndemandComputationTensor(resultShape, [x, y], (result: Tensor) => function rmse(){
            copy(get(y), get(result));
            axpy(-1, get(x), get(result));
        });
    }
    throw new Error();
};
