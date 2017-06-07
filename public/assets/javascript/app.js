console.log(`App.js is loaded`);
$(document).ready(function() {
    var title;
    function getData() {
        // $(".nprResult").empty();
        $.getJSON("/json", function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                console.log("looping..");
                $(".table").prepend(`
                    <tr class="dataRow">
                        <td class="dataGenre"> ${data[i].type} </td>
                        <td>${data[i].title}</td>
                        <td>
                            <a class="btn btn-danger btn-lg btn-block note-modal" data-target="#myModal" data-id="${data[i]._id}" data-toggle="modal" type="button" role="button"><span class="glyphicon" aria-hidden="true"></span>Read All About It</span></a>
                        </td>
                    </tr>`
                );
            }
        });
    }

    $(document).on("click", ".note-modal", function() {
        emptyModal();
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: `/article-comment/${thisId}`
        })
        .done(function(data) {
            console.log(data);
            $(".title").append(data.title);
            if (data.image) {
                $(".image-view").append(`<img src="${data.image}" class-"img img-responsive">`);
            } else {
                $(".image-view").empty();
            }
            $(".snippet-view").append(data.teaser);
            $(".snippet-view").append(`<p><a href="${data.link}">Read more about it</a></p>`);
            $(".add-comments").append(`<input id="comment-input" name="comment" placeholder="Insert a Comment"></input>`);
            $(".add-comments").append(`<button data-id="${data._id}" id="save-comment">Save Comment</button>`);

            // console.log(`The data comments is ${data.comments}`);
            // console.log(`These are the data sets available in data - ${data}`);

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
            console.log(data);
        });

    });

    $(document).on("click", ".scrape-btn", function() {
        window.location.href = "/scrape";
    });

    $(document).on("click", ".remove-comment", function() {
        // console.log("Click");
        var thisId = $(this).parent();
        console.log("Comment ID is " + thisId.find("p").attr("data-id"));
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

function emptyModal() {
    $(".add-comments").empty();
    $(".view-comments").empty();
    $(".title").empty();
    $(".snippet-view").empty();
    $(".image-view").empty();
}