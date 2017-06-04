var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/json", function(req, res) {
    Article.find({}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("Comments").exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;