/**
 * Created by admin on 2017/10/11.
 */


//拿到画板
var canvas = window.document.getElementById('canvas');

canvas.width = 1000;
canvas.height = 1000;

//拿到上下文
var context = canvas.getContext('2d');
//设置线条的颜色
context.strokeStyle = 'red';
context.lineWidth = 5;

DrawBezierPath();

// context.beginPath();
// context.moveTo(0,500);
// context.lineTo(1000,500);
// context.stroke();
// context.closePath();


function DrawBezierPath() {

    var pointArr = new generateData(50,20);

    context.beginPath();
    context.moveTo(pointArr[0].x,pointArr[0].y);

    for (i = 1;i<pointArr.length - 2;i++){
        var p0 = pointArr[i - 1];
        var p1 = pointArr[i];
        var p2 = pointArr[i + 1];
        var p3 = pointArr[i + 2];

        var aX = p1.x + (p2.x - p0.x)/4;
        var aY = p1.y + (p2.y - p0.y)/4;

        var bX = p2.x - (p3.x - p1.x)/4;
        var bY = p2.y - (p3.y - p1.y)/4;

        context.bezierCurveTo(aX,aY,bX,bY,p3.x,p3.y);
    }
    context.stroke();
    context.closePath();
}


//生成曲线坐标数组
function generateData(space,num) {

    var pointData = new Array();
    var x = 0;
    var y = 500;

    for (i = 0;i < num;i++){
        var a = Math.random()
        x += space * a;
        y = 250 + 500 * a;
        var point = new Point(x,y);
        pointData.push(point);
    }

    return pointData;

}

//坐标点
function Point(x,y) {
    this.x = x;
    this.y = y;
}









