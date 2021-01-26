/*
* Symbol exercises
*/

// Symbol is like a primitive data type like string
// Can be used as a key on objects
const sym = Symbol();

let obj = {
  [sym]: "value",
};
console.log(obj[sym]);


// Use symbol as a object key
const logFunctionMsg = Symbol();

function doLog(message: string, object: any) {
  console.log(message, object[logFunctionMsg](object))
}

function addLogMsg(object: any, logFunction: (object: any) => string) {
  object[logFunctionMsg] = logFunction;
}

const object = {
  title: 'This is the object title'
}


addLogMsg(object, (object) => `Custom log function: ${object.title}`)
doLog('INFO: ', object)
// Output = INFO: Custom log function: This is the object title