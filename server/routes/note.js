const express = require('express');
const router = express.Router();
const noteservice = require('../service/noteservice');

router.post('/getAllNote', function (req, res, next) {
  var userid = req.body.userid;
  noteservice.getAllNote(userid, function (err, result) {
    res.send(result);
  })
})

router.post('/getNoteContent', function(req, res, next) {
  var nid = req.body.nid;
  noteservice.getNoteContent(nid, function (err, result) {
    var content = result[0].content;
    res.send(String(content));
  })
});

router.post('/addNote', function (req, res, next) {
  var ntitle = req.body.ntitle;
  var content = req.body.content;
  var nbid = req.body.nbid;
  var nbname = req.body.nbname;
  var userid = req.body.userid;
  noteservice.addNote(ntitle, content, nbid, nbname, userid, function (err) {
    if (err) {
      res.send('error');
    } else {
      res.send('success');
    }
  })
});

router.post('/changeNote', function (req, res, next) {
  var nid = req.body.nid;
  var ntitle = req.body.ntitle;
  var content = req.body.content;
  noteservice.changeNote(nid, ntitle, content, function (err) {
    if (err) {
      res.send('error');
    } else {
      res.send('success');
    }
  })
});

router.post('/deleteNote', function (req, res, next) {
  var nid = req.body.nid;
  noteservice.deleteNote(nid, function (err) {
    if (err) {
      res.send('error');
    } else {
      res.send('success');
    }
  })
});

router.post('/search', function (req, res, next) {
  var userid = req.body.userid;
  var token = req.body.token;
  noteservice.search(userid, token, function (err, result) {
    if (err) {
      res.send('error');
    } else {
      res.send(result);
    }
  })
});

module.exports = router;
