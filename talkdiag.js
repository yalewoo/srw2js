var TalkDiag = function (game, story) {
    this.game = game;
    this.context2D = game.context2D;
    this.canvas = game.canvas;

    var self = this;


    this.hoverHandler = function (event) {

    }
    this.clickHandler = function (event) {
        ++this.currentTalk;

        if (this.currentTalk >= this.talks.length) {
           
            this.finishHandler();

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

        var peopleid = this.talks[this.currentTalk][0]
        var img = g_resourceManager.get_img_people_image(peopleid);



        var ctx = this.context2D;

        var x = 0;
        var y = 350;
        var width = 600;
        var height = 200;
        var text = this.talks[this.currentTalk][2];

        var fillStyleOld = ctx.fillStyle;

        ctx.beginPath();
        ctx.fillStyle = "#7f7f7f";
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y);

        ctx.closePath();
        ctx.fill();


        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = 26 + "px 黑体";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 100, 400);
        ctx.closePath();

        ctx.fillStyle = fillStyleOld;

        this.context2D.drawImage(img, 10, 380);


    }

    this.talks = story;
    this.currentTalk = 0;


}