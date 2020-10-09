var Weapon1 = function (scene_main, x1, y1, img1, x2, y2, img2, isLeft) { 
    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;

    this.left = isLeft;
    if (!this.left) {
        this.x = x1;
        this.y = y1;
    }
    else {
        this.x = x2;
        this.y = y2;
    }

    this.r = 0;
    this.targetR = Math.max(img1.width, img1.height);;

    

    this.update = function () {
        if (this.r < this.targetR) {
            this.r += 3;
           
            this.points = [[this.x, this.y]];
            this.points.push([this.x + this.r, this.y + this.r]);
            this.points.push([this.x + this.r + 6, this.y + this.r - 6]);
            this.points.push([this.x + 6, this.y - 6]);

            return true;
        }
        else {
            
            return false;
            
            
        }
    }

    this.draw = function () {
        CanvasHelper.drawFillPointsRect(this.context2D, this.points, "yellow");
    }
}


var WeaponFactory = {};
WeaponFactory.getWeapon = function (id, scene_main, x1, y1, img1, x2, y2, img2, isLeft) {
    if (id >= 1 && id <= 5) {
        return new Weapon1(scene_main, x1, y1, img1, x2, y2, img2, isLeft);
    }
    else if (id >= 6 && id <= 10) {
        return new Weapon6(scene_main, x1, y1, img1, x2, y2, img2, isLeft);
    }
    else  {
        return new Weapon6(scene_main, x1, y1, img1, x2, y2, img2, isLeft);
    }
}