let topicsArray=[
    "課程介紹",
    "隨機性",
    "不上課",
    "日期時間",
    "不上課",
    "條件判斷"
];

let startDate = new Date();

function setMonthAndDay(startMonth,startDay){
    startDate.setMonth(startMonth-1,startDay);
    
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}


