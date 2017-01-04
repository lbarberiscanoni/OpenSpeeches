var listOfSpeeches = new Firebase("https://open-speeches.firebaseio.com/speeches");

$(document).ready(function() {
    var bro = window.location;
    var bro = bro.toString().split("/")[bro.toString().split("/").length - 1];
    var section = bro.replace(".html", "");

    //show speech function
    var showSpeech = function(a) {
        speechInfo = new Firebase(listOfSpeeches + "/" + a);
        speechInfo.on("value", function(snapshot) {
            var speech = snapshot.val();
            var page = window.open();
            page.document.write(
                "<!DOCTYPE html><html><head>" +
                "<script src='//code.jquery.com/jquery-1.11.3.min.js'></script>" + 
                "<script src='//code.jquery.com/jquery-migrate-1.2.1.min.js'></script>" +
                "<script src='https://cdn.firebase.com/js/client/2.4.2/firebase.js'></script>" + 
                "<link rel='stylesheet', href='../stylesheets/main.css'>" + 
                "</head><body>" + 
                "<h1 visibility='hidden' class='speechID' id='" + snapshot.key() + "'>" + speech.title + "</h1>" +
                "<div class='page-content'></div>" +
                "<script src='../scripts/showSpeech.js'></script>" + 
                "</body></html>" 
            );
        });
    };

    listOfSpeeches.once("value", function(snapshot) {
        var numOfSpeeches = snapshot.numChildren();

        if (section == "index") {
			listOfSpeeches.limitToLast(10).on("child_added", function(snapshot) {
				var speech = snapshot.val();
				var listOfCategories = speech.categories;
				$(".post-list").append("<li><span class='post-meta'>" + speech.dateFormatted + "</span><h2><button class='post-link' id='" + snapshot.key() + "'>" + speech.title + "</button></h2>");
				$(".post-link:last").click(function(event) {
					showSpeech($(this).attr("id"));
				});
			});
        } else {
			listOfSpeeches.orderByChild("index").on("child_added", function(snapshot) {
				var speech = snapshot.val();
				var listOfCategories = speech.categories;
				for (a = 0; a < listOfCategories.length; a++) {
					if (listOfCategories[a] == section) {
						$(".post-list").append("<li><span class='post-meta'>" + speech.dateFormatted + "</span><h2><button class='post-link' id='" + snapshot.key() + "'>" + speech.title + "</button></h2>");
						$(".post-link:last").click(function(event) {
							showSpeech($(this).attr("id"));
						});
					};
				};
			});
        };
    });
});
