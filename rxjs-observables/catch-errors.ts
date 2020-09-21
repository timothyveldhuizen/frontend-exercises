import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, finalize, retryWhen, tap, delayWhen, take } from 'rxjs/operators';

/*
* Example 1: normal function try / catch Error
* Can return only successful or failed value, in this case only failed
* And then the flow is stopped
*/
console.log('==== Example 1 ====')
function returnError() {
    throw new Error('this is my error')
}

(function doSomething() {
    try {
        returnError()
    }
    catch (error) {
        console.log('Nice catch!', error)
    }
})();

/*
* Example 2: A observable data stream that catches error
* The observable can return as many successful values until a Error occurs
* Then the stream stops and no more values are emitted
* The subscription is unsubscribed
*/
console.log('==== Example 2 ====')
const returnErrorStream$ = new Observable(obs => {
    obs.next(0);
    obs.next(1);
    obs.next(2);
    throw new Error('this is my stream error')
    obs.next(3);
    obs.complete();
});

const subscription = returnErrorStream$.subscribe(
    (value: any) => console.log(value),
    (error: Error) => console.log('Nice stream catch', error),
    () => console.log('Complete')
);
console.log('Unsubscribed = ', subscription.closed)

/*
* Example 3: Catch and replace error in observable stream with operator
* This way the stream can emit data and the subscription is still open after an error
* We do this with catchError operator and return a replacement Observable with a fallback value
* Because the replacement observable is completed immediately, we get a complete
* We don't get the value 3 as the catchError returns a replacement Observable
* Which doesn't contain that value, only 99
*/
console.log('==== Example 3 ====')
const returnCatchErrorStream$ = new Observable(obs => {
    obs.next(0);
    obs.next(1);
    obs.next(2);
    throw new Error('this is my stream error')
    obs.next(3);
    obs.complete();
});

const subscriptionCatch = returnCatchErrorStream$
    .pipe(
        catchError(error => of(99))
    )
    .subscribe(
        (value: any) => console.log(value),
        (error: Error) => console.log('Nice stream catch', error),
        () => console.log('Complete')
    );
console.log('Unsubscribed = ', subscriptionCatch.closed)

/*
* Example 4: Catch, handle and rethrow the Error for the observable stream
* This example output is the same as example 2
* Only difference is we can handle the error with catchError 
* And in the subscribe you can output the error
*/
console.log('==== Example 4 ====')
const returnCatchRethrowErrorStream$ = new Observable(obs => {
    obs.next(0);
    obs.next(1);
    obs.next(2);
    throw new Error('this is my stream error')
    obs.next(3);
    obs.complete();
});

const subscriptionCatchRethrow = returnCatchRethrowErrorStream$
    .pipe(
        catchError(error => {
            console.log('Handle the error', error);
            return throwError(error);
        })
    )
    .subscribe(
        (value: any) => console.log(value),
        (error: Error) => console.log('Nice stream catch', error),
        () => console.log('Complete'));
console.log('Unsubscribed = ', subscriptionCatchRethrow.closed)

/*
* Example 5: Catch and finalize for the observable stream
* Is similar to the normal try / catch / finally code block
* 
*/
console.log('==== Example 5 ====')
const returnCatchFinalizeStream$ = new Observable(obs => {
    obs.next(0);
    obs.next(1);
    obs.next(2);
    throw new Error('this is my stream error')
    obs.next(3);
    obs.complete();
});

const subscriptionFinalize = returnCatchFinalizeStream$
    .pipe(
        catchError(error => of(99)),
        finalize(() => console.log('Welcome in the finals'))
    )
    .subscribe(
        (value: any) => console.log(value),
        (error: Error) => console.log('Nice stream catch', error),
        () => console.log('Complete')
    );
console.log('Unsubscribed = ', subscriptionFinalize.closed)

/*
* Example 6: Catch and retry with a delay and 3 attempts
* With retryWhen you can retry the emitted values when the error occurs
* With a delay and a take you can control when to retry and how many times to retryWhen
* Notice that normally the error was not outputted, you need to explicitly log it in retryWhen to see it
*/
console.log('==== Example 6 ====')
const returnRetryStream$ = new Observable(obs => {
    obs.next(0);
    obs.next(1);
    obs.next(2);
    throw new Error('this is my stream error')
    obs.next(3);
    obs.complete();
});

const subscriptionRetry: any = returnRetryStream$
    .pipe(
        retryWhen(errors => errors.pipe(
            tap(() => console.log('retrying...')),
            take(3),
            delayWhen(() => timer(5000)),
        )
        ),
        finalize(() => console.log('Unsubscribed = ', subscriptionRetry.closed))
    )
    .subscribe(
        (value: any) => console.log(value),
        (error: Error) => console.log('Nice stream catch', error),
        () => console.log('Complete')
    );
