

/*
 获取页面I属性D为test的元素：

 document.getElementById("test");
 //or
 document.querySelector("#test");
 document.querySelectorAll("#test")[0];
 获取页面class属性为”red”的元素:

 document.getElementsByClassName('red')
 //or
 document.querySelector('.red')
 //or
 document.querySelectorAll('.red')
 */


var wrap = document.querySelector(".wrap");
var middle= document.querySelector(".middle");
// var imgs = document.querySelectorAll(".middle>img");
var imgs = $(".middle>img");

var next = document.querySelector(".next");
var last = document.querySelector(".last");
var btns =document.querySelectorAll(".btn>div");

//计算出一帧的距离
var w = imgs[0].offsetWidth;
var page = 0;
var btn = 0;
var timer = null;
//为初始图片的下表添加样式
btns[0].style.background="red";
//计算出图集宽度
middle.style.width = w*imgs.length+"px";
//下一张按妞点击

next.onclick= function () {
    page ++ ;
    btn ++ ;
    //无限滚判断
    if (page > imgs.length - 1){
        //忽略了开头的第一页
        page = 1;
        middle.style.left = 0;
    }
    //变换图片时，下面的按钮跟着变换
    if(btn>imgs.length-2){
        btn = 0;
    }
    for (var i = 0 ; i < btns.length ; i ++){
        btns[i].style.backgroundColor="";
    }
    btns[btn].style.backgroundColor="red";
    roll()
}

last.onclick = function(){
    page --;
    btn --;
    //无限滚判断
    if(page<0){
        //跳到最后一页
        page=imgs.length-2;
        middle.style.left =-w*(imgs.length-1)+"px";
    }
    //变换图片时,下边的按钮跟随变换
    if(btn<0){
        btn=imgs.length-2;
    }
    for(var i = 0; i <btns.length;i++){
        btns[i].style.backgroundColor="";
    }
    btns[btn].style.backgroundColor="red";
    //调用滚动动画
    roll();
}

function roll() {

    //起点
    var start = middle.offsetLeft;
    //终点
    var end = -w * page;
    //变化量
    var change = end - start;
    //初始时间
    var t = 0;
    //持续时间
    var d = 50;
    //使用前先清空定时器
    clearInterval(timer);
    timer = setInterval(function () {
        t++;
        if (t >= d) {
            //超过持续时间,清空定时器
            clearInterval(timer);
        }
        //使用Tween动画

        // var speed = createjs.Tween.Linear(t, start, change, d);
        var speed = createjs.Tween.get(middle, {loop: -1})
            .to({left:end}, d, createjs.Ease.linear);
        middle.style.left = speed + "px";
    }, 30)
}


