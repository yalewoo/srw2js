var SceneBattle = function (scene_main, robot, enemy) {
    var game = scene_main.game;
    this.game = game;
    this.context2D = game.context2D;
    this.canvas = game.canvas;

    var self = this;


    var battleCanvas = new BattleCanvas(scene_main, robot, enemy);

    this.hoverHandler = function (event) {
        battleCanvas.hoverHandler();
    }
    this.clickHandler = function (event) {
        battleCanvas.clickHandler();
    }

    this.rightClickHandler = function (e) {
        battleCanvas.rightClickHandler();
    }

    this.setFinishHandler = function (callback) {
        battleCanvas.finishHandler = callback;
    }


    this.update = function () {
        battleCanvas.update();
    }

    this.draw = function () {
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

        battleCanvas.draw();

        var robot2 = robot.isPlayer ? robot : enemy;
        var enemy2 = robot.isPlayer ? enemy : robot;

        var img = g_resourceManager.get_img_robot_image(robot2.robot_id);
        this.context2D.drawImage(img, 400, 180);

        img = g_resourceManager.get_img_robot_image(enemy2.robot_id);
        this.context2D.drawImage(img, 50, 180);


    }


    this.init = function () {

        this.game.musicManager.PlayLoopFromStart("start_map");

        this.game.musicManager.PlayOnceFromStart("start_map_dididi");


    }
    this.clear = function () {
        g_buttonCanvasManager.clear();
        this.game.musicManager.stopAll();
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}