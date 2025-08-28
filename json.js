// JSONS: JavaScript Object Notation
// JSON is a Lightweight
// Structured and organized Data becouse in most contexts. JSON is represent as a String

 
// Convert JSON → Object:
const jsonData = '{"name":"Rahul","age":25}';
const object = JSON.parse(jsonData); // JSON String → Object
console.log(object.name); // Rahul

//Convert Object → JSON:
const obj = { name: "Rahul", age: 25 };
const jsonString = JSON.stringify(obj);  // Object → JSON String
console.log(jsonString); // {"name":"Rahul","age":25}


// 👉 Simple language me:
// .stringify() = Object → String
// .parse() = String → Object
