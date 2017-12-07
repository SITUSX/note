const express = require('express');
const router = express.Router();
const userservice = require('../service/userservice');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var userid = req.body.userid;
  var inputPassword = req.body.password;
  userservice.checkUser(userid, inputPassword, function (err, result) {
    if (String(result)=="") {
      res.send("no");
    } else if (inputPassword!=String(result[0].password)) {
      res.send("passwrong");
    } else {
      res.send(String(result[0].username));
    }
  })
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  userservice.addUser(username, password, function (err) {
    if (err) {
      res.send("exist");
    } else {
      userservice.findUser(username, function (err, result) {
        var userid = result[0].userid;
        res.send(String(userid));
      })
    }
  })
});

router.post('/change', function(req, res, next) {
  var userid = req.body.userid;
  var username = req.body.username;
  var password = req.body.password;
  userservice.changeUser(userid, username, password, function (err) {
    if (err) {
      res.send("fail");
    } else {
      res.send("success");
    }
  })
});

module.exports = router;
