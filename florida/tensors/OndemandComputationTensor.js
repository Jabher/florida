//@flow

import type {Shape} from './types';
import {Tensor} from './Tensor';
import type {ITensor} from './types';

type Computation = () => void;
type ComputationFactory = (tensor: ITensor) => Computation;

export class OndemandComputationTensor extends Tensor {
    constructor(shape: Shape, dependencies: ITensor[], computation: ComputationFactory) {
        super(shape);
        this.dependencies = dependencies;

        this.onPass = [
            computation(this)
        ];
    }
}