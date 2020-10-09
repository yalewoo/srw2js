var CanvasHelper = {};
CanvasHelper.drawRect = function (ctx, x, y, width, height, color) {
    var fillStyleOld = ctx.fillStyle;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = fillStyleOld;
}

CanvasHelper.showArc = function (ctx, x, y, r, color) {
    var fillStyleOld = ctx.fillStyle;
    // 开始绘制路径
    ctx.beginPath();
    ctx.fillStyle = color;
    // 绘制圆的路径**
    ctx.arc(x, y, r, 0, Math.PI * 2, false);

    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = fillStyleOld;
}

CanvasHelper.drawFillPointsRect = function(ctx, points, color) {
    var fillStyleOld = ctx.fillStyle;
    if (points) {
        ctx.fillStyle = color;
        ctx.beginPath();

        ctx.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; ++i) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        
        ctx.closePath();
        ctx.fill();
    }
    ctx.fillStyle = fillStyleOld;
}


CanvasHelper.drawTextWrapLine = function (ctx, text, x, y, width) {
    var fillStyleOld = ctx.fillStyle;

    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.font = 26 + "px 黑体";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    var t = text;
    var w = width;
    var chr = t.split("");
    var temp = "";
    var row = [];


    for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < w - 60) {
            ;
        }
        else {
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }

    row.push(temp);

    for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b) * 30);
    }

    ctx.closePath();

    ctx.fillStyle = fillStyleOld;
}