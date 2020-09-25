var BattleCanvas = function (scene_main, robot, enemy) {

    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;

    var self = this;
    this.stage = 0;
    

    var battle = new Battle(scene_main, robot, enemy);

    this.showAttackAnimationLeftToRight = function() {
        this.inMove = true;
        this.fire_x = 50;
        this.fire_x2 = 250;
    }
    this.showAttackAnimationRightToLeft = function () {
        this.inMove = true;
        this.fire_x = 250;
        this.fire_x2 = 50;
    }

    this.executeStage = function()
    {
        if (this.stage == 0) {
            if (robot.isPlayer)
            {
                var music_id = robot.pilot.music_id;
                this.game.musicManager.stopAll();
                this.game.musicManager.PlayLoopFromStart(music_id);
            }


            this.people = robot.pilot;
            this.text = robot.property.name + "攻击！";
            ++this.stage;



        }
        else if (this.stage == 1)
        {
            this.people = robot.pilot;
            this.text = robot.pilot.name + "：发射！";
            this.game.musicManager.PlayOnceFromStart("attack");
            this.showAttackAnimationRightToLeft();
            ++this.stage;
        }
        else if (this.stage == 2)
        {
            this.people = enemy.pilot;
            this.text = enemy.pilot.name + "：哐！";
            ++this.stage;
        }
        else if (this.stage == 3)
        {
            this.people = enemy.pilot;
            this.text = enemy.property.name + "反击！";
            this.game.musicManager.PlayOnceFromStart("attack");

            this.showAttackAnimationLeftToRight();

            ++this.stage;
        }
        else if (this.stage == 4) {
            this.people = robot.pilot;
            this.text = robot.property.name + "损坏" + 65 + robot.pilot.name + ": 混蛋，打的不错呀";
            ++this.stage;
        }
        else
        {
            
            this.finishHandler();

            this.game.musicManager.stopAll();
            this.game.musicManager.PlayLoopFromStart("main_robot");
            
        }
        log(this.people);
        log(this.text);

    }

    this.executeStage();

    this.hoverHandler = function (event) {

    }
    this.clickHandler = function (event) {
        this.executeStage();
    }

    this.rightClickHandler = function (e) {

    }

    this.setFinishHandler = function (callback) {
        this.finishHandler = callback;
    }

    this.clear = function () {
        this.currentTalk = 0;
        this.talks = [];
    }

    this.update = function () {
        if (this.fire_x < this.fire_x2)
        {
            this.fire_x += 2;
        }
        else if (this.fire_x > this.fire_x2)
        {
            this.fire_x -= 2;
        }
        else{
            this.inMove = false;
        }
    }

    this.draw = function () {

        
        var peopleid = this.people.id;
        var text = this.text;

        var img = g_resourceManager.get_img_people_image(peopleid);



        var ctx = this.context2D;

        var x = 0;
        var y = 350;
        var width = 600;
        var height = 200;

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

        if (this.inMove) {
            img = g_resourceManager.img_logos["fire"];
            this.context2D.drawImage(img, this.fire_x, 200);
        }

    }

    this.talks = [
        [54, 161, "很好，正如情报所说，敌人防守较差"],
        [54, 161, "全歼他们！就出热核装置！"],
        [7, 29, "是！我去把他们全干掉！"],
        [15, 34, "加代，可不能蛮干呀！HP减少的话，我给你修理。"],
        [54, 161, "如果有人受伤，不要勉强。让阿波罗A给你们修理，或者回我这里。"],
        [6, 126, "明白了，舰长"],
    ];

    this.currentTalk = 0;
}