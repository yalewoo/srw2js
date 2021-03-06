var ButtonInfo = function (id, name, callback, x, y, width, height, font) {
    this.id = id;
    this.text = name;
    this.handler = callback;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.font = 13 * 4 + "px 黑体";
    if (font) {
        this.font = font;
    }

    this.clicked = false;
    this.hovered = false;


    this.intersects = function(x, y) {

        var xIntersect = x > this.x && x < this.x+this.width;
        var yIntersect = y > this.y && y < this.y + this.height;
        return xIntersect && yIntersect;
    }

    this.hoverHandler = function (event) {


        if (this.intersects(event.offsetX, event.offsetY)) {
            this.hovered = true;
        }
        else
        {
            this.hovered = false;
        }
    }

    this.clickHandler = function (event) {
        if (this.intersects(event.offsetX, event.offsetY)) {
            if (!(this.clearWhenClick === false)) {
                g_buttonCanvasManager.clear();
            }

            if (this.handler) {
                this.handler();
            }
            return true;
        }

    }


    this.draw = function (context2D) {
        //set color
        var color;
        if (this.hovered) {
            color = "red";
        } else {
            color = "blue";

        }

        this.drawButton(context2D, color, this.x, this.y, this.width, this.height, 20, this.text);
    }

    this.drawButton = function(ctx, color, x, y, width, height, radius, text){
        //分为4条直线4个圆角绘制
        var fillStyleOld = ctx.fillStyle;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arc(x + width - radius, y + radius, radius, Math.PI * 3 / 2, Math.PI * 2);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arc(x + width - radius, y + height - radius, radius, Math.PI, Math.PI / 2);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
        ctx.lineTo(x, y + radius);
        ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = this.font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + width / 2, y + height / 2);
        ctx.closePath();

        ctx.fillStyle = fillStyleOld;
    }
}

var ButtonCanvasManager = function (ctx) {
    this.ctx = ctx;
    this.buttons = []


    this.addButtonHandler = function (name, callback, x, y, width, height, clearWhenClick) {
        var buttoninfo = new ButtonInfo(this.count, name, callback, x, y, width, height);
        buttoninfo.clearWhenClick = clearWhenClick === false ? false : true;
        this.buttons.push(buttoninfo);
    }
    this.addButtonForRobot = function (name, xRobot, yRobot, callback) {
        var index = this.buttons.length;
        var x = xRobot * 32 + 32;
        var y = yRobot * 32;
        var width = 100;
        var height = 40;
        var font = "32px 黑体";

        y += index * 50;
        if (y > ctx.canvas.height - 32) {
            y = yRobot * 32 - index * 50;
        }
        if (x > ctx.canvas.width - 128) {
            x = xRobot * 32 - 118;
        }
        var buttoninfo = new ButtonInfo(this.count, name, callback, x, y, width, height, font);
        this.buttons.push(buttoninfo);
    }

    this.hasAnyButton = function() {
        return this.buttons.length != 0;
    }


    this.draw = function (context2D) {
        for (var i = 0; i < this.buttons.length; ++i) {
            //this.drawButton(this.ctx, "blue", this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height, this.buttons[i].radius, this.buttons[i].text);
            this.buttons[i].draw(context2D);
        }
    }

    this.update = function (context2D) {
       
    }

    this.clear = function () {
        this.buttons = []
        
    }


    this.hoverHandler = function (event) {
        for (var i = 0; i < this.buttons.length; ++i) {
            //this.drawButton(this.ctx, "blue", this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height, this.buttons[i].radius, this.buttons[i].text);
            this.buttons[i].hoverHandler(event);
        }

    }
    this.clickHandler = function (event) {
        var handled = false;
        for (var i = 0; i < this.buttons.length; ++i) {
            //this.drawButton(this.ctx, "blue", this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height, this.buttons[i].radius, this.buttons[i].text);
            handled = handled || this.buttons[i].clickHandler(event);
        }
        return handled;

    }

}

