var Weapon6 = function (scene_main, x1, y1, img1, x2, y2, img2, isLeft) { 
    this.left = isLeft;
    if (this.left) {
        this.x = x1+img1.width;
        this.y = 200;
    }
    else {
        this.x = x2;
        this.y = 200;
    }
    this.xOriginal = this.x;

    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;


    this.targetW = Math.abs(x2-x1-img1.width);

    this.height = 5;
    this.width = 0;

    this.r = 0;
    this.targetR = 20;

    if (this.left) {
        this.targetX = this.x + this.targetW;
    }
    else {
        this.targetX = this.x - this.targetW;
    }

    this.update = function () {
        if (this.width < this.targetW) {
            
            this.width += 4;
            if (!this.left) {
                this.x = this.xOriginal - this.width;
            }
            
            return true;
        }
        else {
            if (this.r < this.targetR) {
                ++this.r;
                return true;
            }
            else {
                return false;
            }
            
        }
    }

    this.draw = function () {
        CanvasHelper.drawRect(this.context2D, this.x, this.y, this.width, this.height, "yellow");
        CanvasHelper.showArc(this.context2D, this.targetX, this.y, this.r, "white");
    }
}

