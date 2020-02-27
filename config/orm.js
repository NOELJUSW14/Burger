// Import MySQL connection.
var connection = require("./connection");

function createQmarks(num){
    var array = [];
    for (var i =0; i < num; i++){
        array.push("?");
    }
    return array.toString()
};
function translateSql(obj){
    var array = [];
    for (var key in ob){
        var value = ob[key];
        if(Object.hasOwnProperty.call(ob, key)){
            if(typeof value === "string" && value.indexOf(" ") >= 0){
                value = "`" + value + "`";
            }
            array.push( key + "=" + value);
        }
    }
    return array.toString()
}
var orm = {
    selectAll: function(table, cb){
        var dbquery =  
        "SELECT * FROM" + 
        table + 
        ";";
        connection.query(dbquery, function(err, res){
            if (err){
                console.log(err);
            } else{
                return{
                    cb(res);
                }
            }
        })
    },
    insertOne: function(table, cols, vals, cb){
        var dbquery = 
        "INSERT INTO" + 
        table + 
        "(" + 
        cols.toString() + 
        ") " + 
        "VALUES (" + 
        createQmarks(vals.length) + 
        ") ";

        console.log(dbquery);
        connection.query(dbquery, function(err, res){
            if (err){
                console.log(err);
            } else{
                return{
                    cb(res);
                }
            }
        }
    },
    updateOne: function(table, objColVals, condition, cb){
    var dbquery =
    "UPDATE" + 
    table + 
    "SET" + 
    translateSql(objColVals) + 
    "WHERE" + condition;
    console.log(dbquery);
        connection.query(dbquery, function(err, res){
            if (err){
                console.log(err);
            } else{
                return{
                    cb(res);
                }
            }
        }
    },
    deleteOne: function(table, condition, cb){
        var dbquery =
        "DELETE FROM" +
        table +
        "WHERE" +
        condition;
        connection.query(dbquery, function(err, res){
            if (err){
                console.log(err);
            } else{
                return{
                    cb(res);
                }
            }
        }

    }
}