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
                    <tr>
                        <td class="dataGenre"> ${data[i].type} </td>
                        <td><a href="${data[i].link}">${data[i].title}</a></td>
                        <td> ${data[i].teaser}</td>
                        <td>
                            <a class="btn btn-danger btn-lg btn-block note-modal" data-target="#myModal" data-id="${data[i]._id}" data-toggle="modal" type="button" role="button"><span class="glyphicon" aria-hidden="true"></span>View Comments</span></a>
                        </td>
                    </tr>`
                );
            }
        });
    }

    $(document).on("click", ".note-modal", function() {
        $(".add-comments").empty();
        $(".title").empty();
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: `/article-comment/${thisId}`
        })
        .done(function(data) {
            console.log(data);
            $(".title").append(data.title);
            $(".add-comments").append(`<input id="comment-input" name="comment"></input>`);
            $(".add-comments").append(`<button data-id="${data._id}" id="save-comment">Save Comment</button>`);

            if(data.comments) {
                $(".view-comments").empty();
                for(var i = 0; i < data.comments.length; i++) {
                    $(".view-comments").append(`<p>${data.comments[i]}</p>`);
                }
            }
        });
    });

    $(document).on("click", "#save-comment", function() {
        var thisId = $(this).attr("data-id");
        console.log("This Id is " + thisId);
        console.log($("#comment-input").val());
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

    getData();
});