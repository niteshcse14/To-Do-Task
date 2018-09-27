var keystone = require('keystone');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
app.use(cookieParser());

var objData = keystone.list('toDoTask').model;
exports = module.exports = function(req, res) {
    var task = req.body.taskname;
    var time = new Date(Date.now()).toLocaleString();

    console.log("task is   ", task);
    console.log("time is    ", time);

    var getToken = req.cookies['token'];
    jwt.verify(getToken, 'codalien_key', function(err, decode) {
        if (err) {
            console.log("Error Occured  ", err);
        }
        else {
            var tempObj = {email: decode.email, task: task, time: new Date().toLocaleString()};
            console.log(tempObj);
            var objectData = new objData(tempObj);
            objectData.save(function(err) {
                if (err) {
                    console.log("Error occured");
                    throw err;
                }
                res.send("Data Inserted");
            });
        }
    });
} 