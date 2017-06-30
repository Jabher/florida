// @flow
// FIXME(samgoldman) Remove top-level interface once Babel supports
// `declare interface` syntax.
// FIXME(samgoldman) Remove this once rxjs$Subject<O> can mixin rxjs$Observer<O>
declare class rxjs$Observer<-I> {
  next(value: I): mixed;
  error(error: any): mixed;
  complete(): mixed;
}

type rxjs$PartialObserver<-T> =
  | {
    +next: (value: T) => mixed;
    +error?: (error: any) => mixed;
    +complete?: () => mixed;
  }
  | {
    +next?: (value: T) => mixed;
    +error: (error: any) => mixed;
    +complete?: () => mixed;
  }
  | {
    +next?: (value: T) => mixed;
    +error?: (error: any) => mixed;
    +complete: () => mixed;
  }

interface rxjs$ISubscription {
  unsubscribe(): void;
}

type rxjs$TeardownLogic = rxjs$ISubscription | () => void;

type rxjs$EventListenerOptions = {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
} | boolean;

declare class rxjs$Observable<+T> {
  static bindCallback(callbackFunc: (callback: (_: void) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): () => rxjs$Observable<void>;
  static bindCallback<U>(callbackFunc: (callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): () => rxjs$Observable<U>;
  static bindCallback<T, U>(callbackFunc: (v1: T, callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T) => rxjs$Observable<U>;
  static bindCallback<T, T2, U>(callbackFunc: (v1: T, v2: T2, callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, U>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, T4, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, T4, T5, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, T4, T5, T6, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => rxjs$Observable<U>;
  static bindCallback<U>(callbackFunc: (callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): () => rxjs$Observable<U>;
  static bindCallback<T, U>(callbackFunc: (v1: T, callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): (v1: T) => rxjs$Observable<U>;
  static bindCallback<T, T2, U>(callbackFunc: (v1: T, v2: T2, callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, U>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, T4, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, T4, T5, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => rxjs$Observable<U>;
  static bindCallback<T, T2, T3, T4, T5, T6, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: Array<any>) => any) => any, selector: (...args: Array<any>) => U, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => rxjs$Observable<U>;
  static bindCallback<T>(callbackFunc: Function, selector: ?void, scheduler: ?rxjs$SchedulerClass): (...args: Array<any>) => rxjs$Observable<T>;
  static bindCallback<T>(callbackFunc: Function, selector: ?(...args: Array<any>) => T, scheduler: ?rxjs$SchedulerClass): (...args: Array<any>) => rxjs$Observable<T>;

  static bindNodeCallback<U>(callbackFunc: (callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): () => rxjs$Observable<U>;
  static bindNodeCallback<T, U>(callbackFunc: (v1: T, callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T) => rxjs$Observable<U>;
  static bindNodeCallback<T, T2, U>(callbackFunc: (v1: T, v2: T2, callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2) => rxjs$Observable<U>;
  static bindNodeCallback<T, T2, T3, U>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3) => rxjs$Observable<U>;
  static bindNodeCallback<T, T2, T3, T4, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4) => rxjs$Observable<U>;
  static bindNodeCallback<T, T2, T3, T4, T5, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => rxjs$Observable<U>;
  static bindNodeCallback<T, T2, T3, T4, T5, T6, U>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (err: any, result: U) => any) => any, selector: ?void, scheduler: ?rxjs$SchedulerClass): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => rxjs$Observable<U>;
  static bindNodeCallback<T>(callbackFunc: Function, selector: ?void, scheduler: ?rxjs$SchedulerClass): (...args: Array<any>) => rxjs$Observable<T>;
  static bindNodeCallback<T>(callbackFunc: Function, selector: ?(...args: Array<any>) => T, scheduler: ?rxjs$SchedulerClass): (...args: Array<any>) => rxjs$Observable<T>;

  static concat(...sources: rxjs$Observable<O>[]): rxjs$Observable<O>;

  static create(
    subscribe: (observer: rxjs$Observer<O>) => rxjs$ISubscription | Function | void
  ): rxjs$Observable<O>;

  static defer(observableFactory: () => rxjs$Observable<O> | Promise<O>): rxjs$Observable<O>;

  static from(iterable: Iterable<O>): rxjs$Observable<O>;

  static fromEvent(element: any, eventName: string, ...none: Array<void>): rxjs$Observable<O>;
  static fromEvent(
    element: any,
    eventName: string,
    options: rxjs$EventListenerOptions,
    ...none: Array<void>
  ): rxjs$Observable<O>;
  static fromEvent(
    element: any,
    eventName: string,
    selector: () => O,
    ...none: Array<void>
  ): rxjs$Observable<O>;
  static fromEvent(
    element: any,
    eventName: string,
    options: rxjs$EventListenerOptions,
    selector: () => O,
  ): rxjs$Observable<O>;

  static fromEventPattern(
    addHandler: (handler: (item: O) => void) => void,
    removeHandler: (handler: (item: O) => void) => void,
    selector: ?() => O,
  ): rxjs$Observable<O>;

  static fromPromise(promise: Promise<O>): rxjs$Observable<O>;

  static empty<U>(): rxjs$Observable<U>;

  static interval(period: number): rxjs$Observable<number>;

  static timer(initialDelay: (number | Date), period: ?number, scheduler: ?rxjs$SchedulerClass): rxjs$Observable<number>;

  static merge<T, U>(
    source0: rxjs$Observable<T>,
    source1: rxjs$Observable<U>,
  ): rxjs$Observable<T | U>;
  static merge<T, U, V>(
    source0: rxjs$Observable<T>,
    source1: rxjs$Observable<U>,
    source2: rxjs$Observable<V>,
  ): rxjs$Observable<T | U | V>;
  static merge(...sources: rxjs$Observable<O>[]): rxjs$Observable<O>;

  static never<U>(): rxjs$Observable<U>;

  static of(...values: O[]): rxjs$Observable<O>;

  static throw(error: any): rxjs$Observable<any>;

  audit(durationSelector: (value: O) => rxjs$Observable<any> | Promise<any>): rxjs$Observable<O>;

  race(other: rxjs$Observable<O>): rxjs$Observable<O>;

  repeat(): rxjs$Observable<O>;

  buffer(bufferBoundaries: rxjs$Observable<any>): rxjs$Observable<Array<O>>;

  catch<U>(selector: (err: any, caught: rxjs$Observable<O>) => rxjs$Observable<U>): rxjs$Observable<U>;

  concat<U>(...sources: rxjs$Observable<U>[]): rxjs$Observable<O | U>;

  concatAll<U>(): rxjs$Observable<U>;

  concatMap<U>(
    f: (value: O) => rxjs$Observable<U> | Promise<U> | Iterable<U>
  ): rxjs$Observable<U>;

  debounceTime(dueTime: number, scheduler: ?rxjs$SchedulerClass): rxjs$Observable<O>;

  delay(dueTime: number, scheduler: ?rxjs$SchedulerClass): rxjs$Observable<O>;

  distinctUntilChanged(compare: ?(x: O, y: O) => boolean): rxjs$Observable<O>;

  distinct<U>(keySelector: ?(value: O) => U, flushes: ?rxjs$Observable<mixed>): rxjs$Observable<O>;

  distinctUntilKeyChanged(key: string, compare: ?(x: mixed, y: mixed) => boolean): rxjs$Observable<O>;

  elementAt(index: number, defaultValue: ?O): rxjs$Observable<O>;

  filter(predicate: (value: O, index: number) => boolean, thisArg: ?any): rxjs$Observable<O>;

  finally(f: () => mixed): rxjs$Observable<O>;

  first(
    predicate: ?(value: O, index: number, source: rxjs$Observable<O>) => boolean,
  ): rxjs$Observable<O>;
  first<U>(
    predicate: ?(value: O, index: number, source: rxjs$Observable<O>) => boolean,
    resultSelector: (value: O, index: number) => U,
  ): rxjs$Observable<U>;
  first<U>(
    predicate: ?(value: O, index: number, source: rxjs$Observable<O>) => boolean,
    resultSelector: ?(value: O, index: number) => U,
    defaultValue: U,
  ): rxjs$Observable<U>;

  groupBy(
    keySelector: (value: O) => mixed,
    elementSelector: ?(value: O) => O,
    compare: ?(x: O, y: O) => boolean,
  ): rxjs$Observable<rxjs$Observable<O>>;

  ignoreElements<U>(): rxjs$Observable<U>;

  let<U>(project: (self: rxjs$Observable<O>) => rxjs$Observable<U>): rxjs$Observable<U>;

  // Alias for `let`
  letBind<U>(project: (self: rxjs$Observable<O>) => rxjs$Observable<U>): rxjs$Observable<U>;

  switch(): O; // assumption: O is Observable

  // Alias for `mergeMap`
  flatMap<U>(
    project: (value: O) => rxjs$Observable<U> | Promise<U> | Iterable<U>,
    index: ?number,
  ): rxjs$Observable<U>;

  flatMapTo<U>(
    innerObservable: rxjs$Observable<U>
  ): rxjs$Observable<U>;

  flatMapTo<U, V>(
    innerObservable: rxjs$Observable < U >,
    resultSelector: (outerValue: O, innerValue: U, outerIndex: number, innerIndex: number) => V,
    concurrent : ?number
  ): rxjs$Observable<V>;

  switchMap<U>(
    project: (value: O) => rxjs$Observable<U> | Promise<U> | Iterable<U>,
    index: ?number,
  ): rxjs$Observable<U>;

  switchMapTo<U>(
    innerObservable: rxjs$Observable<U>,
  ): rxjs$Observable<U>;

  map<U>(f: (value: O) => U): rxjs$Observable<U>;

  mapTo<U>(value: U): rxjs$Observable<U>;

  merge(other: rxjs$Observable<O>): rxjs$Observable<O>;

  mergeAll<U>(): rxjs$Observable<U>;

  mergeMap<U>(
    project: (value: O, index: ?number) => rxjs$Observable<U> | Promise<U> | Iterable<U>,
    index: ?number,
  ): rxjs$Observable<U>;

  mergeMapTo<U>(
    innerObservable: rxjs$Observable<U>
  ): rxjs$Observable<U>;

  mergeMapTo<U, V>(
    innerObservable: rxjs$Observable < U >,
    resultSelector: (outerValue: O, innerValue: U, outerIndex: number, innerIndex: number) => V,
    concurrent : ?number
  ): rxjs$Observable<V>;

  multicast(
    subjectOrSubjectFactory: rxjs$Subject<O> | () => rxjs$Subject<O>,
  ): rxjs$ConnectableObservable<O>;

  observeOn(scheduler: rxjs$SchedulerClass): rxjs$Observable<O>;

  pairwise(): rxjs$Observable<[O, O]>;

  publish(): rxjs$ConnectableObservable<O>;

  publishBehavior(): rxjs$BehaviorSubject<O>;

  publishLast(): rxjs$ConnectableObservable<O>;

  reduce<U>(
    accumulator: (
      acc: U,
      currentValue: O,
      index: number,
      source: rxjs$Observable<O>,
    ) => U,
    seed: U,
  ): rxjs$Observable<U>;

  sample(notifier: rxjs$Observable<any>): rxjs$Observable<O>;

  sampleTime(delay: number, scheduler: ?rxjs$SchedulerClass): rxjs$Observable<O>;

  publishReplay(bufferSize: ?number, windowTime: ?number, scheduler: ?rxjs$SchedulerClass): rxjs$ConnectableObservable<O>;

  retry(retryCount: ?number): rxjs$Observable<O>;

  retryWhen(notifier: (errors: rxjs$Observable<Error>) => rxjs$Observable<any>): rxjs$Observable<O>;

  scan<U>(
    f: (acc: U, value: O) => U,
    initialValue: U,
  ): rxjs$Observable<U>;

  share(): rxjs$Observable<O>;

  skip(count: number): rxjs$Observable<O>;

  skipUntil(other: rxjs$Observable<any> | Promise<any>): rxjs$Observable<O>;

  skipWhile(predicate: (value: O, index: number) => boolean): rxjs$Observable<O>;

  startWith(...values: Array<O>): rxjs$Observable<O>;

  subscribeOn(scheduler: rxjs$SchedulerClass): rxjs$Observable<O>;

  take(count: number): rxjs$Observable<O>;

  takeUntil(other: rxjs$Observable<any>): rxjs$Observable<O>;

  takeWhile(predicate: (value: O, index: number) => boolean): rxjs$Observable<O>;

  do(
    onNext: ?(value: O) => mixed,
    onError: ?(error: any) => mixed,
    onCompleted: ?() => mixed,
  ): rxjs$Observable<O>;
  do(observer: {
    next: ?(value: O) => mixed;
    error: ?(error: any) => mixed;
    complete: ?() => mixed;
  }): rxjs$Observable<O>;

  throttleTime(duration: number): rxjs$Observable<O>;

  timeout(due: number | Date, _: void): rxjs$Observable<O>;

  toArray(): rxjs$Observable<O[]>;

  toPromise(): Promise<O>;

  subscribe(observer: rxjs$PartialObserver<O>): rxjs$Subscription;
  subscribe(
    onNext: ?(value: O) => mixed,
    onError: ?(error: any) => mixed,
    onCompleted: ?() => mixed,
  ): rxjs$Subscription;

  static combineLatest<A, B>(
    a: rxjs$Observable<A>,
    resultSelector: (a: A) => B,
  ): rxjs$Observable<B>;

  static combineLatest<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    resultSelector: (a: A, b: B) => C,
  ): rxjs$Observable<C>;

  static combineLatest<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    resultSelector: (a: A, b: B, c: C) => D,
  ): rxjs$Observable<D>;

  static combineLatest<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    resultSelector: (a: A, b: B, c: C, d: D) => E,
  ): rxjs$Observable<E>;

  static combineLatest<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E) => F,
  ): rxjs$Observable<F>;

  static combineLatest<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
  ): rxjs$Observable<G>;

