var TalkDiag = function (game, story, notPoint) {
    this.game = game;
    this.context2D = game.context2D;
    this.canvas = game.canvas;

    this.width = 600;
    this.height = 200;
    this.xStart = 0; // 左上角
    this.yStart = 350;

    this.hoverHandler = function (event) {

    }
    this.clickHandler = function (event) {
        ++this.currentTalk;
        

        if (this.currentTalk >= this.talks.length) {
            this.finishHandler();
        }
        else {
            if (notPoint == false) {

            }
            else {
                this.getDiagPosition();
            }
            
        }
    }

    this.getDiagPosition = function() {
        var peopleid = this.talks[this.currentTalk][0];
        if (this.game && this.game.scene && this.game.scene.robots) {
            var robot = this.game.scene.robots.getRobotByPeopleId(peopleid);
            if (robot) {
                var yDistance = 50;
                
                var xRobot = robot.x*32 + 16;
                var yRobot = robot.y*32 + 16;

                this.xStart = Math.max(xRobot - this.width / 2, 0);
                this.yStart = yRobot;



                if (this.yStart + this.height + yDistance + 20 > this.game.canvas.height) {
                    // 对话框在机器人上方
                    this.yStart = Math.max(this.yStart - this.height - 16 - yDistance, 0);
                    this.fillPoints = [[xRobot, yRobot], [xRobot - 16, this.yStart + this.height], [xRobot + 16, this.yStart + this.height]];
                }
                else {
                    // 对话框在机器人下方
                    this.yStart = yRobot + yDistance;
                    this.fillPoints = [[xRobot, yRobot], [xRobot - 16, this.yStart], [xRobot + 16, this.yStart]];
                }

                if (this.xStart < 0) {
                    this.xStart = 0;
                }
                else if (this.xStart + this.width > this.canvas.width) {
                    this.xStart = Math.max(this.canvas.width - this.width, 0);
                }
            }
        }

    }

    this.rightClickHandler = function (e) {

    }

    this.setFinishHandler = function (callback) {
        this.finishHandler = callback;
    }

    this.clear = function() {
        this.currentTalk = 0;
        this.talks = [];
    }

    this.update = function () {

    }

    this.draw = function () {
        var peopleid = this.talks[this.currentTalk][0];

        var img = g_resourceManager.get_img_people_image(peopleid);

        var name = g_people_data[peopleid][1];

        var ctx = this.context2D;

        var x = this.xStart;
        var y = this.yStart;

        var text = this.talks[this.currentTalk][1];

        var fillStyleOld = ctx.fillStyle;

        ctx.beginPath();
        ctx.fillStyle = "#7f7f7f";
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.width, y);
        ctx.lineTo(x + this.width, y + this.height);
        ctx.lineTo(x, y + this.height);
        ctx.lineTo(x, y);

        ctx.closePath();
        ctx.fill();


        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = 26 + "px 黑体";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(name+":", x+100, y+50);
        ctx.closePath();

        CanvasHelper.drawTextWrapLine(ctx, text, x+100, y+100, this.width-100);

        ctx.fillStyle = fillStyleOld;

        this.context2D.drawImage(img, x+10, y+70);

        CanvasHelper.drawFillPointsRect(ctx, this.fillPoints, "#7f7f7f");
    }

   

    this.talks = story;
    this.currentTalk = 0;

    if (notPoint == false) {

    }
    else {
        this.getDiagPosition();
    }

}