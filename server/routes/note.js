const express = require('express');
const router = express.Router();
const noteservice = require('../service/noteservice');

router.get('/getNoteContent', function(req, res, next) {
  var nid = req.body.nid;
  noteservice.getNoteContent(nid, function (err, result) {
    var content = result[0].content;
    res.send(String(content));
  })
});

router.get('/addNote', function (req, res, next) {
  var title = req.body.title;
  var content = req.bidy.content;
  var nbid = req.body.nbid;
  noteservice.addNote(title, content, nbid, function (err) {
    res.send('success');
  })
});

router.get('/changeNote', function (req, res, next) {
  var nid = req.body.nid;
  var title = req.body.title;
  var content = req.bidy.content;
  noteservice.changeNote(nid, title, content, function (err) {
    res.send('success');
  })
});

router.get('/deleteNote', function (req, res, next) {
  var nid = req.body.nid;
  noteservice.deleteNote(nid, function (err) {
    res.send('success');
  })
});

module.exports = router;
