var TextAnimation = function(scene_main, x, y, text, callback) {
    this.x = Math.floor(x*32+32);
    this.y = Math.floor(y*32+16);
    this.text = text;
    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;

    this.callback = callback;
    
    this.targetY = this.y - 48;

    this.update = function() {
        if (this.y > this.targetY)
        {
            --this.y;
        }
        else
        {
            if (this.callback)
            {
                this.callback();
            }
            return false;
        }
    }

    this.draw = function() {
        this.showText(this.context2D, this.x, this.y, this.text);
    }

    this.showText = function (ctx, x, y, text) {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = 50 + "px 黑体";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y);
        ctx.closePath();
    }
}


var AnimationBoom = function(scene_main, x, y, r1, r2, callback) {
    this.x = Math.floor(x*32+16);
    this.y = Math.floor(y*32+16);

    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;

    this.callback = callback;
    
    this.r = r1;
    this.targetR = r2;

    this.update = function() {
        if (this.r < this.targetR)
        {
            ++this.r;
        }
        else
        {
            if (this.callback)
            {
                this.callback();
            }
            return false;
        }
    }

    this.draw = function() {
        this.showArc(this.context2D, this.r);
    }

    this.showArc = function (ctx, x, y, text) {
        // 开始绘制路径
        ctx.beginPath();
        ctx.fillStyle = "white";
        // 绘制圆的路径**
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

        

        
        ctx.closePath();
        ctx.fill();
    }
}