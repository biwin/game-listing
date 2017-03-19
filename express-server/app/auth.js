const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const crypto = require('crypto');


function getSalt(len){
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0,len);
}

function hashPassword(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
}


function encryptPassword(userpassword) {
    var salt = getSalt(16);
    return hashPassword(userpassword, salt);
}

function decryptPassword(userpassword, storedSalt) {
    return hashPassword(userpassword, storedSalt);
}


var authUserSchema = new mongoose.Schema({
    email:  {type: String, index: {unique: true}},
    username: {type: String, index: {unique: true}},
    firstName: String,
    lastName: String,
    passwordHash: String,
    passwordSalt: String

});

const AuthUser = mongoose.model('AuthUser', authUserSchema);


function InitAdminUser(){
    var password = encryptPassword('admin');

    var adminUser = new AuthUser({
        email: 'admin@admin.com',
        username: 'admin',
        firstName: 'Administrator',
        lastName: '',
        passwordHash: password.passwordHash,
        passwordSalt: password.salt
    });

    adminUser.save(function (error) {
        if (!error){
            adminUser.save();
            console.log("Creating auth user");
        } else {
            console.log("Admin user already exists");
        }
    });
}

passport.use(new BasicStrategy(
    function(username, password, done) {
        AuthUser.findOne({username:username} ,
            function (error, user) {
                if (error){
                    console.log(error);
                    return done(error)
                } else {
                    if (!user){
                        console.log('Username is not Registered!');
                        return done(error)
                    } else {
                        var userSalt = user.passwordSalt;
                        var userHash = user.passwordHash;
                        var pass = decryptPassword(password, userSalt);

                        if (pass.passwordHash === userHash){
                            console.log(user.username + ' is authenticated!');
                            return done(null, user);
                        } else{
                            return done(error);
                        }
                    }
                }
            });
    }
));


var createNewUser = function(req, r) {

    AuthUser.findOne({'email': req.body.email}, function(err, res){
        if (!res) {
            AuthUser.findOne({'username': req.body.username}, function(err, res){
                if (!res) {
                    var password = encryptPassword(req.body.password);

                    var user = new AuthUser({
                        email: req.body.email,
                        username: req.body.username,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        passwordHash: password.passwordHash,
                        passwordSalt: password.salt
                    });

                    user.save(function(error){
                        if (error) res.status(200).json({message: "user cannot be created some other problems"});
                        r.status(201).json({
                            message: 'User created successfully'
                        });
                    });

                } else {
                    r.status(200).json({message: "user cannot be created username is taken"})
                }
            });
        } else {
            r.status(200).json({message: "user cannot be created email is taken"})
        }
    });

};


module.exports= {
    initAuth: InitAdminUser,
    encryptPassword: encryptPassword,
    authUser: AuthUser,
    createNewUser: createNewUser
};