  static combineLatest<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
  ): rxjs$Observable<H>;

  static combineLatest<A, B>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    _: void,
  ): rxjs$Observable<[A, B]>;

  static combineLatest<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    _: void,
  ): rxjs$Observable<[A, B, C]>;

  static combineLatest<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    _: void,
  ): rxjs$Observable<[A, B, C, D]>;

  static combineLatest<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E]>;

  static combineLatest<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E, F]>;

  static combineLatest<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E, F, G]>;

  static combineLatest<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H]>;

  combineLatest<A>(
    a: rxjs$Observable<A>,
    _: void,
  ): rxjs$Observable<[O, A]>;

  combineLatest<A, B>(
    a: rxjs$Observable<A>,
    resultSelector: (a: A) => B,
  ): rxjs$Observable<B>;

  combineLatest<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    resultSelector: (a: A, b: B) => C,
  ): rxjs$Observable<C>;

  combineLatest<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    resultSelector: (a: A, b: B, c: C) => D,
  ): rxjs$Observable<D>;

  combineLatest<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    resultSelector: (a: A, b: B, c: C, d: D) => E,
  ): rxjs$Observable<E>;

  combineLatest<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E) => F,
  ): rxjs$Observable<F>;

  combineLatest<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
  ): rxjs$Observable<G>;

  combineLatest<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
  ): rxjs$Observable<H>;

  static forkJoin<A, B>(
    a: rxjs$Observable<A>,
    resultSelector: (a: A) => B,
  ): rxjs$Observable<B>;

  static forkJoin<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    resultSelector: (a: A, b: B) => C,
  ): rxjs$Observable<C>;

  static forkJoin<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    resultSelector: (a: A, b: B, c: C) => D,
  ): rxjs$Observable<D>;

  static forkJoin<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    resultSelector: (a: A, b: B, c: C, d: D) => E,
  ): rxjs$Observable<E>;

  static forkJoin<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E) => F,
  ): rxjs$Observable<F>;

  static forkJoin<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
  ): rxjs$Observable<G>;

  static forkJoin<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
  ): rxjs$Observable<H>;

  static forkJoin<A, B>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    _: void,
  ): rxjs$Observable<[A, B]>;

  static forkJoin<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    _: void,
  ): rxjs$Observable<[A, B, C]>;

  static forkJoin<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    _: void,
  ): rxjs$Observable<[A, B, C, D]>;

  static forkJoin<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E]>;

  static forkJoin<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E, F]>;

  static forkJoin<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E, F, G]>;

  static forkJoin<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    h: rxjs$Observable<H>,
    _: void,
  ): rxjs$Observable<[A, B, C, D, E, F, G, H]>;

  withLatestFrom<A>(
    a: rxjs$Observable<A>,
    _: void,
  ): rxjs$Observable<[O, A]>;

  withLatestFrom<A, B>(
    a: rxjs$Observable<A>,
    resultSelector: (a: A) => B,
  ): rxjs$Observable<B>;

  withLatestFrom<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    resultSelector: (a: A, b: B) => C,
  ): rxjs$Observable<C>;

  withLatestFrom<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    resultSelector: (a: A, b: B, c: C) => D,
  ): rxjs$Observable<D>;

  withLatestFrom<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    resultSelector: (a: A, b: B, c: C, d: D) => E,
  ): rxjs$Observable<E>;

  withLatestFrom<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E) => F,
  ): rxjs$Observable<F>;

  withLatestFrom<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
  ): rxjs$Observable<G>;

  withLatestFrom<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
  ): rxjs$Observable<H>;

  static using<R: rxjs$ISubscription>(
    resourceFactory: () => ?R,
    observableFactory: (resource: R) => rxjs$Observable<O> | Promise<O> | void,
  ): rxjs$Observable<O>;
}

