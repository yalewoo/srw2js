var Robots = function (scene_main) {
    this.scene = scene_main;
    var context2D = scene_main.context2D;

    this.robots = []
    this.enemy = []

    this.deleteRobot = function (robot) {
        var index = this.robots.indexOf(robot);
        if (index > -1) {
            this.robots.splice(index, 1);
        }

        index = this.enemy.indexOf(robot);
        if (index > -1) {
            this.enemy.splice(index, 1);
        }
    }

    this.context2D = context2D;
    this.loadStage = function (stage) {


        var stage_robot = g_stages[stage].robot_init;
        this.addRobot(stage_robot);

        stage_robot = g_stages[stage].enemy_init;
        this.addEnemy(stage_robot);
    }
    this.addRobot = function (stage_robot) {
        for (var i = 0; i < stage_robot.length; ++i) {
            var robot = new Robot(stage_robot[i], scene_main, isEnemy = false);
            robot.updateLevel();
            robot.InitValue();
            this.robots.push(robot);
        }
    }
    this.addEnemy = function (stage_robot) {
        for (var i = 0; i < stage_robot.length; ++i) {
            var robot = new Robot(stage_robot[i], scene_main, isEnemy = true);
            robot.updateLevel();
            robot.InitValue();

            this.enemy.push(robot);
        }
    }

    this.updateForNewTurn = function() {
        for (var i = 0; i < this.robots.length; ++i) {
            var robot = this.robots[i];
            robot.spirit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            if (this.scene.map.isSupply(robot.x, robot.y))
            {
                
                var hp = Math.floor(robot.hp_total * 0.3);
                robot.addHp(hp);            }
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            var robot = this.enemy[i];
            robot.spirit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            if (this.scene.map.isSupply(robot.x, robot.y)) {
                var hp = Math.floor(robot.hp_total * 0.3);
                robot.addHp(hp);
            }
        }
    }


    this.update = function () {
        for (var i = 0; i < this.robots.length; ++i) {
            this.robots[i].update();
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            this.enemy[i].update();
        }
    }
    this.draw = function () {
        updateRobotUI(this.selectedRobot);

        for (var i = 0; i < this.robots.length; ++i) {
            this.robots[i].draw();
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            this.enemy[i].draw();
        }
    }

    this.mousehoverHandler = function (x, y) {

        for (var i = 0; i < this.robots.length; ++i) {
            if (this.robots[i].x == x && this.robots[i].y == y) {
                log(this.robots[i]);

                updateRobotUI(this.robots[i]);
            }
        }

        for (var i = 0; i < this.enemy.length; ++i) {
            if (this.enemy[i].x == x && this.enemy[i].y == y) {
                log(this.enemy[i]);

                updateRobotUI(this.enemy[i]);
            }
        }
    }
    this.getRobotAt = function (x, y) {
        for (var i = 0; i < this.robots.length; ++i) {
            if (this.robots[i].x == x && this.robots[i].y == y) {
                return this.robots[i];
            }
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            if (this.enemy[i].x == x && this.enemy[i].y == y) {
                return this.enemy[i];
            }
        }
        return null;
    }
    this.mousedownHandler = function (x, y) {
        var robot = this.getRobotAt(x, y);
        if (robot) {
            if (robot.inMove) {

            }
            else if (robot == this.selectedRobot) {
                robot.setNotActive();

            }

            else if (this.selectedRobot == null) {
                updateMapRectUI(null);

                this.selectedRobot = robot;

                var m = this.scene.calculateMoveRangeCore(robot, x, y, -1, false);

                this.scene.setBlackEffect(m);

                showMenu1(this);
            }
            else {

                //使用选择的武器攻击
                if (this.selectedRobot.selectedWeapon && this.selectedRobot.canAttackRobotUsingWeapon(robot, this.selectedRobot.selectedWeapon)) {

                    this.selectedRobot.attackDo(robot);

                }
                // //两个武器都能攻击时，显示菜单让玩家选择武器
                // else if (this.selectedRobot && this.selectedRobot.canAttackRobotUsingWeapon(robot, this.selectedRobot.weapon1)
                // 	&& this.selectedRobot.canAttackRobotUsingWeapon(robot, this.selectedRobot.weapon2))
                // {
                // 	log("both weapons can attack")
                // }
                // 只有武器1能攻击到时自动使用武器1
                else if (this.selectedRobot && this.selectedRobot.canAttackRobotUsingWeapon(robot, this.selectedRobot.weapon1)) {
                    this.selectedRobot.selectedWeapon = this.selectedRobot.weapon1;
                    this.selectedRobot.attackDo(robot);
                }
                // 只有武器2能攻击到时自动使用武器2
                else if (this.selectedRobot && this.selectedRobot.canAttackRobotUsingWeapon(robot, this.selectedRobot.weapon2)) {
                    this.selectedRobot.selectedWeapon = this.selectedRobot.weapon2;
                    this.selectedRobot.attackDo(robot);
                }
                else if (this.selectedRobot) {
                    this.selectedRobot.setNotActive();
                }
            }

            return true;
        }
        else {
            if (this.selectedRobot) {

                if (this.scene.canMoveTo(x, y)) {
                    this.selectedRobot.moveTo(x, y);
                    //this.selectedRobot = null;
                    this.scene.setBlackEffect(null);
                }


            }

            return false;
        }
    }

    this.setSelectedRobotInactive = function () {
        if (this.selectedRobot) {
            this.selectedRobot.afterMove = false;
            this.selectedRobot.selectedWeapon = false;
            this.selectedRobot = null;
        }

        this.scene.setBlackEffect(null);
        g_buttonManager.clear();
        g_buttonCanvasManager.clear();

    }

    this.setAllActive = function () {
        for (var i = 0; i < this.robots.length; ++i) {
            this.robots[i].setActive();
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            this.enemy[i].setActive();
        }
    }

}