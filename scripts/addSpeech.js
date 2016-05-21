var listOfSpeeches = new Firebase("https://open-speeches.firebaseio.com/greatSpeeches");

$(document).ready(function() {
    $("#submit").click(function() {
        var title = $("#title").val();
        var author = $("#author").val();
        var category = $("#category").val();
        var path = $("#path").val();

        listOfSpeeches.push({
            title: title,
            author: author,
            category: category,
            path: path,
        });
    });
});
