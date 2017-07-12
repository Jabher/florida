//@flow
import { Subject } from "rxjs/Subject"
import ndarray from 'ndarray';


export type Shape = number[];

export interface ICompilable<I, O> {
  compile<SI: any>(input: Subject<SI, I>): Subject<SI, O>;
}

export type ILossInput = { y: ndarray, x: ndarray };

export type ILossOutput = { y: ndarray, yPred: ndarray };

export type ILossHandler = (input: ILossOutput) => ndarray;

export type IHandler = (input: ndarray) => ndarray;

export type ILossCompilation = { d0: ILossHandler, d1: ILossHandler };

export interface IOptimizer {
  compile(shape: Shape): (gradient: ndarray) => void
}