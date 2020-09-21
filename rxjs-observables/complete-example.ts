import { Observable, Subscription, Subject } from "rxjs";
import { finalize } from "rxjs/operators";

/*
 * Example 1: observable with stream of data that does not complete
 * This example manually unsubscribes to prevent memory leaks
 * The 4 and 5 will not be received by the observer as we unsubscribe before
 * they are even emitted due to the setTimeout
 */
console.log('==== Example 1 ====');
const source1$: Observable<any> = new Observable((obs: any) => {
    obs.next(1);
    obs.next(2);
    obs.next(3);
    setTimeout(() => obs.next(5), 2000);
    setTimeout(() => obs.next(4), 1000);
});

const subcription1: Subscription = source1$.subscribe(
    x => {
        console.log("Source 1 = ", x);
    },
    err => {
        console.log(err);
    },
    () => {
        console.log("Completed example 1");
    }
);
subcription1.unsubscribe();
console.log("Unsubscribed 1 = ", subcription1.closed);

/*
* Example 2: observable with stream of data that does complete
* This example the stream of data will complete and prevents memory leaks
* The 4 and 5 will not be received by the observer as we complete() before
* they are even emitted due to the setTimeout
*/
console.log('==== Example 2 ====');
const source2$: Observable<any> = new Observable((obs: any) => {
    obs.next(1);
    obs.next(2);
    obs.next(3);
    setTimeout(() => obs.next(5), 2000);
    setTimeout(() => obs.next(4), 1000);
    obs.complete();
});

const subcription2: Subscription = source2$.subscribe(
    x => {
        console.log("Source 2 = ", x);
    },
    err => {
        console.log(err);
    },
    () => {
        console.log("Completed example 2");
    }
);
console.log("Unsubscribed 2 = ", subcription2.closed);

/*
* Example 3: observable with stream of data that does complete
* This example the stream of data will complete after everything is emitted
* and this prevents memory leaks
* The 4 and 5 will be received by the observer as we complete() after the
* last one are emitted
* Also we us the operator finalize to really check if it is unsubscribed when observable completes or errors
*/
console.log('==== Example 3 ====');
const source3$: Observable<any> = new Observable((obs: any) => {
    obs.next(1);
    obs.next(2);
    obs.next(3);
    setTimeout(() => {
        obs.next(5);
        obs.complete();
    }, 2000);
    setTimeout(() => obs.next(4), 1000);
});

const subcription3: Subscription = source3$
    .pipe(
        finalize(() => console.log("Unsubscribed 3 = ", subcription3.closed)),
    )
    .subscribe(
        x => {
            console.log("Source 3 = ", x);
        },
        err => {
            console.log(err);
        },
        () => {
            console.log("Completed  example 3");
        }
    );

/*
* Example 4: Even with a subject when it completes
* then all the subcriptions subscribed to the subject are unsubscribed
*/
console.log('==== Example 4 ====')
const subjectSource$: Subject<number> = new Subject<number>();

// The subcriptions with operator finalize to really check if it is
// unsubscribed when observable completes or errors
const subscription1: Subscription = subjectSource$
    .pipe(
        finalize(() => console.log("Unsubscribed 1 = ", subscription1.closed)),
    )
    .subscribe(
        x => {
            console.log("source subject 1 = ", x);
        },
        err => {
            console.log(err);
        },
        () => {
            console.log("Completed example 4 - source 1");
        }
    );
const subscription2: Subscription = subjectSource$
    .pipe(
        finalize(() => console.log("Unsubscribed 2 = ", subscription2.closed)),
    )
    .subscribe(
        x => {
            console.log("source subject 2 = ", x);
        },
        err => {
            console.log(err);
        },
        () => {
            console.log("Completed example 4 - source 2");
        }
    );


// The data events of the subject, so when emitted the subcriptions above do
// their onNext function, which is console.log
subjectSource$.next(1);
subjectSource$.next(2);
subjectSource$.next(3);
setTimeout(() => {
    subjectSource$.next(5);
    subjectSource$.complete();
}, 6000);
setTimeout(() => subjectSource$.next(4), 4000);