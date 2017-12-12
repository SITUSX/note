const express = require('express');
const router = express.Router();
const manageservice = require('../service/manageservice');
const MANAGE_PASSWORD = '123456';

router.post('/login', function(req, res, next) {
  var password = req.body.password;
  if (password == MANAGE_PASSWORD) {
    res.send('success');
  } else {
    res.send('err');
  }
});

router.get('/allUsers', function (req, res, next) {
  manageservice.allUsers(function (err, result) {
    if (err) {
      res.send('err');
    } else {
      res.send(result);
    }
  })
});

router.post('/deleteUser', function (req, res, next) {
  var userid = req.body.userid;
  manageservice.deleteUser(userid, function (err) {
    if (err) {
      res.send('err');
    } else {
      res.send('success');
    }
  })
});

router.post('/editUser', function (req, res, next) {
  var userid = req.body.userid;
  var username = req.body.username;
  manageservice.editUser(userid, username, function (err) {
    if (err) {
      res.send('err');
    } else {
      res.send('success');
    }
  })
})

module.exports = router;
