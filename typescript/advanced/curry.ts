/*
* Curry all the way
*/

// Normal function
function normalFn(name: string, age: number, graduated: boolean): void {
    console.log(`Normal: Hello, ${name}, ${age} - Graduated: ${graduated}`)
}
normalFn('John', 25, false);

// Curry function
type Fn = (value: any) => any;

function curryFn(): Fn {
    return function (name: string): Fn {
        return function (age: number): Fn {
            return function (graduated: boolean): void {
                console.log(`Curry: Hello, ${name}, ${age} - Graduated: ${graduated}`)
            }
        }
    }
}
curryFn()('Kim')(28)(true);

// Or assigning it to constants
const nameFn = curryFn(); // returns the name function
const ageFn = nameFn('Jane') // you call the name function and it returns the age function
const graduatedFn = ageFn(26) // you call the age function and it returns the graduated function
graduatedFn(true) // you call the graduated function and it does console log