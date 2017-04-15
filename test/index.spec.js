//@flow
import chai, {expect} from 'chai';
import {get} from '../florida/compute/_memory';
import {Placeholder, Value, MemoryCell, operations, compute, optimizers} from '../florida';
import chaiStats from 'chai-stats';
chai.use(chaiStats);

describe('Florida computation engine', () => {
    describe('no-action', () => {
        it('should perform run pass', () => {
            const x = new Placeholder([1, 1]);
            const [result] = operations.run({
                returns: [x],
                accepts: [x],
                values: [[1]]
            });

            expect(result.data[0]).to.equal(1);
        });
    });

    describe('linear transformation', () => {
        it('should perform run pass', () => {
            const x = new Placeholder([1, 1]);
            const y = compute.multiply(x, new Value([1, 1], 2));
            const [result] = operations.run({
                returns: [y],
                accepts: [x],
                values: [[1]]
            });

            expect(result.data[0]).to.equal(2);
        });

        it('should perform optimization pass', () => {
            const x = new Placeholder([1, 1]);
            const y = new Placeholder([1, 1]);

            const weights = new Value([1, 1], 2);
            const output = compute.multiply(x, weights);

            const cost = compute.cost.mse(output, y);
            const delta = compute.multiply(x, cost);
            operations.optimize({
                optimizers: [
                    optimizers.sgd(weights, delta, {learningRate: .5})
                ],
                accepts: [x, y],
                values: [[
                    [1], [1]
                ]],
                epochs: 10000,
                verbose: false
            });

            expect(get(weights).data[0]).to.almost.equal(1);
        });

        describe('rnn units', () => {
            it('should work in runner', () => {
                const x = new Placeholder([1, 1]);
                const cell = new MemoryCell(x);
                const y = compute.multiply(cell, new Value([1,1], 1));

                {//first iteration; res = 0(init) * 1(input)
                    const [result] = operations.run({returns: [y], accepts: [x], values: [[1]]});
                    expect(result.data[0]).to.equal(0);
                }

                {//second iteration; res = 1(prev input) * 1(input)
                    const [result] = operations.run({returns: [y], accepts: [x], values: [[1]]});
                    expect(result.data[0]).to.equal(1);
                }

                {//second iteration; res = 1(prev input) * 10(input)
                    const [result] = operations.run({returns: [y], accepts: [x], values: [[10]]});
                    expect(result.data[0]).to.equal(1);
                }

                {//second iteration; res = 10(prev input) * 2(input)
                    const [result] = operations.run({returns: [y], accepts: [x], values: [[2]]});
                    expect(result.data[0]).to.equal(10);
                }

            })
        })
    })
});