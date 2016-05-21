var listOfSpeeches = new Firebase("https://open-speeches.firebaseio.com/speeches");

$(document).ready(function() {
    $("#submitSpeech").click(function() {
        var speechTitle = $("#speechTitle").val();
        var speechText = $("#speechText").val();

        var authorName = $("#authorName").val();
        var authorName = authorName.toLowerCase().replace(" ", "-");

        var todayRaw = new Date()
        var todayRaw = todayRaw.toString();
        var today = todayRaw.toString();
        var today = today.split(" ")
        var today = today[1] + " " + today[2] + ", " + today[3]

        var categories = [];
        $(".tag:checked").each(function() {
            categories.push($(this).val());
        });

        console.log(speechTitle);
        console.log(speechText);
        console.log(authorName);
        console.log(categories);
        console.log(today);

        listOfSpeeches.once("value", function(snapshot) {
            numOfSpeeches = snapshot.numChildren();
            indexNum = numOfSpeeches + 1;

            listOfSpeeches.push({
                title: speechTitle,
                dateRaw: todayRaw,
                dateFormatted: today,
                text: speechText,
                author: authorName,
                categories: categories,
                index: indexNum,
            });
        });

        alert("sucess!");
    });
});
