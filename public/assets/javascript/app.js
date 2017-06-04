console.log(`App.js is loaded`);

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
                        <a class="btn btn-danger btn-lg btn-block note-modal" data-target="#${data[i]._id}" data-toggle="modal" type="button" role="button"><span class="glyphicon" aria-hidden="true"></span>View Notes</span></a>
                    </td>
                </tr>`
            );
        }
    });
}

getData();

$(document).on("click", ".note-modal", function() {
    $.getJSON("/json", function(data) {
        console.log("click");
        for (var i = 0; i < data.length; i++) {
            console.log("Begin");
                var modals = (`
                <div class="modal" id="${data[i]._id}" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title"><h4>${data[i].title}</h4></h4>
                            </div>
                            <div class="modal-body">
                                <p></p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        $(".modals").append(modals);
        }

     });
});