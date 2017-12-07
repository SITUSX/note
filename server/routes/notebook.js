const express = require('express');
const router = express.Router();
const noteservice = require('../service/noteservice');
const notebookservice = require('../service/notebookservice');

router.post('/getNotebook', function (req, res, next) {
  var userid = req.body.userid;
  notebookservice.getNotebook(userid, function (err, result) {
    if (err) {
      res.send('error');
    } else {
      res.send(result);
    }
  })
});

router.get('/addNotebook', function (req, res, next) {
  var name = req.body.name;
  var userid = req.body.userid;
  notebookservice.addNotebook(name, userid, function (err) {
    res.send('success');
  })
});

router.get('/changeName', function (req, res, next) {
  var nbid = req.body.nbid;
  var name = req.body.name;
  notebookservice.changeName(nbid, name, function (err) {
    if (err) {
      res.send('error');
    } else {
      res.send('change name success');
    }
  })
});

router.get('/deleteNotebook', function (req, res, next) {
  var nbid = req.body.nbid;
  notebookservice.deleteNotebook(nbid, function (err) {
    if (err) {
      res.send('error');
    } else {
      noteservice.deleteAllNote(nbid, function (err) {
        if (err) {
          res.send('error');
        } else {
          res.send('all success');
        }
      });
    }
  })
})

module.exports = router;
