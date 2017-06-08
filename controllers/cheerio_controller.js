var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

//Router to scrape for data
router.get("/scrape", function(req, res) {
    // console.log("starting scrape");
    request("http://www.npr.org/", function(err, response, html) {
        var $ = cheerio.load(html);

        $(".story-text").each(function(i, element) {
            var result = {}
            //add type, title, link, teaser and image into result object
            result.type = $(this).children("h2").text();
            result.title = $(this).find("h1").text();
            result.link = $(this).children("a").attr("href");
            result.teaser = $(this).children("a").eq(1).text();
            result.image = $(this).parent().find("img").attr("src");
            // console.log("The title is..." + result.title);
            Article.findOne({ "title": result.title}, function(err, response) {
            	console.log("The response is....." + response);
            	if (response === null) {
            		//Inserts a new entry in Article collection
		            var entry = new Article(result);
		            //If the title and link is valid insert the entry.
		            if (result.title && result.link) {
		                entry.save(function(err, doc) {
		                    if (err) {
		                        console.log(err);
		                    } else {
		                        console.log(doc);
		                    }
		                });
		            }
            	} else {
            		console.log("Duplicate entry found");
            	}
            });

        });
    });
    //redirect back to the index page
    res.redirect("/");
});

module.exports = router;