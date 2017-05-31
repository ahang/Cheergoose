console.log(`App.js is loaded`);

function getData() {
    // $(".nprResult").empty();
    $.getJSON("/json", function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $(".table").prepend(`
                <tr>
                    <td class="dataGenre"> ${data[i].type} </td>
                    <td><a href="${data[i].link}">${data[i].title}</a></td>
                    <td> ${data[i].teaser}</td>
                    <td>
                        <a class="btn btn-danger btn-lg btn-block notes" data-target="#${data[i]._id}" data-toggle="modal" type="button" role="button"><span class="glyphicon" aria-hidden="true"></span>View Notes</span></a>
                    </td>
                </tr>`
            );
        }
    });
}


getData();