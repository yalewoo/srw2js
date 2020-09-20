var SceneStartMap1 = function (game) {
    this.game = game;
    this.context2D = game.context2D;
    this.canvas = game.canvas;

    var self = this;


    var talkDiag = new TalkDiag(game, g_stage_prelude_talk_date[0][0]);

    this.hoverHandler = function (event) {
        talkDiag.hoverHandler();
    }
    this.clickHandler = function (event) {
        talkDiag.clickHandler();
    }

    this.rightClickHandler = function (e) {
        talkDiag.rightClickHandler();
    }

    this.setFinishHandler = function(callback)
    {
        talkDiag.finishHandler = callback;
    }


    this.update = function () {
        g_buttonCanvasManager.update(this.context2D);
    }

    this.draw = function () {
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);


        var img = g_resourceManager.img_logos["map1"];

        this.context2D.drawImage(img, 0, 0);

        var peopleid = this.talks[this.currentTalk][0]
        var img = g_resourceManager.get_img_people_image(peopleid);
        


        talkDiag.draw();


    }

    this.talks = g_stage_prelude_talk_date[0][0];
    this.currentTalk = 0;
    

   

    this.init = function () {

        this.game.musicManager.playMap1();

        this.game.musicManager.playDididi();


    }
    this.clear = function () {
        g_buttonCanvasManager.clear();
        this.game.musicManager.stopMap1();
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}