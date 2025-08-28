const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const Person = require("./models/personSchema.js")

passport.use(new localStrategy(async (username, password, done) => {
    // Authentication logic here
    try {
        // console.log('Received credentials:', username,password);
        const user = await Person.findOne({username: username})
        if(!user){
            return done(null, false, {message: "Incorrect Usename."});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: "Incorret Password."})
        }
    } catch (error) {
        return done(error)
    }
}))

module.exports = passport;