// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 8889,
  user: "root",
  password: "root",
  database: "burgers_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else{
    console.log("connected as id " + connection.threadId);
  }
});

// Export connection for our ORM to use.
module.exports = connection;