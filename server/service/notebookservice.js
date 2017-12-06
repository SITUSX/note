const db = require('../dao/connect');

exports.addNotebook = function (name, userid, callback) {
  var sql = 'INSERT INTO `notebooks`(`nbid`, `nbname`, `userid`) VALUES (null, "'+ name +'", "'+ userid +'");';
  db.insert(sql, callback);
};

exports.changeName = function (nbid, name, callback) {
  var sql = 'UPDATE `notebooks` SET `nbname` = "'+ name +'" WHERE `nbid` = "'+ nbid +'";';
  db.update(sql, callback);
};

exports.deleteNotebook = function (nbid, callback) {
  var sql = 'DELETE FROM `notebooks` WHERE `nbid` = "'+ nbid +'"';
  db.delete(sql, callback);
}
