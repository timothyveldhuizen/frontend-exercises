// Javascript ES6 exercises
'use strict'


// Block scoping 
// productId is not known outside the block
{
    let productId = 12;
}

// productId in for loop is scoped in for loop block
let productId = 16;
for(let productId = 0; productId < 12; productId++)
{

}
console.log(productId)

// Constant intializing
// immediately intialize it
const MARK = 'This is my mark';
console.log(MARK);

// empty or afterwards declaring fails
// const EMPTY;
// console.log(EMPTY);

// const AFTERWARDS;
// AFTERWARDS = 'Try';
// console.log(AFTERWARDS);



// Arrow functions
// normal function no input
// function expression
// var getPrice = function() {
//     return 5.99;
// }

// named function expression
var fibo = function fibonacci() {
    // you can use "fibonacci()" here as this funciton expression has a name.
};

// fibonacci() here fails, but fibo() works.


// natural function definition
function getPrice() {
    return 5.99;
}

// Arrow function no input
var getPriceArrow = () => 5.99;

// normal function with 1 argument
var getPriceInput = function(count) {
    return count * 4;
}

// Arrow function with 1 argument
var getPriceInputArrow = (count) => count * 4;

// normal function with multiple arguments
var getPriceMultiple = function(one, two, three) {
    return (one + two + three) * 4;
}
// Arrow function with multiple arguments
var getPriceMultipleArrow = (one, two, three) => (one + two + three) * 4;

// Arrow function with block, then we need a return
var getPriceMultipleArrow2 = (one, two, three) => {
    var price = one + two + three;
    price *= 4;
    return price;
}

console.log(getPrice);
console.log(getPrice());

console.log(getPriceArrow);
console.log(getPriceArrow());


console.log(getPriceInput);
console.log(getPriceInput(2));

console.log(getPriceInputArrow);
console.log(getPriceInputArrow(2));

console.log(getPriceMultiple);
console.log(getPriceMultiple(1,2,3));

console.log(getPriceMultipleArrow);
console.log(getPriceMultipleArrow(1,2,3));

console.log(getPriceMultipleArrow2);
console.log(getPriceMultipleArrow2(1,2,3));


// Returning this in arrow funtions
// ES5 example: in the function, context of this is set to object invoice
var invoice = {
    number: 23,
    process: function() {
        console.log(this);
    }
};
invoice.process();

//ES6 example: in the arrow function, context of this is set to Global Window object
var invoice2 = {
    number: 23,
    process: () => console.log(this)
};
invoice2.process();


//IIFE Immediately invoked function expression
// IIFE using any unary operater ! + - etc.
!function() {
    console.log("Hello from IIFE!");
}();

// IIFE using void
void function() {
    console.log("Hello from IIFE void!");
}();

// Variation 1 () within outer () expression
(function() {
    console.log("I am an IIFE!");
}());

// Variation 2 () outside outer () expression
(function() {
    console.log("I am an IIFE, too!");
})();

// Scope of function and variables only available in IIFE
// Also a named function expression
(function IIFE_initGame() {
    // Private variables that no one has access to outside this IIFE
    var lives;
    var weapons;
    
    console.log(`Lives: ${lives}, weapons: ${weapons}`)
    init();
    console.log(`Lives: ${lives}, weapons: ${weapons}`)

    // Private function that no one has access to outside this IIFE
    function init() {
        lives = 5;
        weapons = 10;
    }
}());

// IIFE with return value that can be assigned to 'result' and then use in console.log
var result = (function() {
    return "From IIFE";
}());

console.log(result);

// IIFE with parameters and use that in the function ()
(function IIFE(msg, times) {
    for (var i = 1; i <= times; i++) {
        console.log(msg);
    }
}("Hello!", 5));

// Technically this is read as a expression by Javascript and is a IIFE
var result = function() {
    return "From IIFE!";
}();

//Other
// for .. of loops
var arrayOfSomething = ['cat', 'dog', 'goldfish'];
for(var pet of arrayOfSomething) {
    console.log(pet);
}

// Template literal uses backtick `
// Interpolation takes place before the function call
function showMessage(message) {
    let invoiceNum = 99;
    console.log(message);
}
let invoiceNum = 1350;
showMessage(`Invoice num: ${invoiceNum}`);


// no commas needed in classes, but are needed in object literals { some: '', }
class Task {
    constructor() {
        console.log('constructing Task');
    }
    showId() {
        console.log('99');
    }
}

let task = new Task();
task.showId();