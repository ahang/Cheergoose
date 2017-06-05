var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trime: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    teaser: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;