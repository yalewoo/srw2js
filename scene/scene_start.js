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
        
        if (!g_buttonCanvasManager.hasAnyButton()) {
            CanvasHelper.drawTextWrapLine(this.context2D, "请刷新重新开始", 150, 300, 300);
        }

    }

    this.setButton = function(text, handler, x, y, w, h) {
        g_buttonCanvasManager.addButtonHandler(text, handler, x, y, w, h);
    }

    this.setStartButton = function(handler)
    {
        this.setButton("重新开始", handler, 100, 300, 300, 80);
    }
    this.setContinueButton = function(handler)
    {
        this.setButton("继续游戏", handler, 100, 400, 300, 80);
    }
    this.setDataLoadButton = function (handler) {
        var self = this;
        this.setButton("关卡存档", function () {
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

        }, 100, 500, 300, 80);

    }

    this.init = function() {
        this.game.musicManager.PlayLoopFromStart("start");

        // 设置
        g_buttonCanvasManager.addButtonHandler("设置", function () {
            g_buttonCanvasManager.clear();

            var addFpsButton = function() {
                var text = "显示FPS:" + (g_options.showfps ? "开" : "关");
                g_buttonCanvasManager.addButtonHandler(text, function () {
                    g_options.showfps = !g_options.showfps;

                    var str = JSON.stringify(g_options);
                    window.localStorage.setItem("srw2js_save_options", str);

                    addFpsButton();
                }, 100, 300, 310, 80, false);
            }
            addFpsButton();

            var addhpButton = function () {
                var text = "显示血条:" + (g_options.showHp ? "开" : "关");
                g_buttonCanvasManager.addButtonHandler(text, function () {
                    g_options.showHp = !g_options.showHp;

                    var str = JSON.stringify(g_options);
                    window.localStorage.setItem("srw2js_save_options", str);

                    addhpButton();
                }, 100, 400, 310, 80, false);
            }
            addhpButton();


            g_buttonCanvasManager.addButtonHandler("设置后刷新页面", function () {
                
            }, 100, 500, 310, 80, false);


        }, 100, 600, 150, 80, false);
        g_buttonCanvasManager.addButtonHandler("帮助", function () {
            window.open("http://www.yalewoo.com/srw2js.html");
        }, 280, 600, 150, 80, false);
        
    }
    this.clear = function() {
        g_buttonCanvasManager.clear();
        this.game.musicManager.stopAll();
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}