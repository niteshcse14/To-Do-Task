var keystone = require('keystone');
var jwt = require('jsonwebtoken');
var  UserData = keystone.list('User').model;
exports = module.exports = function (req, res) {
    console.log("Called");
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    var obj = {name: req.body.name, email: req.body.email, password:req.body.password};
    let user = new UserData(obj);
    user.save(function(err) {
        if (err) {
            console.log("Error occured");
            throw err;
            res.send(false);
        }
        var token = jwt.sign({email: req.body.email}, "codalien_key", {expiresIn: 1222220});
        res.cookie("token", token);
        console.log("Inserted user" , user);
        res.send(true);
    });
}