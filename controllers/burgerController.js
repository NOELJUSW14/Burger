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
    })
})
// Export routes for server.js to use.
module.exports = router;
