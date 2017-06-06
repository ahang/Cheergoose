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

router.get("/article-comment/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("comments").exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
});

router.post("/comment/:id", function(req, res) {
    //console.log(req.body);
    var newComment = new Comment(req.body);
    console.log(`The new comment is ${newComment}`);

    newComment.save(function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            Article.findOneAndUpdate({ "_id": req.params.id}, {$push:{ "comments": doc._id }})
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success!");
                    res.send(doc);
                }
            });
        }
    });
});

module.exports = router;