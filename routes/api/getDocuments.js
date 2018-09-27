var keystone = require('keystone');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
app.use(cookieParser());

var objData = keystone.list('toDoTask').model;
exports = module.exports = async function(req, res) {
    var allData = objData.find();
    var getToken = req.cookies['token'];
    jwt.verify(getToken, 'codalien_key', async function(err, decode) {
        if (err) {
            throw err;
        }
        else {
            var output = await objData.find({});
            console.log(output);
            res.send(output);
        }
    });
    /*
    jwt.verify(getToken, 'codalien_key', function(err, decode) {
        if (err) {
            console.log("Error occured  ", err);
        }
        else {
            var res = objData.find({email: decode.email});
            console.log(res);
            //res.send("Correct Data");
        }
        res.send("WRONG");
    });
    */
    //res.send(getToken);
}