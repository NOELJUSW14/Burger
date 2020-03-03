// Import MySQL connection.
var connection = require('../config/connection')

function createQmarks(num) {
  var array = []
  for (var i = 0; i < num; i++) {
    array.push('?')
  }
  return array.toString()
}
function translateSql(obj) {
  var array = []
  for (var key in obj) {
    var value = obj[key]
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "'" + value + "'"
      }
      array.push(key + '=' + value)
    }
  }
  return array.toString()
}

var orm = {
  selectAll: function(table, cb) {
    var dbquery = 'SELECT * FROM ' + table + ';'

    connection.query(dbquery, function(err, res) {
      if (err) {
        console.log(err); 
      }
      cb(res)
    })
  },
  insertOne: function(table, cols, vals, cb) {
    var dbquery =
      'INSERT INTO ' +
      table +
      '(' +
      cols.toString() +
      ')' +
      'VALUES (' +
      createQmarks(vals.length) +
      ') '

    console.log(dbquery)
    connection.query(dbquery, vals, function(err, res) {
      if (err) {
        console.log(err); 
      }
      cb(res)
    })
  },
  updateOne: function(table, objColVals, condition, cb) {
    var dbquery =
      'UPDATE ' + 
      table + 
      ' SET ' + 
      translateSql(objColVals) + 
      ' WHERE ' + 
      condition;

    console.log(dbquery)

    connection.query(dbquery, function(err, res) {
      if (err) {
        console.log(err); 
      }
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    var dbquery = 'DELETE FROM ' + table + ' WHERE ' + condition;
    console.log(dbquery);

    connection.query(dbquery, function(err, res) {
      if (err) {
        console.log(err); 
      }
      cb(res);
    });
  }
};

module.exports = orm;
