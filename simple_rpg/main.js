let mapArray,ctx,currentImgMainX,currentImgMainY;
let imgMountain,imgMain,imgEnemy;

$(document).ready(function(){
    //地圖
    //0:可走，1:障礙，2:終點，3敵人
    mapArray=[0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,
              0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,
              0,0,0,0,0,0,1,0,3,0,0,1,1,0,1,0,
              1,0,1,1,0,0,1,1,1,0,0,0,0,0,1,0,
              0,0,1,1,3,0,0,1,1,0,0,1,3,0,0,0,
              1,0,1,1,1,1,0,0,1,1,1,1,0,1,0,1,
              1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,1,
              3,1,3,0,0,3,1,0,0,1,1,3,0,0,0,0,
              0,1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,
              0,1,0,1,1,0,3,1,0,0,0,1,1,1,0,3,
              0,0,0,1,1,0,1,1,1,0,1,1,1,1,0,1,
              1,0,1,1,1,0,1,1,1,3,0,0,0,0,3,1,
              1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,
              1,0,0,0,0,0,0,3,1,0,0,1,0,0,1,1,
              1,1,1,3,1,0,1,0,0,0,1,1,0,3,0,1,
              1,1,1,1,1,0,1,0,0,0,3,1,0,1,0,2];
    EnemyArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    enemystate=[7,104,116,79,207,69,280,70,354,64,420,65,491,64,559,64,627,64];
    ctx=$("#myCanvas")[0].getContext("2d");


    //擺主角
    imgMain = new Image();
    imgMain.src="simple_rpg/images/spriteSheet.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,37.5,37.5);//200
    };
    //障礙物和敵人
    imgMountain = new Image();
    imgMountain.src="simple_rpg/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src="simple_rpg/images/Enemy.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(let i in mapArray){
                if(mapArray[i]==1){
                    ctx.drawImage(imgMountain,32,65,32,32,i%16*37.5,Math.floor(i/16)*37.5,37.5,37.5);//200,3
                }
                else if(mapArray[i]==3){
                    ctx.drawImage(imgEnemy,7,40,104,135,i%16*37.5,Math.floor(i/16)*37.5,37.5,37.5);//200,3
                }
            }
        }
    };
});
$(document).keydown(function(event){
    let targetImgMainX,targetImgMainY,targetBlock,cutImgPositionX;

    event.preventDefault();
    let enmeyX,enemywidth,enemyStatenum;

    switch(event.originalEvent.code){
        case "ArrowLeft":
            targetImgMainX=currentImgMainX-37.5;//200
            targetImgMainY=currentImgMainY;
            cutImgPositionX=175;
            break;
        case "ArrowUp":
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY-37.5;//200
            cutImgPositionX=355;
            break;
        case "ArrowRight":
            targetImgMainX=currentImgMainX+37.5;//200
            targetImgMainY=currentImgMainY;
            cutImgPositionX=540;
            break;
        case "ArrowDown":
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY+37.5;//200
            cutImgPositionX=0;
            break;
        default:
            return;
    }
    if(targetImgMainX<=562.5&&targetImgMainX>=0&&//400
        targetImgMainY<=562.5&&targetImgMainY>=0){//400
            targetBlock=targetImgMainX/37.5+targetImgMainY/37.5*16;//200,3
        }
        else{
            targetBlock=-1;
        }

        ctx.clearRect(currentImgMainX,currentImgMainY,37.5,37.5);//200
        if(targetBlock==-1||mapArray[targetBlock]==1||mapArray[targetBlock]==3){
        }
        else{
            $("#talkBox").empty();
            currentImgMainX=targetImgMainX;
            currentImgMainY=targetImgMainY;
        }

        ctx.drawImage(imgMain,cutImgPositionX,0,80,130,currentImgMainX,currentImgMainY,37.5,37.5);//200

        switch(mapArray[targetBlock]){
            case undefined:
                $("#talkBox").text("邊界");
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點");
                break;
            case 3:
                EnemyArray[targetBlock%16]++;
                enemyStatenum=EnemyArray[targetBlock%16];
                enmeyX=enemystate[2*enemyStatenum];
                enemywidth=enemystate[2*enemyStatenum+1];
                ctx.clearRect(targetImgMainX,targetImgMainY,37.5,37.5);

                if(EnemyArray[targetBlock%16]==9){
                    mapArray[targetBlock]=0;
                    break;
                }
                ctx.drawImage(imgEnemy,enmeyX,40,enemywidth,135,targetImgMainX,targetImgMainY,37.5,37.5); 
                $("#talkBox").text("攻擊");
                break;
    }       
});