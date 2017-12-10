const db = require('../dao/connect');

exports.getNotebook = function (userid, callback) {
  var sql = 'SELECT `nbid`, `nbname` FROM `notebooks` WHERE `userid` = "'+ userid +'";';
  db.query(sql, callback);
};

exports.addNotebook = function (nbname, userid, callback) {
  var sql = 'INSERT INTO `notebooks`(`nbid`, `nbname`, `userid`) VALUES (null, "'+ nbname +'", "'+ userid +'");';
  db.insert(sql, callback);
};

exports.changeName = function (nbid, nbname, callback) {
  var sql = 'UPDATE `notebooks` SET `nbname` = "'+ nbname +'" WHERE `nbid` = "'+ nbid +'";';
  db.update(sql, callback);
};

exports.deleteNotebook = function (nbid, callback) {
  var sql = 'DELETE FROM `notebooks` WHERE `nbid` = "'+ nbid +'"';
  db.delete(sql, callback);
};
