# RxJS - Reactive extensions library for Javascript
This library is used for reactive programming in Javascript with using Observables.
RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the *Observable*, satellite types (*Observer, Schedulers, Subjects*) and operators inspired by *Array* (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

## Setup

Off course do `npm init` then `npm install --save-dev typescript` for Typescript and `npm install rxjs` on a blank project.
Then `npx tsc --init` to make it a Typescript project and `npx tsc` to compile it to Javascript files.
When the output is rendered you can debug/run the js files in VS Code with launch.json pointing to outFiles of JS file.
```
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}\\rxjs-observables\\basics.ts",
            "outFiles": [
                "${workspaceFolder}/rxjs-observables/dist/*.js"
            ],
            "useWSL": true
        }
    ]
```

## Concept of RxJS
The essential concepts in RxJS which solve async event management are:
- Observable: represents the idea of an invokable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

## Observables

|       | Description | Multiple   |
| ----- | ----------- | --------   |
| Pull  | Function    | Iterator   |
| Push  | Promise     | Observable |

### Pull versus Push
*Pull* and *Push* are two different protocols that describe how a data Producer can communicate with a data Consumer.

|       | Producer | Consumer   |
| ----- | ----------- | --------   |
| Pull  | Passive: produces data when requested. | Active: decides when data is requested. |
| Push  | Active: produces data at its own pace. | Passive: reacts to received data. |

#### What is Pull? 
In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer.

Every JavaScript Function is a Pull system. The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a single return value from its call.

ES2015 introduced generator functions and iterators (function*), another type of Pull system. Code that calls iterator.next() is the Consumer, "pulling" out multiple values from the iterator (the Producer).

#### What is Push?
In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

Promises are the most common type of Push system in JavaScript today. A Promise (the Producer) delivers a resolved value to registered callbacks (the Consumers), but unlike functions, it is the Promise which is in charge of determining precisely when that value is "pushed" to the callbacks.

RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).
- A Function is a lazily evaluated computation that synchronously returns a single value on invocation.
- A generator is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
- A Promise is a computation that may (or may not) eventually return a single value.
- An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.

More information: https://rxjs-dev.firebaseapp.com/guide/observable

### Observables as generalization of functions
Both functions and Observables are lazy computations. 
- If you don't call the *function*, the `console.log('Hello')` won't happen. 
- Also with *Observables*, if you don't "call" it with `.subscribe()`, the `console.log('Hello')` won't happen. 

Plus, "calling" or "subscribing" is an isolated operation: two function calls trigger two separate side effects, and two Observable subscribes trigger two separate side effects. As opposed to EventEmitters which share the side effects and have eager execution regardless of the existence of subscribers, Observables have no shared execution and are lazy.

> Subscribing to an Observable is analogous to calling a Function.

> Observables are able to deliver values either synchronously or asynchronously.

## Anatomy of observables
Core Observable concerns:
- Creating Observables
- Subscribing to Observables
- Executing the Observable
- Disposing Observables

Operators
- Pipeable operators
- Creation operators

A *Pipeable Operator* is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.
An Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output. Subscribing to the output Observable will also subscribe to the input Observable.

*Creation Operators* are the other kind of operator, which can be called as standalone functions to create a new Observable. For example: `of(1, 2, 3)` creates an observable that will emit 1, 2, and 3, one right after another