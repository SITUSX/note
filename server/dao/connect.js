const sqlite3 = require('sqlite3');

exports.query = function(sql, callback) {
  var db = new sqlite3.Database('./database/note.db');
  db.all(sql, function(err, result) {
    db.close();
    callback(err, result);
  });
}

exports.insert = function (sql, callback) {
  var db = new sqlite3.Database('./database/note.db');
  db.run(sql, function(err) {
    db.close();
    callback(err);
  });
}

exports.update = function (sql, callback) {
  var db = new sqlite3.Database('./database/note.db');
  db.run(sql, function(err) {
    db.close();
    callback(err);
  });
}

exports.delete = function (sql, callback) {
  var db = new sqlite3.Database('./database/note.db');
  db.run(sql, function(err) {
    db.close();
    callback(err);
  });
}
