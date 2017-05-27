//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var app = express();
var PORT = 3000 || process.env.PORT;

//DB config
var databaseUrl = "scrapper";
var collections = ["scrapedData"];

//Hooking mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log(`Database Error: ${error}`);
});

//Setting up Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



app.listen(PORT, function() {
    console.log(`Server Running - Listening to Port ${PORT}`);
});