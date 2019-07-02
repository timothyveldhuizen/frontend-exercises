import { Observable } from 'rxjs';

// plain functions
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

foo$.subscribe(x => {
  console.log(x);
});
foo$.subscribe(y => {
  console.log(y);
});

// Some people claim that Observables are asynchronous. That is not true
console.log('---PLAIN FUNCTION---');
console.log('before');
console.log(foo());
console.log('after');

// the subscription of foo was entirely synchronous, just like a function
console.log('---OBSERVABLES---');
console.log('before');
foo$.subscribe(x => {
  console.log(x);
});
console.log('after');

// Observables can "return" multiple values over time, something which functions cannot. You can't do this:
console.log('---PLAIN FUNCTION---');
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
foos$.subscribe(x => {
  console.log(x);
});
console.log('after');

// But you can also "return" values asynchronously:
console.log('---OBSERVABLES (asynchronous)---');
const bar$ = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300); // happens asynchronously
  }, 1000);
});
 
console.log('before');
bar$.subscribe(x => {
  console.log(x);
});
console.log('after');