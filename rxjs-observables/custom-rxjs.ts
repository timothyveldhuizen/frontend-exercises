/*
* Custom Rxjs
* Simplified example of how to write your own rxjs
*/

/*
* A simple Hello class
* It contains a number that we log on the subscribe method
* And has several pipe functions to demonstrate how pipe works
* Piping works when the input object and output object are a Hello class
* Because then the same methods (subscribe) and number are available
*/
class Hello {
    n: number
  
    constructor(n: number) {
      this.n = n;
    }
  
    // The pipe function takes 1 parameter, which is a function and returns a new Hello object
    // Based on the current Hello class (this) we get the number (this.n)
    // And pass that to the function provided as parameter in the pipe
    pipe(fn: (val: any) => any): Hello {
      return new Hello(fn(this.n))
    }
  
    // Same as pipe above but now with reduce we can call multiple functions
    pipeMore(...fns: any[]) {
      return fns.reduce((acc, curr) => new Hello(curr(acc.n)), this)
    }
  
    // Same as pipe above, but difference is that the new Hello is moved to responsibility of provided function
    // So fn returns a function that needs a Hello class and returns a hello class
    // See example 3 function c
    pipeCurry(fn: (val: any) => any): Hello {
      return fn(this);
    }
  
    pipeCurryMore(...fns: ((val: any) => any)[]): Hello {
      return fns.reduce((acc, curr) => curr(acc), this)
    }
  
    subscribe() {
      console.log(this.n)
    }
  }
  
  /*
  * Example 1: pipe with 1 arrow function provided inline
  */
  const hello = new Hello(2)
  
  hello.pipe(
    (val) => val * 5
  )
  .subscribe()
  
  /*
  * Example 2: pipeMore with multiple functions provided
  */
  
  // A const function to use in pipeMore
  const a = (val: any) => val * 5;
  
  // A normal function to use in pipeMore
  function b(fn: (val: any) => any) {
    return fn;
  }
  
  // Inline functions and above declared functions a and b
  hello.pipeMore(
    (val: any) => val * 5,
    (val: any) => val * 5,
    a,
    b(val => val * 10),
  )
  .subscribe()
  
  /*
  * Example 3: pipeCurry and pipeCurryMore which returns a function
  */
  
  // This function is used in pipeCurry as it is responsible for returning a new Hello class
  // The function returns a function that needs the Hello class as input and returns a new Hello class
  // In this function it uses the fn parameter provided when calling c
  function c(fn: (val: any) => any): (any: Hello) => Hello {
    return function(source: Hello): Hello {
      return new Hello(fn(source.n));
    }
  }
  
  hello.pipeCurry(
    c(val => val * 10)
  )
  .subscribe()
  
  hello.pipeCurryMore(
    c(val => val * 10),
    c(val => val * 10),
    c(val => val * 10),
  )
  .subscribe()
  
  /*
  * Example 4: Own version of Rxjs
  */
  
  // The listener interface is the observer
  // So listeners can listen to any music that is observable
  interface Listener {
    next: (val) => void;
    error: (e) => void;
    complete: () => void;
  }
  
  // The listening interface is the subscription
  // When listeners listen to music then they are listening
  interface Listening {
    unsubscribe: () => void;
  }
  
  // The music class is the observable where listeners can listen to
  class Music {
    constructor(private soundProducer: any) {}
  
    // This is similar to the pipeCurryMore method of the Hello class
    pipe(...fns: ((val: any) => any)[]): Music {
      return fns.reduce((acc, curr) => curr(acc), this)
    }
  
    subscribe(listener: Listener) {
      return this.soundProducer(listener)
    }
  }
  
  // rockMusic is creating a new Music with a band name
  // Similar to rxjs of()
  function rockMusic(band: string) {
  
    // rockProducer produces the music of the band
    function rockProducer(listener: Listener): Listening {
      listener.next(band);
      listener.complete();
  
      return <Listening>{
        unsubscribe() {}
      }
    }
  
    // Create a new Music with above rockProducer
    return new Music(rockProducer);
  }
  
  rockMusic('Metallica').subscribe({
    next: console.log,
    error: console.log,
    complete: () => console.log('Completed')
  })
  
  // The switchMusic is the operator that can be used in the pipe method
  // It is similar to a rxjs map operator
  function switchMusic(fn: (val: any) => any): (source: Music) => Music {
    // A function that needs as input Music (this, which is provided from pipe())
    return function switchIt(source: Music): Music {
  
      // Return the new music
      return new Music(
        // Provide a new producer
        function switchMusicProducer(listener: Listener): Listening {
          // Subscribe to the source Music
          source.subscribe({
            // When the source produces data
            // Then you produce data for the new listener and use the fn provided in switch
            next: val => listener.next(fn(val)),
            error: e => console.log,
            complete: () => {
              // When the source completes
              // The new listener should complete as well
              listener.complete()
              console.log('rockMusic completed')
              }
          })
  
          return <Listening>{
            unsubscribe() { }
          }
        }
      )
    }
  }
  
  rockMusic('Little Dragon')
  .pipe(
    switchMusic(val => val + ', Queen'),
    switchMusic(val => val + ', The Weeknd'),
  )
  .subscribe({
    next: console.log,
    error: console.log,
    complete: () => console.log('switchMusic completed')
  })
  