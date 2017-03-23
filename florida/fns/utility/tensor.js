//@flow

import type {Shape} from '../../Tensor';
import {Tensor} from '../../Tensor';

import zeros from 'zeros';

type Computation = () => void;
type ComputationFactory = (tensor: Tensor) => Computation;

export class OndemandComputationTensor extends Tensor {
    computation: Computation;
    dependencies: Tensor[];

    constructor(shape: Shape, dependencies: Tensor[], computation: ComputationFactory) {
        super(shape);
        this.dependencies = dependencies;
        this.computation = computation(this);
    }

    bootstrap(init: any) {
        return zeros(this.shape, 'float32');
    }
}