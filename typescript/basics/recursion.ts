
/*
* Simple example factorial recursive method
* It will do 5x4x3x2x1=120
*/
function factorial(n: number): number {
    // base case
    if (n == 1) return 1;

    // recursion
    return n * factorial(n - 1);
}
console.log('result', factorial(5))
console.log('result', factorial(4))
console.log('result', factorial(3))

/*
* Simple example of calling factorial method on every array item
*/
function factorialArray(n: number[]): number[] {
    return n.map(item => {
        return factorial(item)
    })
}
console.log('result array', factorialArray([5, 4, 3]))

/*
* Simple example of recursion when object has 'name' property
*/
function recursionOnObject(o: any): any {
    // base case
    if (!o.hasOwnProperty('name')) return o;

    // recursion
    return recursionOnObject(o.name)
}
console.log('result object', recursionOnObject(
    {
        name: {
            name: {
                name: 'hoi'
            }
        }
    }
))
console.log('result object', recursionOnObject(
    {
        name: 'hello'
    }
))

/*
* Example of recursion on array of objects 
*/
function recursionOnObjectArray(o: any[]): any[] {
    return o.map(item => {
        return recursionOnObject(item)
    })
}
console.log('result object array', recursionOnObjectArray(
    [
        {
            name: {
                name: {
                    name: 'hoi'
                }
            }
        },
        {
            name: {
                name: 'hello'
            }
        },
        {
            name: 'goodbye'
        },
    ]))