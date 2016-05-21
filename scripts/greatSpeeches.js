var listOfGreatSpeeches = new Firebase("https://open-speeches.firebaseio.com/greatSpeeches");

$(document).ready(function() {
    var section = window.location;
    var section = section.toString().split("/")
    var section = section[section.length - 1].replace(".html", "");

    listOfGreatSpeeches.on("child_added", function(snapshot) {
        var speech = snapshot.val();
        if (speech.category == section) {
            //$(".post-list").append("<li><span class='post-meta'>" + speech.author + "</span><h2><a href='../../assets/" + speech.category + "/" + speech.path + ".mp4', target='_blank' class='post-link'>" + speech.title + "</h2></li>");
            $(".post-list").append("<li><span class='post-meta'>" + speech.author + "</span><h2><a class='post-link'>" + speech.title + "</h2></li>");
            $(".post-link:last").click(function() {
                page = window.open();
                page.document.write(
                    "<!DOCTYPE html><html><head>" +
                    "<script src='//code.jquery.com/jquery-1.11.3.min.js'></script>" + 
                    "<script src='//code.jquery.com/jquery-migrate-1.2.1.min.js'></script>" +
                    "<script src='https://cdn.firebase.com/js/client/2.4.2/firebase.js'></script>" + 
                    "<link rel='stylesheet', href='../stylesheets/main.css'>" + 
                    "</head><body>" + 
                    "<div class='page-content'></div>" + 
                    "<h1 id='speechPath'>../../assets/" + section + "/" + speech.path + ".mp4></h1>" + 
                    "<script src='../../../scripts/video.js'></scripts>" + 
                    "</body></html>"
                );
            });
        };
    });
});
