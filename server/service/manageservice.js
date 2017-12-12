const db = require('../dao/connect');

exports.allUsers = function (callback) {
  var sql = 'SELECT `userid`, `username` FROM `users`;'
  db.query(sql, callback);
};

exports.deleteUser = function (userid, callback) {
  var sql = 'DELETE FROM `users` WHERE `userid` = '+ userid +'';
  db.delete(sql, callback);
};

exports.editUser = function (userid, username, callback) {
  var sql = 'UPDATE `users` SET `username` ="'+ username +'" WHERE `userid` ='+ userid +'';
  db.update(sql, callback);
};
