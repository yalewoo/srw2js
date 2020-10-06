var Robots = function (scene_main) {
    this.scene = scene_main;
    var context2D = scene_main.context2D;

    this.robots = []
    this.robots_dead = []
    this.enemy = []

    this.deleteRobot = function (robot) {
        var index = this.robots.indexOf(robot);
        if (index > -1) {
            this.robots.splice(index, 1);
            this.robots_dead.push(robot);
        }

        index = this.enemy.indexOf(robot);
        if (index > -1) {
            this.enemy.splice(index, 1);
        }
    }

    this.setRobotToLast = function (robot) {
        var index = this.robots.indexOf(robot);
        if (index > -1) {
            this.robots.splice(index, 1);
            this.robots.push(robot);
        }

        index = this.enemy.indexOf(robot);
        if (index > -1) {
            this.enemy.splice(index, 1);
            this.enemy.push(robot);
        }
    }


    this.context2D = context2D;
    this.loadStage = function (stage) {


        var stage_robot = g_stages[stage].robot_init;
        this.addRobot(stage_robot);

        stage_robot = g_stages[stage].enemy_init;
        this.addEnemy(stage_robot);
    }

    this.loadStage_setExp = function(exps) {
        for (var i = 0; i < this.robots.length; ++i) {
            var robot = this.robots[i];
            var people = robot.people;
            if (exps[people] != undefined) {
                robot.getExp(exps[people]);
                robot.InitValue();
            }
        }
    }
    this.loadStage_getExp = function() {

        var s = {};
        for (var i = 0; i < this.robots.length; ++i) {
            var robot = this.robots[i];
            var exp = robot.exp;
            var people = robot.people;
            if (people == 8 || people == 9 || people == 10)
            {
                s[8] = exp;
                s[9] = exp;
                s[10] = exp;
            }
            else
            {
                s[people] = exp;
            }
        }

        for (var i = 0; i < this.robots_dead.length; ++i) {
            var robot = this.robots_dead[i];
            var exp = robot.exp;
            var people = robot.people;
            if (people == 8 || people == 9 || people == 10) {
                s[8] = exp;
                s[9] = exp;
                s[10] = exp;
            }
            else {
                s[people] = exp;
            }
        }

        return s;
    }

    this.addRobot = function (stage_robot) {
        for (var i = 0; i < stage_robot.length; ++i) {
            var robot_stage_data = stage_robot[i];
            var o = {}
            o.isPlayer = 1;
            //x,y,编号,机师,机师名,机体,机体名
            // [12,16,1,6,"大卫" ,126,"刚达"]
            o.x = robot_stage_data[0]+1;
            o.y = robot_stage_data[1]+1;
            o.people = robot_stage_data[2];
            o.robot_id = robot_stage_data[3];
            o.exp = robot_stage_data[4];
            if (o.exp == undefined) {
                o.exp = this.scene.getSavedExp(o.people);
            }

            o.active = true;
	        o.spirit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        
            var robot = new Robot(o, scene_main, isEnemy = false);
            robot.updateLevel();
            robot.InitValue();
            this.robots.push(robot);
        }
    }
    this.addEnemy = function (stage_robot) {
        for (var i = 0; i < stage_robot.length; ++i) {
            var robot_stage_data = stage_robot[i];
            var o = {}
            o.isPlayer = 0;
            //x,y,机师,机体,等级,智商
            o.x = robot_stage_data[0]+1;
            o.y = robot_stage_data[1]+1;
            o.people = robot_stage_data[2];    
            o.robot_id = robot_stage_data[3];
            o.level = robot_stage_data[4] + 1;
            o.robotBehavior = Number(robot_stage_data[5]);
            o.active = true;
	        o.spirit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        
            var robot = new Robot(o, scene_main, isEnemy = true);
            robot.updateLevel();
            robot.InitValue();

            this.enemy.push(robot);
        }
    }

    this.getRobotRuntimeArr = function() {
        var arr = [];
        for (var i = 0; i < this.robots.length; ++i) {
            var robot = this.robots[i];
            var robotData = robot.getRunTimeRobotData();
            arr.push(robotData);
        }

        for (var i = 0; i < this.robots_dead.length; ++i) {
            var robot = this.robots_dead[i];
            var robotData = robot.getRunTimeRobotData();
            robotData.isDead = true;
            arr.push(robotData);
        }

        for (var i = 0; i < this.enemy.length; ++i) {
            var robot = this.enemy[i];
            var robotData = robot.getRunTimeRobotData();
            arr.push(robotData);
        }
        return arr;
    }
    this.addRobotsRuntime = function(arr) {
        for (var i = 0; i < arr.length; ++i)
        {
            if (arr[i].people == 54)
                this.addRobotRuntime(arr[i]);
        }
        for (var i = 0; i < arr.length; ++i)
        {
            if (arr[i].people != 54)
                this.addRobotRuntime(arr[i]);
        }
    }
    this.addRobotRuntime = function(runtimeData) {
        var robot;
        if (runtimeData.isDead)
        {
            robot = new Robot(runtimeData, scene_main, isEnemy = false);
            robot.updateLevel();
            this.robots_dead.push(robot);
        }
        else if (runtimeData.isPlayer)
        {
            robot = new Robot(runtimeData, scene_main, isEnemy = false);
            robot.updateLevel();
            this.robots.push(robot);
        }
        else
        {
            robot = new Robot(runtimeData, scene_main, isEnemy = true);
            robot.updateLevel();
            this.enemy.push(robot);
        }
        
        robot.hp = runtimeData.hp;
        robot.pilot.spirit = runtimeData.people_spirit;
        if (runtimeData.inMainShip)
        {
            var captain = this.getRobotByPeopleId(runtimeData.inMainShip);
            robot.inMainShip = captain;
            captain.passengers.push(robot);

        }
    }

    this.getRobotByPeopleId = function(id) {
        for (var i = 0; i < this.robots.length; ++i) {
                if (this.robots[i].pilot.id == id)
                {
                    return this.robots[i];
                }                
            
        }
        for (var i = 0; i < this.enemy.length; ++i) {
                if (this.enemy[i].pilot.id == id)
                {
                    return this.enemy[i];
                } 
            
        }
        return null;
    }

    this.addEnemyAni = function(stage_robot, i, callback)
    {
        if (i < stage_robot.length)
        {
            var robot_stage_data = stage_robot[i];
            var o = {}
            o.isPlayer = 0;
            //x,y,机师,机体,等级,智商,机师名,机体名,智商,图标
            //[8,3,3,54,1,5,"士兵" ,"乍克" ,"8",32],
            o.x = robot_stage_data[0]+1;
            o.y = robot_stage_data[1]+1;
            o.people = robot_stage_data[2];   
            o.robot_id = robot_stage_data[3];
            o.level = robot_stage_data[4] + 1;
            o.robotBehavior = Number(robot_stage_data[5]);
            o.active = true;
            o.spirit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            
            var robot = new Robot(o, scene_main, isEnemy = true);
            robot.updateLevel();
            robot.InitValue();

            this.scene.hoverData = [robot.x, robot.y];

            var self = this;
            this.scene.game.addTimer(0.3, function() {
                self.enemy.push(robot);
                self.addEnemyAni(stage_robot, i+1, callback);
            })

        }
        else
        {
            this.scene.game.addTimer(0.3, function () {
                callback();
            })
            
        }
        
    }

    this.addRobotAni = function(stage_robot, i, callback)
    {
        if (i < stage_robot.length)
        {
            var robot_stage_data = stage_robot[i];
            var o = {}
            o.isPlayer = 1;
            //x,y,机师,机体,exp
            o.x = robot_stage_data[0]+1;
            o.y = robot_stage_data[1]+1;
            o.people = robot_stage_data[2];   
            o.robot_id = robot_stage_data[3];

            o.exp = robot_stage_data[4];

            if (o.exp == undefined) {
                o.exp = this.scene.getSavedExp(o.people);
            }

            o.robotBehavior = 0;


            
            o.active = true;
            o.spirit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            
            var robot = new Robot(o, scene_main);
            robot.updateLevel();
            robot.InitValue();

            this.scene.hoverData = [robot.x, robot.y];

            var self = this;
            this.scene.game.addTimer(0.3, function() {
                self.robots.push(robot);
                self.addRobotAni(stage_robot, i+1, callback);
            })

        }
        else
        {
            callback();
        }
        
    }

    this.updateForNewTurn = function() {
        for (var i = 0; i < this.robots.length; ++i) {
            var robot = this.robots[i];
            robot.spirit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            if (this.scene.map.isSupply(robot.x, robot.y) || robot.inMainShip)
            {
                
                var hp = Math.floor(robot.hp_total * 0.3);
                robot.addHp(hp); 
            }

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
        for (var i = 0; i < this.robots.length; ++i) {
            this.robots[i].draw();
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            this.enemy[i].draw();
        }
    }

    this.mousehoverHandler = function (x, y) {
        return;
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
                if (this.robots[i].inMainShip && !this.robots[i].drawIgnoreMainShip)
                {

                }
                else
                {
                    return this.robots[i];
                }
                
            }
        }
        for (var i = 0; i < this.enemy.length; ++i) {
            if (this.enemy[i].x == x && this.enemy[i].y == y) {
                if (this.enemy[i].inMainShip)
                {

                }
                else
                {
                    return this.enemy[i];
                }
            }
        }
        return null;
    }

    this.setSelectedRobotInactive = function () {
        if (this.selectedRobot) {
            this.selectedRobot.afterMove = false;
            this.selectedRobot.selectedWeapon = false;
            this.selectedRobot = null;
        }

        this.scene.setBlackEffect(null);
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
    this.setAllSpirit = function () {
        for (var i = 0; i < this.robots.length; ++i) {
            this.robots[i].spirit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        
    }

    this.checkCondition = function (checkData) {
        if (checkData) {
            if (checkData.type == "hpLessThan") {
                var pid = checkData.peopleId;
                var hpTarget = checkData.hpTarget;
                var robot = this.getRobotByPeopleId(pid);
                if (robot.hp < hpTarget) {
                    return true;
                }
            }
            else if (checkData.type == "hpLessThanMax") {
                var pid = checkData.peopleId;
                var hpTarget = checkData.hpTarget;
                var robot = this.getRobotByPeopleId(pid);
                if (robot.hp < robot.hp_total) {
                    return true;
                }
            }
        }
        return true;
    }

    this.quanxiang = function (robot, enemy) {
        this.scene.setBlackEffect(null);
        
        robot.setNotActive();
        robot.setActive();

        var stage = this.scene.stage;

        if (!this.checkCondition(g_stages[stage].quanxiang.check)) {           
            var talk_data = g_stages[stage].quanxiang.talks2;
            this.scene.talkDiag = new TalkDiag(game, talk_data);
            var self = this;
            this.scene.talkDiag.setFinishHandler(function () {
                self.scene.talkDiag.clear();
                self.scene.talkDiag = null;
                robot.setNotActive();               
            })
            return;
        }

        var talk_data = g_stages[stage].quanxiang.talks;
        var newrobot = g_stages[stage].quanxiang.robot;
        this.scene.talkDiag = new TalkDiag(game, talk_data);
        var self = this;
        this.scene.talkDiag.setFinishHandler(function () {
            self.scene.talkDiag.clear();
            self.scene.talkDiag = null;

            self.deleteRobot(enemy);

            var o = {}
            o.isPlayer = 1;
            //x,y,编号,机师,机师名,机体,机体名
            // [12,16,1,6,"大卫" ,126,"刚达"]
            o.x = enemy.x;
            o.y = enemy.y;
            o.people = enemy.people;
            o.robot_id = newrobot["id"];
            o.exp = newrobot["exp"];

            o.active = true;
            o.spirit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

            var robot = new Robot(o, scene_main, isEnemy = false);
            robot.updateLevel();
            robot.InitValue();
            self.robots.push(robot);
        })

        
    }

}
