//@flow
import {Tensor} from '../Tensor';
import {get} from '../memory';
import gemm from 'ndarray-gemm';
import {OndemandComputationTensor} from './utility/tensor';

export const multiply = (x: Tensor, y: Tensor) => {
    if (x.shape.length === 2 && y.shape.length === 2) {
        //$FlowFixMe
        const resultShape = [x.shape[0], y.shape[1]];
        return new OndemandComputationTensor(resultShape, [x, y], (result: Tensor) => function multiply(){
            gemm(get(result), get(x), get(y));
        });
    }
    throw new Error();
};
