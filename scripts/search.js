var listOfSpeeches = new Firebase("https://open-speeches.firebaseio.com/speeches");

$(document).ready(function() {
    var options = {
        valueNames: ["title", "author", "categories"],
    };
    var values = [];
    window.entryList = new List("container_list", options, values);

    var speechList = [];
    listOfSpeeches.on("value", function(snapshot) {
        var numOfSpeeches = snapshot.numChildren();

        var i = 0
        listOfSpeeches.on("child_added", function(snapshot) {
            speechList.push(snapshot.val());
            i += 1;
            if (i == numOfSpeeches) {
                console.log(speechList);
                for (var a = 0; a < speechList.length; a++) {
                    entryList.add({ "title": speechList[a].title, "author": speechList[a].author, "categories": speechList[a].categories });
                };
            };
        }.bind(this));
    });
    
    //show speech function
    var showSpeech2 = function(a) {
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
});
