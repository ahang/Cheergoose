//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var Article = require("./models/Article.js");
var Comment = require("./models/Comment.js");

var app = express();
var PORT = process.env.PORT || 3000;

//Static public
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Mongoose stuff and establishing connection
var uristring = process.env.MONGODB_URI || "mongodb://localhost/npr";

mongoose.Promise = Promise;
mongoose.connect(uristring);
var db = mongoose.connection;

db.on("error", function(error) {
    console.log(`Moongose Error: ${error}`);
});

db.once("open", function() {
    console.log("Mongoose connection active.");
});

//Setting up Handlebars
var exphbs = require("express-handlebars");

var hbs = exphbs.create({
    defaultLayout: "main",
    partialsDir: ["views/partials/"]
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Importing Routes
var npr = require("./controllers/npr_controller.js");
var cheerio = require("./controllers/cheerio_controller.js");

app.use("/", npr);
app.use("/", cheerio);

//Running the server
app.listen(PORT, function() {
    console.log(`Server Running - Listening to Port ${PORT}`);
});