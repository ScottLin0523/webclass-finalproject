$(document).ready(function(){
    console.log($("[type=range]").val());
    for(let i=0;i<30;i++){
        answers.push(0);
    }
    $("LABEL").text($("[type=range]").val()+" "+fiveIndex[$("[type=range]").val()-1]);
    $("[type=range]").change(function(){
        $("LABEL").text($("[type=range]").val()+" "+fiveIndex[$("[type=range]").val()-1]);
    })
    let currrentQuiz=null;
    $("#nextButton").click(function(){
        if(currrentQuiz==null){
            currrentQuiz=0;
            $("[type=range]").attr("style","display='block'");
            $("LABEL").attr("style","display='block'");
            $("#question").empty();
            $("#question").append("<h2>"+ questions[0] +"</h2>");
            $("#nextButton").attr("value","Next");
            
        }
        else{
            answers[currrentQuiz]=parseInt($("[type=range]").val());
            currrentQuiz++;
            $("#question").empty();
            if(currrentQuiz<30){
                $("#question").append("<h2>"+ questions[currrentQuiz] +"</h2>");
            }
            else{
                let allScores=[
                    {"Char":"老虎", "Score":answers[4]+answers[9]+answers[13]+answers[17]+answers[23]+answers[29]},
                    {"Char":"孔雀", "Score":answers[2]+answers[5]+answers[12]+answers[19]+answers[21]+answers[28]},
                    {"Char":"無尾熊", "Score":answers[1]+answers[7]+answers[14]+answers[16]+answers[24]+answers[27]},
                    {"Char":"貓頭鷹", "Score":answers[0]+answers[6]+answers[10]+answers[15]+answers[20]+answers[25]},
                    {"Char":"變色龍", "Score":answers[3]+answers[8]+answers[11]+answers[18]+answers[22]+answers[26]}
                  ];
                  allScores.sort(function(a, b) {
                    return b.Score - a.Score;
                  });
                for(let i=0;i<allScores.length;i++){
                    $("#question").append(
                        "<h2>"+ allScores[i].Char+':'+allScores[i].Score+"</h2>"
                    );
                    currrentQuiz=null;
                    $("#nextButton").attr("value","start");
                    $("[type=range]").attr("style","display: none;");
                    $("LABEL").attr("style","display: none;");
                }
            }
        }
    });
});