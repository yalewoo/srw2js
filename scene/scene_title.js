var SceneTitle = function (game, stage) {
    this.game = game;
    this.context2D = game.context2D;
    this.canvas = game.canvas;
    this.stage = stage;
    this.title = g_stages[this.stage].title;
    var self = this;


    this.hoverHandler = function (event) {

    }
    this.clickHandler = function (event) {

        this.finishHandler();
    }

    this.rightClickHandler = function (e) {

    }

    this.setFinishHandler = function (callback) {
        this.finishHandler = callback;
    }


    this.update = function () {
        g_buttonCanvasManager.update(this.context2D);
    }

    this.draw = function () {
        this.context2D.fillstyle = "black"
        this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);

        
        var ctx = this.context2D;

        var text = "第" + this.stage + "篇"

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = 26 + "px 黑体";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 200, 200);


        ctx.closePath();

        var text = this.title;

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = 26 + "px 黑体";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 200, 250);


        ctx.closePath();

        ctx.fillStyle = "black"


    }



    this.init = function () {
        this.game.musicManager.PlayOnceFromStart("start_title");
    }
    this.clear = function () {
        g_buttonCanvasManager.clear();
        this.game.musicManager.stopAll();
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}