declare class rxjs$ConnectableObservable<O> extends rxjs$Observable<O> {
  connect(): rxjs$Subscription;
  refCount(): rxjs$Observable<O>;
}

declare class rxjs$Observer<T> {
  next(value: O): mixed;

  error(error: any): mixed;

  complete(): mixed;
}

declare class rxjs$Subject<I, O> extends rxjs$Observable<O> mixins rxjs$Observer<I> {
  asObservable(): rxjs$Observable<O>;

  observers: Array<rxjs$Observer<O>>;

  unsubscribe(): void;

  // Copied from rxjs$Observer<O>
  next(value: I): mixed;
  error(error: any): mixed;
  complete(): mixed;

  // For use in subclasses only:
  _next(value: I): void;
  _subscribe(observer: rxjs$PartialObserver<O>): rxjs$Subscription;

  share(): rxjs$Subject<I, O>;

  map<U>(f: (value: O) => U): rxjs$Subject<I, U>;

  withLatestFrom<A>(
    a: rxjs$Observable<A>,
    _: void,
  ): rxjs$Observable<[O, A]>;

  withLatestFrom<A, B>(
    a: rxjs$Observable<A>,
    resultSelector: (a: A) => B,
  ): rxjs$Subject<I, B>;

  withLatestFrom<A, B, C>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    resultSelector: (a: A, b: B) => C,
  ): rxjs$Subject<I, C>;

  withLatestFrom<A, B, C, D>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    resultSelector: (a: A, b: B, c: C) => D,
  ): rxjs$Subject<I, D>;

  withLatestFrom<A, B, C, D, E>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    resultSelector: (a: A, b: B, c: C, d: D) => E,
  ): rxjs$Subject<I, E>;

  withLatestFrom<A, B, C, D, E, F>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E) => F,
  ): rxjs$Subject<I, F>;

  withLatestFrom<A, B, C, D, E, F, G>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
  ): rxjs$Subject<I, G>;

  withLatestFrom<A, B, C, D, E, F, G, H>(
    a: rxjs$Observable<A>,
    b: rxjs$Observable<B>,
    c: rxjs$Observable<C>,
    d: rxjs$Observable<D>,
    e: rxjs$Observable<E>,
    f: rxjs$Observable<F>,
    g: rxjs$Observable<G>,
    resultSelector: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
  ): rxjs$Subject<I, H>;
}

