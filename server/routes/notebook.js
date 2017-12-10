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

router.post('/addNotebook', function (req, res, next) {
  var nbname = req.body.nbname;
  var userid = req.body.userid;
  notebookservice.addNotebook(nbname, userid, function (err) {
    if (err) {
      res.send('error');
    } else {
      res.send('success');
    }
  })
});

router.post('/changeName', function (req, res, next) {
  var nbid = req.body.nbid;
  var nbname = req.body.nbname;
  notebookservice.changeName(nbid, nbname, function (err) {
    if (err) {
      res.send('error');
    } else {
      noteservice.changeName(nbid, nbname, function (err) {
        if (err) {
          res.send('error');
        } else {
          res.send('success');
        }
      })
    }
  })
});

router.post('/deleteNotebook', function (req, res, next) {
  var nbid = req.body.nbid;
  notebookservice.deleteNotebook(nbid, function (err) {
    if (err) {
      res.send('error');
    } else {
      noteservice.deleteAllNote(nbid, function (err) {
        if (err) {
          res.send('error');
        } else {
          res.send('success');
        }
      });
    }
  })
})

module.exports = router;
