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
                </tr>`
            );
        }
    });
}

getData();