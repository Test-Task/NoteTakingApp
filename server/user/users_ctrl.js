var usersmodel = require('./users_model');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var jwt = require('jsonwebtoken');
var config = require('../../passport/config');
var transporter = nodemailer.createTransport(
    smtpTransport('smtps://viralcontentsystem@gmail.com:viral@123@smtp.gmail.com')
);

var mailOptions;

exports.loginUser = function (req, res) {
    console.log('Users login controller calling!');
    var post = req.body;
    console.log('Users controller calling before!');
    usersmodel.findOne({$or:[{ username: post.username}, { email: post.username}], password: post.password, isDeleted:false }, { _id: 1, email: 1, username: 1, status:1,first_name:1,last_name:1,location:1,image:1,aboutme:1,joined:1 }, function (err, users) {
        if (err) {
            throw err;
        } else {
            console.log('Users controller calling after!');
            if (users) {
                if (users.status == 1) {
                    var token = jwt.sign(users, config.secret);
                    res.json({ status: 200, message: 'You have logged in successfully', data: users, token: token });
                } else {
                    res.json({ status: 201, message: 'Sorry! your account is not activated yet.' });
                }
            } else {
                res.json({ status: 201, message: 'Username or password is not valid' });
            }
        }
    });
}

exports.registerUser = function (req, res) {
    var post = req.body;
    var d = new Date();
    console.log(post);
    req.checkBody('username', "Please enter username.").notEmpty();
    req.checkBody('password', "Password should be 6-20 Characters long").isLength(6, 20);
    req.checkBody('email', "Please enter a valid email address.").isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.json({ status: "202", message: errors[0].msg });
    } else {
        console.log('call register controller! before');
        var userdata = {
            username: post.username,
            password: post.password,
            email: post.email,
        };
        usersmodel.findOne({ $or:[{username: post.username}, {email: post.email}] }, function (err, users) {
            if (err) {
                throw err;
            } else {
                console.log('Users controller calling after!');
                if (users) {
                    if (users.username == post.username) {
                        res.json({ status: 201, message: 'Username already registered.' });
                    } else if (users.email == post.email) {
                        res.json({ status: 201, message: 'Email already registered.' });
                    }
                } else {
                    var recordData = new usersmodel(userdata);
                    // call the built-in save method to save to the database
                    recordData.save(function (err, usersdata) {
                        if (err){
                            console.log('in error',err)
                            res.json({ status: 201, message: err });                            
                        }else{
                            res.json({ status: 200, message: 'Successfully registered!' });                            
                            console.log('User saved successfully!' + usersdata._id);
                        // setup e-mail data with unicode symbols
                        
                    }

                    });
                }
            }
        });

    }


}


