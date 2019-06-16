// Typescript exercises

function greeter(person: string) {
    return "Hello, " + person;
}

let girl = "Jane User";

console.log(greeter(girl));

// In TypeScript, two types are compatible if their internal structure is compatible. 
// So interface Person has 2 attributes which are exactly the same type as `let person`.
interface Person {
    firstName: string;
    lastName: string;
}
function goodbye(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let person = { firstName: "Timothy", lastName: "V" };

console.log(goodbye(person));

// Classes with constructor
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface User {
    firstName: string;
    lastName: string;
}

function welcome(user: User) {
    return "Hello, " + user.lastName + " " + user.firstName;
}

let user = new Student("Jane", "M.", "User");
console.log(user.middleInitial);
console.log(welcome(user));
