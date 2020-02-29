var express = require("express");
var router = express.Router();
// Import the model (cat.js) to use its database functions.
var burger = require("../models/burgers");

router.get("/", function(req,res){
    burger.selectAll(function(data){
        var hdbrsObj = {
            burger: data
        };
        console.log(hdbrsObj);
        res.render("index", hdbrsObj);
    });
    
    router.put("/api/burgers/:id", function(req,res){
        var query = "id = " + req.params.id;

        console.log("query", query);
        burger.updateOne({devoured: req.body.devoured}, query, function(result){
            if (result.changedRows === 0){
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        })
    });
    
    router.delete("/api/burgers/:id", function(req,res){
        var query = "id = " +req.params.id;
        console.log("query", query);
        burger.deleteOne(query, function(res){
            if(result.changedRows === 0){
                return res.status(404).end();
            } else{
                res.status(200).end()
            }
        } )
    })

    router.post("/api/burgers", function(req, res){
        burger.insertOne(
           ["burger_name", "devoured"],
           [req.body.burger_name, req.body.devoured],
           function(result){
               res.json({ id: result.insertId});
           } 
        )
    })
})
// Export routes for server.js to use.
module.exports = router;
