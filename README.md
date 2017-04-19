# Florida
### Computation engine for building a neural nets

_current state: under development; performance not optimized_

As TensorFlow powers the "Big DS", Florida (it's also about data flow, so that's why it is named so) can power JS DS.

The core difference between common approach of solving DS problems and Florida's is that building the computational graph and executing it are separate functions.

If you have some function to run, you need to compile it once, and run it tens of times.
Simple math - for 100 runs 10 ms loss on compilation stage will be efficient even if every run will get faster for 0.1ms.

How to use it:
```javascript
import {Tensor, MemoryCell, operations, compute} from '../florida';

// First, you need to define your input.
// API is new Tensor(shape: Shape, init?: InitValue)
// Shape is array of numbers; [] means scalar, [number] means vector, [number, number] means matrix
// InitValue can be number, array of numbers or Float32Array now; random inits will be provided later
// You can omit init value, in that case init will bootstrap with zeros, if it's not placeholder
const x = new Tensor([1, 1]);
// Then - manipulate it in some way (you probably do not need to just pass it back and forth)
const y = compute.multiply(x, new Tensor([1, 1], 2));

// operation.run is actually a run(compile(graph))
const [result] = operations.run({
  returns: [y],
  accepts: [x],
  values: [[1]]
});

result.data // => Float32Array [2]
```

If you want to execute an optimization, API would be the following:
```javascript
const x = new Tensor([1, 1]);
const y = new Tensor([1, 1]);

const weights = new Tensor([1, 1], 2);
const output = compute.multiply(x, weights);

//cost.mse is just an ordinary function
const cost = compute.cost.mse(output, y);
const delta = compute.multiply(x, cost);
operations.optimize({
    optimizers: [
        // here we annotate a single-op SGD optimizer, which can be re-used later
        optimizers.sgd(weights, delta, {learningRate: .5})
    ],
    
// You can think about this model as a function that accepts X and Y, 
// and .optimize "values" field is a list of "arguments" for "accepts"
    accepts: [x, y],
    //here we define pairs of arguments to use
    values: [[
        new Float32Array([1]), new Float32Array([1])
    ]],
    epochs: 10000
});


weights //=> Float32Array [1.000000007]
```
