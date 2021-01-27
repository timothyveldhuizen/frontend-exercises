
/*
* Function types 
* Different ways to describe / type a function
*/

/*
* Function type expression
* Simple inline arrow function type expressions
*/
const mySimpleFn: (value: string) => string = (value: string) => value;
const mySimpleNormalFn: (value: string) => string = function(value: string) {
  return value;
}

/*
* Function type signature
* Define a type for a function with a function type signature
* You define the alias for the function type
*/
type MyFnType = (value: string) => string;

// Check that the type of const declaration is of same type
// The declared arrow function should you be of same type
const myConstFunction: MyFnType = (value: string) => value;

// Or with a normal function declaration
const myNormalFn: MyFnType = function(value: string) {
  return value
}

/*
* Interface function type
* Interfaces can also describe function types
*/
interface MyFnInterface {
  // this is the call signature existing of parameters and return type
  (value: string): string; 
}

const myNextFunction: MyFnInterface = (value: string) => value;

/*
* Function parameter is a function
* The type of a parameter is function which you can type with above examples
* So that is expression, alias type or interface
*/

// Parameter as function type expression
function expression(fn: (value: string) => string): void {}

// Parameter as function alias type
type fnAlias = (value: string) => string;

function aliasType(fn: fnAlias): void {}

// Parameter as function interface
interface fnInterface {
  (value: string): string;
}

function interfaceType(fn: fnInterface): void {}


/*
* Use generics with type parameter
* This way there is a relation in type input and output
*/

// Without type parameter
function withoutTypeParam(fn: (value: any) => any): void {}

// With type parameter
function withTypeParam<T>(fn: (value: T) => T): void {}

/*
* Pass an array of functions as parameter
*/

type NumberFn = (n: number) => number;

function pipeFunctions(n: number, fns: NumberFn[]): number {
  return fns.reduce((acc, curr) => curr(acc), n);
}

function add(n: NumberFn): NumberFn {
  return n;
}

const result = pipeFunctions(1, [
  add(n => n * 2), 
  n => n * 3, 
  n => n * 4
  ]
);