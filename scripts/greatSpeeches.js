var listOfGreatSpeeches = new Firebase("https://open-speeches.firebaseio.com/greatSpeeches");

$(document).ready(function() {
    var section = window.location;
    var section = section.toString().split("/")
    var section = section[section.length - 1].replace(".html", "");

    listOfGreatSpeeches.on("child_added", function(snapshot) {
        var speech = snapshot.val();
        if (speech.category == section) {
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
					"<header class='site-header'><div class='wrapper'><a class='site-title' href='../index.html'>Open Speeches</a><nav class='site-nav'><a class='menu-icon'></a><div class='trigger'></div></nav></div></div>" + 
                    "<div class='page-content'>" + 
                    "<h1 id='speechPath'>" + speech.path.replace("_", " ") + "</h1>" + 
                    "<video controls src='../../assets/" + section + "/" + speech.path + ".mp4'></video></div>" + 
					"<footer class='site-footer'><div class='wrapper'><h2 class='footer-heading'>Open Speeches</h2><div class='footer-col-wrapper'><div class='footer-col footer-col-1'><ul class='contact-list'><li>Questions? Email met at:</li><li><a href='mailto:hllbck7@gmail.com'>hllbck7@gmail.com</a></li></ul></div><div class='footer-col footer-col-2'></div><div class='footer-col footer-col-3'><p class='text'>This site is a collection of all the congressional debate speeches for the RHS team to use for inspiration and learning. I highly encourage reusing as much as you can, but always remember that the strongest speeches are original, and by only using the ideas of others you limit yourself to the past while forfeiting an innovative future.</p></div></div></div></footer>" +
                    "</body></html>"
                );
            });
        };
    });
});
