var SceneStart = function (game) {
    this.game = game;
    this.context2D = game.context2D;
    this.canvas = game.canvas;

    var self = this;
    this.musicStarted = false;

    
    this.hoverHandler = function (event) {
        
    }
    this.clickHandler = function (event) {
        if (!self.musicStarted) {
            this.game.musicManager.PlayLoopFromStart("start");
            self.musicStarted = true;
        }
    }

    this.rightClickHandler = function (e) {
        
    }


    this.update = function () {
        g_buttonCanvasManager.update(this.context2D);
    }

    this.draw = function () {
        this.context2D.fillstyle = "black"
        this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);


       g_buttonCanvasManager.draw(this.context2D);

        var img = g_resourceManager.img_logos["logo"];

        this.context2D.drawImage(img, 0, 60);
        

    }

    this.setButton = function(text, handler, x, y, w, h) {
        g_buttonCanvasManager.addButtonHandler(text, handler, x, y, w, h);
    }

    this.setStartButton = function(handler)
    {
        this.setButton("Start", handler, 150, 300, 200, 80);
    }
    this.setContinueButton = function(handler)
    {
        this.setButton("Continue", handler, 150, 400, 200, 80);
    }
    this.setDataLoadButton = function (handler) {
        var self = this;
        this.setButton("Data Load", function () {
            g_buttonCanvasManager.clear();

            var datas = {};
            var json = window.localStorage.getItem("srw2js_save_data");
            if (json) {
                datas = JSON.parse(json);
            }
            for (var i = 0; i < 30; ++i) {
                (function (i) {
                    if (datas[i]) {
                        self.setButton(i+1, function() {
                            handler(i+1);
                        }, Math.floor((i-1)%6)*100, 240 + Math.floor((i-1)/6) * 100, 80, 80);
                    }
                })(i);
            }

        }, 150, 500, 200, 80);

    }

    this.init = function() {
        this.game.musicManager.PlayLoopFromStart("start");
    }
    this.clear = function() {
        g_buttonCanvasManager.clear();
        this.game.musicManager.stopAll();
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}