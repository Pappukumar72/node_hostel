const mongoose = require('mongoose')
const bcrypt = require("bcrypt")


// Define the Person Schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type : Number,
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre("save", async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')){
        return next();
    }

    try {
        // hash password genration
        const salt = await bcrypt.genSalt(10);
    
        // hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);
    
        // Override the plain password with the hased one
        person.password = hashedPassword
        next()
    } catch (error) {
        return next(error)  
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    // RegisterTime => password -> password + salt -> genrate String1
    // LoginTime => newpassword + salt -> hash -> genrate String2
    // last => String2 == String1
    try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// Create Person Model
const Person = mongoose.model('Person', personSchema)

module.exports = Person;




// 🟢 Mongoose kya hai?
// -> Mongoose ek ODM (Object Data Modeling) library hai jo MongoDB aur Node.js ke beech ka bridge ka kaam karti hai.
// -> Matlab tum apne MongoDB ke data ko JavaScript objects ki tarah handle kar sakte ho.


// 🟢 MongoDB kya hai?
// -> MongoDB ek NoSQL database hai jisme data JSON (document) format me store hota hai.
// -> Lekin directly MongoDB driver use karne par queries likhna aur validation karna mushkil ho jata hai.

// 🟢 Mongoose ka kaam kya hai?
// -> Schema banane ka option deta hai
//    - Tum decide kar sakte ho ki ek document me kaunse fields honge aur unka type kya hoga. Isse tumhe data par structure aur validation milta hai.
// -> Validation easy ho jati hai
//    - Example: Agar email unique chahiye ya age number hi honi chahiye → Mongoose khud validate karega.
// -> Queries simplify kar deta hai
//    - Normal MongoDB driver me:
//      db.collection("users").find({ age: { $gt: 18 } });
//    - Mongoose me simple tarike se:
//      User.find({ age: { $gt: 18 } });
// -> Middleware aur Hooks support karta hai
//    - Jaise data save hone se pehle password ko encrypt karna.
// -> Relationship aur population
//    - Tum collections ko link kar sakte ho (jaise user ke posts).

// 🟢 Ham Mongoose kyu use karte hain?
// ✔ Data par control & structure chahiye.
// ✔ Validation & security chahiye.
// ✔ Queries ko easy & readable banana hai.
// ✔ Middleware hooks (password hash, audit logs) use karne hain.
// ✔ Production-level apps me code maintainable chahiye.

// 👉 Short me:
// MongoDB = Database
// Mongoose = Database ke upar ek helper library jo tumhe data handle karne me easy aur safe banati hai.