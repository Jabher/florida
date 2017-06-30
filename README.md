# Florida

A functional reactive neural network framework
---
**Florida** is a fully-featured neural net framework built upon 
[scijs](https://github.com/scijs), 
the most popular (according to npm) tensor algebra library,
and [ReactiveX](https://github.com/ReactiveX/rxjs), 
the cross-language standard of [Functional Reactive Programming](https://en.wikipedia.org/wiki/Functional_reactive_programming),
which implements Stage 1 [Observable EcmaScript proposal](https://github.com/tc39/proposal-observable)   

Getting started with neural nets
---
A neural network is a deep machine learning technique. 
What does it mean?

**Machine learning** is a subfield of computer science that gives computers the ability to learn without being explicitly programmed.
That means that instead of writing the program a set of examples or some scoring rule, which decide,
what is a better or worse result, is defined, and the computer is able to reduce its error with time.

Shallow machine learning techniques - such as linear regression - are directly transforming data into the answer.
Extrapolation is an example of linear regression.
![extrapolation](https://imgs.xkcd.com/comics/extrapolating.png)
_[image source](https://xkcd.com/605/)_

**Deep machine learning** is a subset of machine learning techniques which are producing some hidden state.
For example, neural network trained to detect cats is actually detecting line patterns in pixels, 
then detects specific shapes of lines, then detects cat shape, which consists of ear shapes, paw shapes and so on.   

### FRP + Neural Nets



#### State of machine learning in JavaScript
First of all: let's admit that **serious** machine learning is happening in
CUDA, GPU, ASICs, 
[TensorFlow](https://www.tensorflow.org/), 
[Theano](http://deeplearning.net/software/theano/), 
[MXNet](http://mxnet.io/). 
That's all Python, C++ and lot of optimizations.

We are unable to provide such performance in JS now - except bindings to C++ libraries.
Here we can split everything into 2 parts: Node.js and browsers.
Best thing we can do for Node.js is actually implement TensorFlow bindings; but for taking what we can from browser we're lacking 
- [WebGPU](https://webkit.org/wp-content/uploads/webgpu-api-proposal.html) - proposal
- [SIMD](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/SIMD) - proposal
- [SharedArrayBuffer](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) - already in ES2017; available under flag in browsers

Here we see that we actually _do not_ need crazy machine learning in JS itself; for something big we can rely on TF.
But we can do what we're missing in other frameworks - 
integration into UI, 
simple connection with various inputs - from mouse movements to video, from opened tabs count to network speed.

We can do crazy stuff in ServiceWorkers and in background tabs, and simplicity and flexibility is a bit more important here than performance 