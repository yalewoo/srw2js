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
    // 开始绘制路径
    ctx.beginPath();
    ctx.fillStyle = color;
    // 绘制圆的路径**
    ctx.arc(x, y, r, 0, Math.PI * 2, false);

    ctx.closePath();
    ctx.fill();
}

CanvasHelper.drawFillPointsRect = function(cxt, points, color) {
    if (points) {
        cxt.fillStyle = color;
        cxt.beginPath();

        cxt.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; ++i) {
            cxt.lineTo(points[i][0], points[i][1]);
        }
        
        cxt.closePath();
        cxt.fill();
    }

}