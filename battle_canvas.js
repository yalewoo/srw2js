var BattleCanvas = function (scene_main, robot, enemy) {

    this.game = scene_main.game;
    this.context2D = this.game.context2D;
    this.canvas = this.game.canvas;

    var self = this;
    this.stage = 0;
    this.robot = robot;
    this.enemy = enemy;
    

    this.showAttackAnimationRobot = function(callback) {
        if (!this.robot.isPlayer)
        {
            this.showAttackAnimationLeftToRight(callback);
        }
        else
        {
            this.showAttackAnimationRightToLeft(callback);
        }
    }
    this.showAttackAnimationEnemy = function (callback) {
        if (!this.enemy.isPlayer) {
            this.showAttackAnimationLeftToRight(callback);
        }
        else {
            this.showAttackAnimationRightToLeft(callback);
        }
    }
    this.showAttackAnimationLeftToRight = function(callback) {
        this.callback = callback;
        this.inMove = true;
        this.fire_x = 150;
        this.fire_x2 = 350;
    }
    this.showAttackAnimationRightToLeft = function (callback) {
        this.callback = callback;

        this.inMove = true;
        this.fire_x = 350;
        this.fire_x2 = 150;
    }

    this.executeStage = function()
    {
        var self = this;
        if (this.stage == 0) {
            if (robot.isPlayer)
            {
                var music_id = robot.pilot.music_id;
                this.game.musicManager.stopAll();
                this.game.musicManager.PlayLoopFromStart(music_id, false);
                this.playerRobot = robot;
                this.enemyRobot = enemy;
            }
            else{
                var music_id = enemy.pilot.music_id;
                this.game.musicManager.stopAll();
                this.game.musicManager.PlayLoopFromStart(music_id, false);
                this.playerRobot = enemy;
                this.enemyRobot = robot;
            }


            this.people = robot.pilot;
            this.textRobot = robot.property.name + "攻击！";
            this.textPeople = "";
            ++this.stage;

            this.weapon = robot.selectedWeapon;
            this.enemy_weapon = this.getEnemyBackWeapon();

            this.enemy_rate = Math.floor( this.calcRadio(enemy, this.enemy_weapon, robot));
            this.player_rate = Math.floor( this.calcRadio(robot, this.weapon, enemy));

        }
        else if (this.stage == 1)
        {
            this.people = robot.pilot;
            this.textPeople = robot.pilot.name + "：发射！";
            this.game.musicManager.PlayOnceFromStart("attack");
            this.showAttackAnimationRobot(function() {
                self.people = enemy.pilot;

                if (self.prob(self.player_rate)) {
                    var damage = BattleCanvas.getDamage(self.robot, self.enemy, self.robot.selectedWeapon);
                    enemy.hp = Math.max(enemy.hp - damage, 0);

                    self.textRobot = enemy.property.name + "损坏" + damage;
                    self.textPeople = enemy.pilot.name + "：哐！";
                }
                else
                {
                    self.textRobot = enemy.property.name + "防御成功！";
                    self.textPeople = enemy.pilot.name + "：没什么了不起！";
                }
                
                if (enemy.hp > 0)
                {
                    ++self.stage;
                }
                else
                {
                    
                    self.stage = 999;
                }
                
            });
        }
        else if (this.stage == 2)
        {
            this.people = enemy.pilot;

            if (!this.enemy_weapon) {
                this.textRobot = enemy.pilot.name + "无力反击";
                this.textPeople = enemy.pilot.name + "：便宜你了!";
                this.stage++;
            }
            else
            {
                this.textRobot = enemy.property.name + "反击！";
                this.textPeople = enemy.pilot.name + "：准备反击！";
                this.game.musicManager.PlayOnceFromStart("attack");

                this.showAttackAnimationEnemy(function () {

                    self.people = robot.pilot;

                    if (self.prob(self.enemy_rate)) {
                        var damage = BattleCanvas.getDamage(self.enemy, self.robot, self.enemy_weapon);
                        robot.hp = Math.max(robot.hp - damage, 0);

                        self.textRobot = robot.property.robotName + "损坏 " + damage;

                        self.textPeople = robot.pilot.name + ": 被打中了!";

                    }
                    else {
                        self.textRobot = enemy.property.name + "防御成功！";
                        self.textPeople = enemy.pilot.name + "：没什么了不起！";
                    }

                    if (robot.hp > 0) {
                        ++self.stage;
                    }
                    else {
                        self.stage = 999;
                    }
                });
            }
           
        }
        else if (this.stage == 3)
        {
            if (robot.speed - enemy.speed >= 50) {
                this.people = robot.pilot;
                self.textRobot = enemy.property.name + "再次攻击";
                this.textPeople = robot.pilot.name + "：发射！";
                this.game.musicManager.PlayOnceFromStart("attack");
                this.showAttackAnimationRobot(function () {
                    self.people = enemy.pilot;

                    if (self.prob(self.player_rate)) {
                        var damage = BattleCanvas.getDamage(self.robot, self.enemy, self.robot.selectedWeapon);
                        enemy.hp = Math.max(enemy.hp - damage, 0);

                        self.textRobot = enemy.property.name + "损坏" + damage;
                        self.textPeople = enemy.pilot.name + "：哐！";
                    }
                    else {
                        self.textRobot = enemy.property.name + "防御成功！";
                        self.textPeople = enemy.pilot.name + "：没什么了不起！";
                    }

                    if (enemy.hp > 0) {
                        ++self.stage;
                    }
                    else {
                        self.stage = 999;
                    }

                });
            }
            else if (enemy.speed - robot.speed >= 50 && this.enemy_weapon != 0) {
                this.textRobot = enemy.property.name + "再次反击！";
                this.textPeople = enemy.pilot.name + "：再来！";
                this.game.musicManager.PlayOnceFromStart("attack");

                this.showAttackAnimationEnemy(function () {

                    self.people = robot.pilot;

                    if (self.prob(self.enemy_rate)) {
                        var damage = BattleCanvas.getDamage(self.enemy, self.robot, self.enemy_weapon);
                        robot.hp = Math.max(robot.hp - damage, 0);

                        self.textRobot = robot.property.robotName + "损坏 " + damage;

                        self.textPeople = robot.pilot.name + ": 被打中了!";

                    }
                    else {
                        self.textRobot = enemy.property.name + "防御成功！";
                        self.textPeople = enemy.pilot.name + "：没什么了不起！";
                    }

                    if (robot.hp > 0) {
                        ++self.stage;
                    }
                    else {
                        self.stage = 999;
                    }
                });
            }
            else
            {
                this.stage++;
                this.executeStage();
            }
        }
        else if (this.stage == 999)
        {
            ++this.stage;
            if (this.enemyRobot.hp <= 0)
            {
                // 获得经验
                var diffLevel = this.enemyRobot.level - this.playerRobot.level;
                var exp = this.enemyRobot.property.exp_dievalue * this.enemyRobot.level;
                if (diffLevel >= 0) {
                    diffLevel = diffLevel > 8 ? 8 : diffLevel;
                    exp = exp * (diffLevel + 2) * 0.5;
                }
                else {
                    diffLevel = diffLevel < -5 ? -5 : diffLevel;
                    exp = exp / (diffLevel * -1 * 2);
                }

                var oldLevel = this.playerRobot.level;
                this.playerRobot.getExp(exp);

                var money = this.enemyRobot.property.money * 10;
                scene_main.getMoney(money);


                self.textRobot = this.playerRobot.property.name + "获得经验 " + exp + "和金钱 " + money;
                if (this.playerRobot.level != oldLevel)
                    self.textPeople = this.playerRobot.property.name + "升级到" + this.playerRobot.level + "级";
            }
            else
            {
                this.executeStage();
            }
        }
        else
        {
            this.game.musicManager.stopAll();

            this.finishHandler();

            
            this.game.musicManager.PlayLoopContinue();
        }

    }

    

    this.prob = function (p) {
        var newp = Math.random() * 100;

        if (newp < p)
            return true;
        else
            return false;
    }

    this.getEnemyBackWeapon = function () {
        if (this.enemy.canAttackRobotUsingWeapon(this.robot, this.enemy.weapon1)) {
            if (this.enemy.canAttackRobotUsingWeapon(this.robot, this.enemy.weapon2)) {
                if (this.enemy.weapon1.firepower[this.robot.property.type] > this.enemy.weapon2.firepower[this.robot.property.type])
                    return this.enemy.weapon1;
                else
                    return this.enemy.weapon2;
            }
            else
                return this.enemy.weapon1;
        }
        if (this.enemy.canAttackRobotUsingWeapon(this.robot, this.enemy.weapon2)) {
            return this.enemy.weapon2;
        }
        return null;
    }

    this.calcRadio = function (robot2, weapon2, enemy2) {
        if (!weapon2)
            return 0;

        if (enemy2.spirit[8])  //使用回避精神
            return 0;

        if (robot2.spirit[6]) // 使用必杀
            return 100;

        var base = robot2.speed + weapon2.hitRadio - enemy2.speed;


        var typeRadio;
        if (enemy2.property.type == 2) {
            typeRadio = 1;
        }
        else {
            typeRadio = g_typeRadioTable[scene_main.map.maprects[enemy2.x][enemy2.y].kind];
        }


        var distanceRadio;
        var d = scene_main.map.calcDistance(robot2, enemy2);
        if (d <= 1) {
            distanceRadio = 1;
        }
        else {
            distanceRadio = 1 - 0.05 * (d - 2);
        }

        var res = base * typeRadio * distanceRadio;

        // 使用瞄准
        if (robot2.spirit[2])
            res += 10;

        if (res > 100)
            res = 100;

        return res;
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
            if (this.callback) {
                this.callback();
                this.callback = null;
            }

        }
    }



    this.showText = function (ctx, x, y, text) {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.font = 26 + "px 黑体";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y);
        ctx.closePath();
    }
    this.showRect = function (ctx, x, y, width, height, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y);

        ctx.closePath();
        ctx.fill();
    }

    this.draw = function () {

        var peopleid = this.people.id;
        var text = this.text;
        var text2 = this.text2;




        var ctx = this.context2D;

        var x = 0;
        var y = 350;
        var width = 600;
        var height = 250;

        var fillStyleOld = ctx.fillStyle;

        this.showRect(ctx, 0, 0, ctx.canvas.width, 500, "#101010");

        this.showRect(ctx, x, y, width, height, "#7f7f7f");

        this.showText(ctx, 100, 460, this.textPeople);
        this.showText(ctx, 10, 430, this.textRobot);


        if (!this.robot.isPlayer)
        {
            // robot应该在右边
            // 左边
            this.showText(ctx, 10, 370, "命中");
            this.showText(ctx, 150, 370, this.player_rate + " %");
            this.showText(ctx, 10, 390, "HP");
            this.showText(ctx, 100, 390, this.robot.hp + " / " + this.robot.hp_total);

            // 右边
            this.showText(ctx, 300, 370, "命中");
            this.showText(ctx, 450, 370, this.enemy_rate + " %");

            this.showText(ctx, 300, 390, "HP");
            this.showText(ctx, 400, 390, this.enemy.hp + " / " + this.enemy.hp_total);
        }
        else
        {
            // robot应该在左边
            
            this.showText(ctx, 10, 370, "命中");
            this.showText(ctx, 150, 370, this.enemy_rate + " %");
            this.showText(ctx, 10, 390, "HP");
            this.showText(ctx, 100, 390, this.enemy.hp + " / " + this.enemy.hp_total);

            this.showText(ctx, 300, 370, "命中");
            this.showText(ctx, 450, 370, this.player_rate + " %");

            this.showText(ctx, 300, 390, "HP");
            this.showText(ctx, 400, 390, this.robot.hp + " / " + this.robot.hp_total);
        }
        


        ctx.fillStyle = fillStyleOld;

        var img = g_resourceManager.get_img_people_image(peopleid);

        this.context2D.drawImage(img, 10, 470);

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

BattleCanvas.getDamage = function (robot2, enemy2, weapon2) {
    var damage = robot2.strength + weapon2.firepower[enemy2.property.type] - enemy2.defense;
    if (robot2.spirit[10]) { // 热血
        damage *= 3;
    }
    if (robot2.spirit[4]) { // 强攻
        damage *= 2;
    }

    if (enemy2.spirit[3]) { // 防守
        damage /= 2;
    }
    return damage;
}