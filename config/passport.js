const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer = require('../schemas/customer_schema');

// hashing functionality via bcrypt (https://www.npmjs.com/package/bcrypt)
const bcrypt = require('bcrypt');

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
    Customer.findOne({ Username: username })
        .then((user) =>{
            if(!user){
                return done(null, false);
            }
            bcrypt.compare(password, user.Hashed_Password, function(err, isMatch) {
                if(isMatch){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            });
        })
        .catch((err) => {
            done(err);
        });
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);