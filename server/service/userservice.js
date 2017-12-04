const db = require('../dao/connect');

exports.checkUser = function (userid, password, callback) {
  var sql = 'SELECT `password` FROM `users` WHERE `userid`= "' + userid + '";';
  db.query(sql, callback);
};

exports.addUser = function (username, password, callback) {
  var sql = 'INSERT INTO `users`(`userid`, `username`, `password`) VALUES (null, "'+ username +'", "'+ password +'");';
  db.insert(sql, callback);
};

exports.findUser = function (username, callback) {
  var sql = 'SELECT `userid` FROM `users` WHERE `username`= "' + username + '";';
  db.query(sql, callback);
};

exports.changeUser = function (userid, username, password, callback) {
  var sql = 'UPDATE `users` SET `username` ="'+ username +'", `password`="' + password+'" WHERE `userid` ='+ userid +'';
  db.update(sql, callback);
};
