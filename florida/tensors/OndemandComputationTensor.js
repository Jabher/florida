//@flow

import type {Shape} from './types';
import {Tensor} from './Tensor';

import zeros from 'zeros';

type Computation = () => void;
type ComputationFactory = (tensor: Tensor) => Computation;

export class OndemandComputationTensor extends Tensor {
    computationName: string;

    constructor(shape: Shape, dependencies: Tensor[], computation: ComputationFactory) {
        super(shape);
        this.dependencies = dependencies;

        this.onPass = [
            computation(this)
        ];
    }

    bootstrap(init: any) {
        return zeros(this.shape, 'float32');
    }
}