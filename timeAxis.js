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

    var pointArr = new generateData(100,10);

    context.beginPath();
    context.moveTo(pointArr[0].x,pointArr[0].y);

    for (i = 1;i<pointArr.length - 2;i++){
        var p0 = pointArr[i - 1];
        var p1 = pointArr[i];
        var p2 = pointArr[i + 1];
        var p3 = pointArr[i + 2];

        var ctrlArr = calculateCtrlPoint([p0,p1,p2,p3],0.9);

        // var aX = p1.x + (p2.x - p0.x)/4;
        // var aY = p1.y + (p2.y - p0.y)/4;
        //
        // var bX = p2.x - (p3.x - p1.x)/4;
        // var bY = p2.y - (p3.y - p1.y)/4;

        var aX = ctrlArr[0].x;
        var aY = ctrlArr[0].y;

        var bX = ctrlArr[1].x;
        var bY = ctrlArr[1].y;

        context.bezierCurveTo(aX,aY,bX,bY,p2.x,p2.y);
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
        x += space ;
        y = 250 + 500 * a;
        var point = new Point(x,y);
        pointData.push(point);
    }

     // return pointData;
     return [{x:0,y:380},{x:100,y:430},{x:200,y:280},{x:300,y:160},
        {x:400,y:340},{x:500,y:100},{x:600,y:300},{x:700,y:240},{x:800,y:400},{x:900,y:450},{x:1000,y:250}];
}

//坐标点
function Point(x,y) {
    this.x = x;
    this.y = y;
}

//生成曲线控制点
//arr 数据点
//曲线的平滑率   smooth_value  [0,1]
function calculateCtrlPoint(arr,smooth_value) {
    var p0 = arr[0];
    var p1 = arr[1];
    var p2 = arr[2];
    var p3 = arr[3];

    //求中点
    var pc1 = new Point((p0.x + p1.x) / 2.0,(p0.y + p1.y) / 2.0);
    var pc2 = new Point((p1.x + p2.x) / 2.0,(p1.y + p2.y) / 2.0);
    var pc3 = new Point((p2.x + p3.x) / 2.0,(p2.y + p3.y) / 2.0);
    //求个中点连线的长度
    var len1 = Math.sqrt((p1.x-p0.x) * (p1.x-p0.x) + (p1.y-p0.y) * (p1.y-p0.y));
    var len2 = Math.sqrt((p2.x-p1.x) * (p2.x-p1.x) + (p2.y-p1.y) * (p2.y-p1.y));
    var len3 = Math.sqrt((p3.x-p2.x) * (p3.x-p2.x) + (p3.y - p2.y) * (p3.y - p2.y));

    // 4.求中点连线长度比例（用来确定平移前p2, p3的位置）
    var k1 = len1 / (len1 + len2);
    var k2 = len2 / (len2 + len3);
    // 5.平移p2
    var xm1 = pc1.x + (pc2.x - pc1.x) * k1;
    var ym1 = pc1.y + (pc2.y - pc1.y) * k1;
    // 6.平移p3
    var xm2 = pc2.x + (pc3.x - pc2.x) * k2;
    var ym2 = pc2.y + (pc3.y - pc2.y) * k2;

    // Resulting control points. Here smooth_value is mentioned
    // above coefficient K whose value should be in range [0...1].
    // 7.微调控制点与顶点之间的距离，越大曲线越平直
    var ctrl1_x = xm1 + (pc2.x - xm1) * smooth_value + p1.x - xm1;
    var ctrl1_y = ym1 + (pc2.y - ym1) * smooth_value + p1.y - ym1;
    var ctrl2_x = xm2 + (pc2.x - xm2) * smooth_value + p2.x - xm2;
    var ctrl2_y = ym2 + (pc2.y - ym2) * smooth_value + p2.y - ym2;

    var ctrl1 = new Point(ctrl1_x,ctrl1_y);
    var ctrl2 = new Point(ctrl2_x,ctrl2_y);

    return [ctrl1,ctrl2];

}







