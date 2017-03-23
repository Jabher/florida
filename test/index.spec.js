//@flow
import {expect} from 'chai';
import {Placeholder, Value} from '../florida/Tensor';
import {run, optimize} from '../florida/operations';
import {get} from '../florida/memory';
import * as fn from '../florida/fns';
import * as optimizers from '../florida/optimizers';

describe('Florida computation engine', () => {
    describe('no-action', () => {
        it('should perform run pass', () => {
            const x = new Placeholder([1,1]);
            const [result] = run({
                returns: [x],
                accepts: [x],
                values: [[1]]
            });

            expect(result.data[0]).to.equal(1);
        });
    });

    describe('linear transformation', () => {
        it('should perform run pass', () => {
            const x = new Placeholder([1,1]);
            const y = fn.multiply(x, new Value([1,1], 2));
            const [result] = run({
                returns: [y],
                accepts: [x],
                values: [[1]]
            });

            expect(result.data[0]).to.equal(2);
        });

        it.only('should perform optimization pass', () => {
            const x = new Placeholder([1,1]);
            const y = new Placeholder([1,1]);

            const weights = new Value([1,1], 2);
            const output = fn.multiply(x, weights);

            const cost = fn.cost.rmse(output, y);
            const delta = fn.multiply(x, cost);

            optimize({
                optimizers: [
                    optimizers.sgd(weights, [delta], {learningRate: .1})
                ],
                accepts: [x, y],
                values: [[
                    [1], [1]
                ]],
                epochs: 300000,
                verbose: false
            });

            expect(get(weights).data[0]).to.equal(1);
        });
    })
});