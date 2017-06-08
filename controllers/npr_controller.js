var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

//Router to render the index page
router.get("/", function(req, res) {
    res.render("index");
});

//Router to find all articles and send the data to the front end
router.get("/json", function(req, res) {
    Article.find({}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

//Router to find all comments
router.get("/comments", function(req, res) {
    Comment.find({}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

//Router to show Articles & Linked comments
router.get("/article-comments", function(req, res) {
    Article.find({}).populate("comments")
    .exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
});

//Router to populate associated comments with the article
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

//Router to remove a comment from the Comment Collection and then pulling the comment id out of the Article comments array
router.get("/delete-comment/:id", function(req, res) {
    var commentId = req.params.id;
    Comment.findOneAndRemove({ "_id": req.params.id }, function(err, response) {
        if (err) throw err;
        Article.update({ "comments": req.params.id }, {$pull: {"comments": req.params.id }})
        .exec(function(err, doc) {
            if (err) throw err;
            res.json(doc);
        })
    });
});

//Router to save a comment. First to add the comment to the comment collection and then add the associating id to the comments array in Article.
router.post("/comment/:id", function(req, res) {
    //console.log(req.body);
    var newComment = new Comment(req.body);
    // console.log(`The new comment is ${newComment}`);

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