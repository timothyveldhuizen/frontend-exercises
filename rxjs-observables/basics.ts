import { Observable, from, interval } from 'rxjs';
import { map } from 'rxjs/operators';

// plain function
console.log('---PLAIN FUNCTION---');
function foo() {
  console.log('Hello');
  return 42;
};

const x = foo(); // same as foo()
console.log(x);
const y = foo(); // same as foo()
console.log(y);

// You can write the same behavior above, but with Observables:
console.log('---OBSERVABLES---');
const foo$ = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

foo$.subscribe(x => console.log(x));
foo$.subscribe(y => console.log(y));

// Some people claim that Observables are asynchronous. That is not true
console.log('---PLAIN FUNCTION---');
console.log('before');
console.log(foo());
console.log('after');

// the subscription of foo is entirely synchronous, just like a function
console.log('---OBSERVABLES---(observable async is not true, subscription is sync like function)');
console.log('before');
foo$.subscribe(x => console.log(x));
console.log('after');

// Observables can "return" multiple values over time, something which functions cannot. You can't do this:
console.log('---PLAIN FUNCTION--- (return multiple values not possible)');
function foos() {
  console.log('Hello');
  return 42;
  // return 100; // dead code. will never happen
}
console.log('before');
console.log(foos());
console.log('after');

// Functions can only return one value. Observables, however, can do this:
// With synchronous output:
console.log('---OBSERVABLES (synchronous)---');
const foos$ = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100); // "return" another value
  subscriber.next(200); // "return" yet another
});

console.log('before');
// this below subscribe happens synchronous
foos$.subscribe(x => console.log(x));
console.log('after');

// But you can also "return" values asynchronously:
console.log('---OBSERVABLES (asynchronous)---');
const bar$ = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => subscriber.next(300), 1000); // this happens asynchronously
});
 
console.log('before');
bar$.subscribe(x => console.log(x));
console.log('after (300 is logged after console.log(after)');
// the 300 is logged after console.log('after') because of the timeout

//  Creating
// The following example creates an Observable to emit the string 'hi' every second to a subscriber
// Observables can be created with new Observable. Most commonly, observables are created using creation functions, like of, from, interval, etc.
const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi interval 1')
  }, 1000);
});

// A typical example of a creation operator would be the interval function. It takes a number (not an Observable) as input argument, and produces an Observable as output:
// Observable with creation functions, result is exactly the same as above
const observable2 = interval(1000)
                        .pipe( 
                          map(() => 'hi interval 2'),
                        );

// Subscribing
// the Observable observable in the example can be subscribed to, like this:
// It is not a coincidence that observable.subscribe and subscribe in new Observable(function subscribe(subscriber) {...}) have the same name
// This shows how subscribe calls are not shared among multiple Observers of the same Observable
// Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.
const subscription1 = observable.subscribe(x => console.log(x));
const subscription2 = observable2.subscribe(console.log);


// Executing
// The code inside new Observable(function subscribe(subscriber) {...}) represents an "Observable execution", a lazy computation that only happens for each Observer that subscribes
// In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.
const observableComplete = new Observable(function subscribe(subscriber) {
  subscriber.next('one');
  subscriber.next('two');
  subscriber.next('three');
  subscriber.complete();
  subscriber.next('four'); // Is not delivered because it would violate the contract
});

observableComplete.subscribe(console.log);

// Disposing "Observable execution"
// When observable.subscribe is called, the Observer gets attached to the newly created Observable execution. This call also returns an object, the Subscription:
const observableFrom = from([4, 8, 16]);
const subscription = observableFrom.subscribe({
  next: value => console.log(value),
  error: error => console.log(error),
  complete: () => console.log('Completed!'),
});


// Later:
// subscription1.unsubscribe();
// subscription2.unsubscribe();