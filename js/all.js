/* global $ */
function SubmitInfo() {
    var name = $(":text[id=papername]").val();
    var author = $(":text[id=paperauthor]").val();
        if(name!=""&&author!="") {
           $("form").submit();
           //window.location.href=("/");
        }else {
            alert("快说你错了！！")
        }
}

function Show() {
    window.location.href=("/list.html");
}