$(document).ready(function() {
    //adding the nav bar
    listOfPages = [["speech_submission", "Speech Submission"], ["explanation", "Congress Explanation"], ["rules", "Rules"], ["principles_and_theories", "Principles and Theories"], ["kritiks", "Types of Kritiks"], ["conlaw", "Constiutional Law"], ["domestic", "Domestic Issues"], ["foreign", "Foreign Policy"], ["econ", "Economics"], ["philosophical", "Philosophical"], ["counterplans", "Counterplans"], ["tutorials", "Tutorials"], ["greatSpeeches", "Great Speeches"], ["search", "Search"]];

    $("body").prepend("<header class='site-header'><div class='wrapper'><a class='site-title' href='../index.html'>Open Speeches</a><nav class='site-nav'><a class='menu-icon'></a><div class='trigger'></div></nav></div></div>");

    for (i = 0; i < listOfPages.length; i++) {
        pageLink = listOfPages[i];
        $(".trigger").append("<a href='../views/" + pageLink[0] + ".html' class='page-link'>" + pageLink[1] + "</a>");
    };

    //adding footer
    $("body").append("<footer class='site-footer'><div class='wrapper'><h2 class='footer-heading'>Open Speeches</h2><div class='footer-col-wrapper'><div class='footer-col footer-col-1'><ul class='contact-list'><li>Questions? Email met at:</li><li><a href='mailto:hllbck7@gmail.com'>hllbck7@gmail.com</a></li></ul></div><div class='footer-col footer-col-2'></div><div class='footer-col footer-col-3'><p class='text'>This site is a collection of all the congressional debate speeches for the RHS team to use for inspiration and learning. I highly encourage reusing as much as you can, but always remember that the strongest speeches are original, and by only using the ideas of others you limit yourself to the past while forfeiting an innovative future.</p></div></div></div></footer>");
});
