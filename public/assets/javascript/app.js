// console.log(`App.js is loaded`);
$(document).ready(function() {
    //Function to get the data and append each data to a table row
    function getData() {
        $(".dataRow").empty();
        $.getJSON("/json", function(data) {
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                // console.log("looping..");
                $(".table").prepend(`
                    <tr class="dataRow">
                        <td class="dataGenre"> ${data[i].type} </td>
                        <td class="dataTitle">${data[i].title}</td>
                        <td>
                            <a class="btn btn-danger btn-lg btn-block note-modal" data-target="#comment-modal" data-id="${data[i]._id}" data-toggle="modal" type="button" role="button"><span class="glyphicon" aria-hidden="true"></span>Read All About It</span></a>
                        </td>
                    </tr>`
                );
            }
        });
    }
    //Added event listener to append the article information and data onto a specific modal by grabbing the data-id as an attr.
    $(document).on("click", ".note-modal", function() {
        emptyModal();
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: `/article-comment/${thisId}`
        })
        .done(function(data) {
            // console.log(data);
            $(".title").append(data.title);
            if (data.image) {
                $(".image-view").append(`<img src="${data.image}" class-"img img-responsive">`);
            } else {
                $(".image-view").empty();
            }
            $(".snippet-view").append(`<p class="snippet-text">${data.teaser}</p>`);
            $(".snippet-view").append(`<p><a href="${data.link}">Read more about it</a></p>`);
            $(".add-comments").append(`<input id="comment-input" name="comment" placeholder="Insert a Comment"></input>`);
            $(".add-comments").append(`<button data-id="${data._id}" id="save-comment">Save Comment</button>`);

            // console.log(`The data comments is ${data.comments}`);
            // console.log(`These are the data sets available in data - ${data}`);
            //If there are comments append all the comments and the date it was posted.
            if (data.comments) {
                $(".view-comments").append("<h4>Comments</h4>");
                for(var i = 0; i < data.comments.length; i++) {
                    var dateConvert = data.comments[i].date;
                    // console.log(dateConvert);
                    dateConvert = new Date();
                    // console.log(dateConvert);
                    var stringDate = dateConvert.toDateString();
                    // console.log(dateConvert);
                    $(".view-comments").append(`
                        <div class="comment-box">
                            Posted on ${stringDate}
                            <p class="comment-description" data-id="${data.comments[i]._id}">${data.comments[i].comment}</p><button class="btn btn-danger remove-comment">X</span>
                        </div>`);
                }
            }
        });
    });

    //Added event listener when someone clicks on save comment to make an AJAX call and post the data
    $(document).on("click", "#save-comment", function() {
        var thisId = $(this).attr("data-id");
        // console.log("This Id is " + thisId);
        // console.log($("#comment-input").val());
        // console.log("The Comment is " + $(`#comment-input-${thisId}`).val());
        $.ajax({
            method: "POST",
            url: `/comment/${thisId}`,
            data: {
                comment: $("#comment-input").val()
            }
        }).done(function(data) {
            $("#comment-input").val("");
            $("#comment-modal").modal("toggle");
        });

    });
    //Added event listener for scrape-button to scrape npr if clicked on
    $(document).on("click", ".scrape-btn", function() {
        $.ajax({
            method: "GET",
            url: `/scrape`
        }).done(function(data) {
            window.location.reload(true);
        });
    });

    //added event listener to remove a specific comment
    $(document).on("click", ".remove-comment", function() {
        // console.log("Click");
        var thisId = $(this).parent();
        // console.log("Comment ID is " + thisId.find("p").attr("data-id"));
        $.ajax({
            type: "GET",
            url: `/delete-comment/${thisId.find("p").attr("data-id")}`,
            success: function(response) {
                thisId.remove();
            }
        })

    })

    getData();
});
//empty modal functions on each load to prevent data duplication
function emptyModal() {
    $(".add-comments").empty();
    $(".view-comments").empty();
    $(".title").empty();
    $(".snippet-view").empty();
    $(".image-view").empty();
}