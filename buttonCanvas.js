var ButtonInfo = function (id, name, callback, x, y, width, height) {
    this.id = id;
    this.text = name;
    this.handler = callback;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

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
            g_buttonCanvasManager.clear();

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
        // //draw button
        // context2D.fillRect(this.x, this.y, this.width, this.height);

        // //text options
        // var fontSize = 20;
        // context2D.fillStyle = "black";
        // context2D.font = fontSize + "px sans-serif";

        // //text position
        // var textSize = context2D.measureText(this.text);
        // var textX = this.x + (this.width / 2) - (textSize.width / 2);
        // var textY = this.y + (this.height / 2) - (fontSize / 2);

        // //draw the text
        // context2D.fillText(this.text, textX, textY);
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
        ctx.font = 13 * 4 + "px 黑体";
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


    this.addButtonHandler = function (name, callback, x, y, width, height) {

        var buttoninfo = new ButtonInfo(this.count, name, callback, x, y, width, height);
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

