//@flow
import chai, {expect} from 'chai';
import {Placeholder, Value, MemoryCell} from '../florida/tensors';
import {optimize, run} from '../florida/operations';
import {get} from '../florida/memory';
import * as fn from '../florida/fns';
import * as optimizers from '../florida/optimizers';
import chaiStats from 'chai-stats';
chai.use(chaiStats);

describe('Florida computation engine', () => {
    describe('no-action', () => {
        it('should perform run pass', () => {
            const x = new Placeholder([1, 1]);
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
            const x = new Placeholder([1, 1]);
            const y = fn.multiply(x, new Value([1, 1], 2));
            const [result] = run({
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
            const output = fn.multiply(x, weights);

            const cost = fn.cost.rmse(output, y);
            const delta = fn.multiply(x, cost);
            optimize({
                mutations: [
                    optimizers.sgd(weights, [delta], {learningRate: .5})
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
                const cell = new MemoryCell(x, 0);
                const y = fn.multiply(cell, new Value([1,1], 1));

                {//first iteration; res = 0(init) * 1(input)
                    const [result] = run({returns: [y], accepts: [x], values: [[1]]});
                    expect(result.data[0]).to.equal(0);
                }

                {//second iteration; res = 1(prev input) * 1(input)
                    const [result] = run({returns: [y], accepts: [x], values: [[1]]});
                    expect(result.data[0]).to.equal(1);
                }

                {//second iteration; res = 1(prev input) * 10(input)
                    const [result] = run({returns: [y], accepts: [x], values: [[10]]});
                    expect(result.data[0]).to.equal(1);
                }

                {//second iteration; res = 10(prev input) * 2(input)
                    const [result] = run({returns: [y], accepts: [x], values: [[2]]});
                    expect(result.data[0]).to.equal(10);
                }

            })
        })
    })
});