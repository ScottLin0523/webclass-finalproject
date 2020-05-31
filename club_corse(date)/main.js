
$(document).ready(function(){
    setTable();

    $("#inputDate").change(function(){
        let inputDate=$(this).val();
        console.log(inputDate);
        let splitText=inputDate.split("-");
        console.log(splitText);
        setMonthAndDay(splitText[1],splitText[2]);
        setTable();
    });
    $("LABEL").text("第"+$("[type=range]").val()+"場次");
    $("[type=range]").change(function(){
        $("LABEL").text("第"+$("[type=range]").val()+"場次");
    });
    $("#inputtext").change(function(){
        topicsArray[$("[type=range]").val()-1]=$("#inputtext").val();
        setTable();
    })

});

function setTable(){
    $("#courseTable").empty();

    $("#courseTable").append(
        "<tr><th>場次</th><th>時間</th><th>主題</th></tr>"
    );

    let topicCount = topicsArray.length;

    let oneDayMillSeconds = 86400000;

    for(let i=0;i<topicCount;i++){
        let thisDate = new Date(startDate.getTime()+7*i*oneDayMillSeconds);
        let trSpecial="<tr>";
        if(topicsArray[i]=="不上課"){
            trSpecial="<tr style='background-color:lightyellow'>";
        }
        $("#courseTable").append(
            trSpecial+
            "<td>"+(i+1)+"</td>"+
            "<td>"+ thisDate.toLocaleDateString().slice(5) +"</td>"+
            "<td>"+topicsArray[i]+"</td>"+
            "</tr>"
        );
    }
}