var keystone = require('keystone');
var jwt = require('jsonwebtoken');
var express = require('express');
var cookieParser = require('cookie-parser');
var userData = keystone.list('User').model;
var app = express();
app.use(cookieParser());
exports = module.exports = async function(req, res) {
    console.log("User Email ", req.body.email);
    console.log("User Password ", req.body.password);
    try{
        let  user =  await userData.findOne({email:req.body.email});
        if(user) {
            user._.password.compare(req.body.password, function(err, isMatch) {
                if (!err && isMatch) {
                    var token = jwt.sign({email: user.email}, "codalien_key", {expiresIn: 1222220});
                    res.cookie("token", token);
                    res.send(true);
                }
                else res.send(false);
            });
           } else {
            res.send(false);
        }
    }
    catch(err) {
            console.log('Error -', err);
            res.send(false);
    }
}