const db = require('../dao/connect');

exports.getNoteContent = function (nid, callback) {
  var sql = 'SELECT `content` FROM `notes` WHERE `nid`= "' + nid + '";';
  db.query(sql, callback);
};

exports.addNote = function (title, content, nbid, callback) {
  var sql = 'INSERT INTO `notes`(`nid`, `ntitle`, `content`, `nbid`) VALUES (null, "'+ title +'", "'+ content +'", "' + nbid +'");';
  db.insert(sql, callback);
};

exports.changeNote = function (nid, title, content, callback) {
  var sql = 'UPDATE `notes` SET `ntitle` ="'+ title +'", `content`="' + content+'" WHERE `nid` ='+ nid +'';
  db.update(sql, callback);
};

exports.deleteNote = function (nid, callback) {
  var sql = 'DELETE FROM `notes` WHERE `nid` = '+ nid +'';
  db.delete(sql, callback);
};

exports.deleteAllNote = function (nbid, callback) {
  var sql = 'DELETE FROM `notes` WHERE `nbid` = '+ nbid +'';
  db.delete(sql, callback);
};
