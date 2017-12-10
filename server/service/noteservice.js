const db = require('../dao/connect');

exports.getAllNote = function (userid, callback) {
  var sql = 'SELECT `nid`, `ntitle`, `nbid`, `nbname` FROM `notes` WHERE `userid` = "'+ userid +'";';
  db.query(sql, callback);
};

exports.getNoteContent = function (nid, callback) {
  var sql = 'SELECT `content` FROM `notes` WHERE `nid`= "' + nid + '";';
  db.query(sql, callback);
};

exports.addNote = function (ntitle, content, nbid, nbname, userid, callback) {
  var sql = 'INSERT INTO `notes`(`nid`, `ntitle`, `content`, `nbid`, `nbname`, `userid`) VALUES (null, "'+ ntitle +'", "'+ content +'", "' + nbid +'", "' + nbname +'", "' + userid + '");';
  db.insert(sql, callback);
};

exports.changeNote = function (nid, ntitle, content, callback) {
  var sql = 'UPDATE `notes` SET `ntitle` ="'+ ntitle +'", `content`="' + content+'" WHERE `nid` ='+ nid +'';
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

exports.changeName = function (nbid, nbname, callback) {
  var sql = 'UPDATE `notes` SET `nbname` = "'+ nbname +'" WHERE `nbid` = "'+ nbid +'";';
  db.update(sql, callback);
};
