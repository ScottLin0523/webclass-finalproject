/*
window.onload=function(){
    document.write("Hello Js");
}*/

$(document).ready(function(){
    $("input").click(function(){
       
        let numOfListItem = $("#choices li").length;
        let randomnum = Math.floor(Math.random()*numOfListItem);
        $("#random").text($("#choices li").eq(randomnum).text());
        $("#random-pic").attr("src",picture[randomnum]);
    });
});