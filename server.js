//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");

var app = express();
var PORT = 3000 || process.env.PORT;

app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Setting up Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Importing Routes
var nprScraped = require("./controllers/nprScraped_controller.js");

app.use("/", nprScraped);

//Running the server
app.listen(PORT, function() {
    console.log(`Server Running - Listening to Port ${PORT}`);
});