declare class rxjs$BehaviorSubject<I, O> extends rxjs$Subject<I, O> {
  constructor(initialValue: O): void;

  getValue(): O;
}

declare class rxjs$ReplaySubject<I, O> extends rxjs$Subject<I, O> {
  constructor(bufferSize: ?number, windowTime: ?number, scheduler: ?rxjs$SchedulerClass): void;
}

declare class rxjs$Subscription {
  unsubscribe(): void;
  add(teardown: rxjs$TeardownLogic): rxjs$Subscription;
}

declare class rxjs$SchedulerClass {
  schedule<T>(work: (state: ?T) => void, delay: ?number, state: ?T): rxjs$Subscription;
}

declare class rxjs$TimeoutError extends Error {}

declare module 'rxjs' {
  declare module.exports: {
    Observable: typeof rxjs$Observable,
    ConnectableObservable: typeof rxjs$ConnectableObservable,
    Subject: typeof rxjs$Subject,
    AnonymousSubject: typeof rxjs$Subject,
    BehaviorSubject: typeof rxjs$BehaviorSubject,
    ReplaySubject: typeof rxjs$ReplaySubject,
    Scheduler: {
      asap: rxjs$SchedulerClass,
      queue: rxjs$SchedulerClass,
      animationFrame: rxjs$SchedulerClass,
      async: rxjs$SchedulerClass,
    },
    Subscription: typeof rxjs$Subscription,
    TimeoutError: typeof rxjs$TimeoutError,
  }
}

declare module 'rxjs/Observable' {
  declare module.exports: {
    Observable: typeof rxjs$Observable
  }
}

declare module 'rxjs/Observer' {
  declare module.exports: {
    Observer: typeof rxjs$Observer
  }
}

declare module 'rxjs/BehaviorSubject' {
  declare module.exports: {
    BehaviorSubject: typeof rxjs$BehaviorSubject
  }
}

declare module 'rxjs/ReplaySubject' {
  declare module.exports: {
    ReplaySubject: typeof rxjs$ReplaySubject
  }
}

declare module 'rxjs/Subject' {
  declare module.exports: {
    Subject: typeof rxjs$Subject,
    AnonymousSubject: typeof rxjs$Subject
  }
}

declare module 'rxjs/Subscription' {
  declare module.exports: {
    Subscription: typeof rxjs$Subscription
  }
}

declare module 'rxjs/testing/TestScheduler' {
  declare module.exports: {
    TestScheduler: typeof rxjs$SchedulerClass
  }
}
