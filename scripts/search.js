var listOfSpeeches = new Firebase("https://open-speeches.firebaseio.com/speeches");

$(document).ready(function() {
    var options = {
        valueNames: ["title", "author", "categories"]
    };

    var entryList = new List("entry-list", options);

    speechList = [];
    listOfSpeeches.on("value", function(snapshot) {
        numOfSpeeches = snapshot.numChildren();

        i = 0
        listOfSpeeches.on("child_added", function(snapshot) {
            speechList.push(snapshot.val());
            i += 1;
            if (i == numOfSpeeches) {
                console.log(speechList);
                for (a = 0; a < speechList.length; a++) {
                    entryList.add(speechList[a]);
                };
            };
        });
    });
});
