var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

//DB config
var databaseUrl = "npr";
var collections = ["nprNews"];

//Hooking mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log(`Database Error: ${error}`);
});

router.get("/scrape", function(req, res) {
    request("http://www.npr.org/", function(err, response, html) {
        var $ = cheerio.load(html);

        $(".story-text").each(function(i, element) {
            var type = $(this).children("h2").text();
            var title = $(this).children("a").text();
            var link = $(this).children("a").attr("href");
            var teaser = $(this).children("a").eq(1).text();

            if (title && link) {
                db.nprNews.save({
                    title: title,
                    link: link,
                    type: type,
                    teaser: teaser
                }, function(err, saved) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(saved);
                    }
                });
            }
        });
    });
    res.send(`Scrape Completed`);
});

module.exports = router;