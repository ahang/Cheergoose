var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

router.get("/scrape", function(req, res) {
    request("http://www.npr.org/", function(err, response, html) {
        var $ = cheerio.load(html);

        $(".story-text").each(function(i, element) {
            var result = {}
            result.type = $(this).children("h2").text();
            result.title = $(this).find("h1").text();
            result.link = $(this).children("a").attr("href");
            result.teaser = $(this).children("a").eq(1).text();

            var entry = new Article(result);

            if (result.title && result.link) {
                entry.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                });
            }
        });
    });
    res.send(`Scrape Completed`);
});

module.exports = router;