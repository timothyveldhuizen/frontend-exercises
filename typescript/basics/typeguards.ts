interface Person {
  name: string;
  age: number;
  married: boolean;
  skills: Array<string>;
}

// Mimic that we get a json string from a source
const personJson = JSON.stringify({
  name: "John Doe",
  age: 50,
  married: false,
  skills: ["cooking", "freerunning"],
});

// Mimic that we parse the json string to a js object
// But how do we know the content of the string is same as our interface?
const personObject = JSON.parse(personJson);

// Type guard function based on available key properties in object
function hasObjectProperties(object: any, properties: Array<string>) {
  return properties.every((prop) => prop in object);
}

console.log(
  hasObjectProperties(personObject, ["name", "age", "married", "skills"]), //true
  hasObjectProperties(personObject, ["name", "age", "married", "skillsss"]), //false
  hasObjectProperties(personObject, ["name", "age", "married", "skills", ""]), //false
  hasObjectProperties(personObject, ["name", "age", "skills", ""]) //false
);

function demoHasProperties() {
  if (hasObjectProperties(personObject, ["name", "age", "married", "skills"])) {
    // we know personObject has the Person interface properties
    // but still TS types it as any, personObject: any
    personObject.demo(); // is any so TS doesn't know the available properties
  }
}

// Type guard with type predicate and manual runtime checks
// object is Person when return true
function isValidPerson(object: any): object is Person {
  const nameIsString = typeof (object as Person).name === "string";
  const ageIsNumber = typeof (object as Person).age === "number";
  const marriedIsBoolean = typeof (object as Person).married === "boolean";
  const skillsIsObject = typeof (object as Person).skills === "object";
  return nameIsString && ageIsNumber && marriedIsBoolean && skillsIsObject;
}

console.log(
  isValidPerson(personObject) // true
);

// So with type predicate TS will recognize the type
function demoValidPerson() {
  if (isValidPerson(personObject)) {
    // personObject is typed as Person, personObject: Person
    personObject.age;
    personObject.demo(); // is not recognized and TS complains
  }
  //personObject is typed as any, personObject: any
  personObject.demo(); //is any so TS doesn't know the available properties
}

// Type guard with type predicate and manual runtime checks
// object is valid when true
function isValidObject<T>(object: any, types: Array<string>): object is T {
  if (Object.values(object).length === types.length) {
    for (let i = 0; i < Object.values(object).length; i++) {
      if (typeof Object.values(object)[i] !== types[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

console.log(
  isValidObject<Person>(personObject, [
    "string",
    "number",
    "boolean",
    "object",
  ]), //true
  isValidObject<Person>(personObject, [
    "string",
    "number",
    "boolean",
    "object",
    "",
  ]), //false
  isValidObject<Person>(personObject, [
    "string",
    "number",
    "boolean",
    "boolean",
  ]), //false
  isValidObject<Person>(personObject, ["string", "number", "boolean"]) //false
);

// So added value of using type predicate is that TS will recognize the available properties
function demoValidObject() {
  if (
    isValidObject<Person>(personObject, [
      "string",
      "number",
      "boolean",
      "object",
    ])
  ) {
    // personObject is typed as Person, personObject: Person
    personObject.age; //is recognized as a property
    personObject.demo(); // is not recognized and TS complains
  }
  //personObject is typed as any, personObject: any
  personObject.demo(); //is any so TS doesn't know the available properties
}
