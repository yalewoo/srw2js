var Battle = function(scene_main, robot, enemy) {
    this.scene = scene_main;
    this.robot = robot;
    this.enemy = enemy;

    this.DoAttack = function() {
        var robot = this.robot;
        var enemy = this.enemy;
        var weapon = this.robot.selectedWeapon;

        this.clearBattleText();

        this.showBattleText(robot.property.name + "攻击！")

        var enemy_weapon = this.getEnemyBackWeapon();

        var enemy_rate = this.calcRadio(enemy, enemy_weapon, robot);
        var player_rate = this.calcRadio(robot, weapon, enemy);

        this.showRobot(robot);
        this.showBattleTextSpan("      ");

        this.showRobot(enemy);

        var s = "我方状态：HP :" + robot.hp + "/" + robot.hp_total +  "命中 " + player_rate;
        this.showBattleText(s);

        s = "敌方状态：HP :" + enemy.hp + "/" + enemy.hp_total + "命中 " + enemy_rate;
        this.showBattleText(s);

        this.showPeople(robot);
        s = robot.pilot.name + "：打！";
        this.showBattleTextSpan(s);

        var stage = 0;

        if (this.prob(player_rate)) {
            var damage = this.getDamage(this.robot, this.enemy, this.robot.selectedWeapon);
            enemy.hp = Math.max(enemy.hp - damage, 0);

            s = enemy.property.robotName + "损坏 " + damage;
            this.showBattleText(s);

            this.showPeople(enemy);
            s = enemy.pilot.name + ": 被打中了!";
            this.showBattleTextSpan(s);

        }
        else {
            s = "攻击失败!";
            this.showBattleText(s);

        }

        if (enemy.hp > 0)
            ++stage;
        else
            stage = 3;


        if (stage == 1) {
            if (!enemy_weapon) {
                s = enemy.pilot.name + "无力反击";
                this.showBattleText(s);

                this.showPeople(enemy);

                s = enemy.pilot.name + "：便宜你了!";
                this.showBattleTextSpan(s);

            }
            else {
                s = enemy.pilot.name + "反击";
                this.showBattleText(s);

                

                if (this.prob(enemy_rate)) {
                    var damage = this.getDamage(this.enemy, this.robot, enemy_weapon);
                    robot.hp  = Math.max(robot.hp - damage, 0);

                    s = robot.property.robotName + "损坏 " + damage;
                    this.showBattleText(s);

                    this.showPeople(robot);

                    s = robot.pilot.name + ": 被打中了!";
                    this.showBattleTextSpan(s);

                }
                else {
                    s = "攻击失败!";
                    this.showBattleText(s);

                }

            }

            if (robot.hp > 0)
                ++stage;
            else {
                stage = 3;
            }
        }


        if (stage == 2) {
            if (enemy.hp > 0 && robot.speed - enemy.speed >= 50) {
                s = robot.property.robotName + "再次攻击";
                this.showBattleText(s);



                if (this.prob(player_rate)) {
                    var damage = this.getDamage(this.robot, this.enemy, this.robot.selectedWeapon);
                    enemy.hp = Math.max(enemy.hp - damage, 0);

                    s = enemy.property.robotName + "损坏 " + damage;
                    this.showBattleText(s);

                    this.showPeople(enemy);
                    s = enemy.pilot.name + ": 被打中了!";
                    this.showBattleTextSpan(s);

                }
                else {
                    s = "攻击失败!";
                    this.showBattleText(s);

                }

                ++stage;
            }
            else if (robot.hp >= 0 && enemy.speed - robot.speed >= 50 && enemy_weapon != 0) {
                s = enemy.property.robotName + "再次反击";
                this.showBattleText(s);

               

                if (this.prob(enemy_rate)) {
                    var damage = this.getDamage(this.enemy, this.robot, enemy_weapon);
                    robot.hp  = Math.max(robot.hp - damage, 0);

                    s = robot.property.robotName + "损坏 " + damage;
                    this.showBattleText(s);

                    this.showPeople(robot);

                    s = robot.pilot.name + ": 被打中了!";
                    this.showBattleTextSpan(s);

                }
                else {
                    s = "攻击失败!";
                    this.showBattleText(s);

                }

                ++stage;
            }

        }


        var s = "我方状态：HP :" + robot.hp + "/" + robot.hp_total + "命中 " + player_rate;
        this.showBattleText(s);

        s = "敌方状态：HP :" + enemy.hp + "/" + enemy.hp_total + "命中 " + enemy_rate;
        this.showBattleText(s);


    }

    this.getDamage = function(robot2, enemy2, weapon2)
    {
        var damage = robot2.strength + weapon2.firepower[enemy2.property.type] - enemy2.defense;
        if (robot2.spirit[10]) {
            damage *= 2;
        }
        if (robot2.spirit[4]) {
            damage *= 2;
        }

        if (enemy2.spirit[3]) {
            damage /= 2;
        }
        return damage;
    }

    this.prob = function(p)
    {
        var newp = Math.random() * 100;
        log(newp)
        log(p)
        if (newp < p)
            return true;
        else
            return false;
    }

    this.getEnemyBackWeapon = function()
    {
        if (this.enemy.canAttackRobotUsingWeapon(this.robot, this.enemy.weapon1))
        {
            if (this.enemy.canAttackRobotUsingWeapon(this.robot, this.enemy.weapon2))
            {
                if (this.enemy.weapon1.firepower[this.robot.property.type] > this.enemy.weapon2.firepower[this.robot.property.type])
                    return this.enemy.weapon1;
                else
                    return this.enemy.weapon2;
            }
            else
                return this.enemy.weapon1;
        }
        if (this.enemy.canAttackRobotUsingWeapon(this.robot, this.enemy.weapon2))
        {
            return this.enemy.weapon2;
        }
        return null;
    }

    this.calcRadio = function(robot2, weapon2, enemy2)
    {
        if (!weapon2)
            return 0;

        if (enemy2.spirit[8])  //使用回避精神
            return 0;

        var base = robot2.speed + weapon2.hitRadio - enemy2.speed;


        var typeRadio;
        if (enemy2.property.type == 2) {
            typeRadio = 1;
        }
        else {
            typeRadio = g_typeRadioTable[this.scene.map.maprects[enemy2.x][enemy2.y].kind];
        }


        var distanceRadio;
        var d = this.scene.map.calcDistance(robot2, enemy2);
        if (d <= 1) {
            distanceRadio = 1;
        }
        else {
            distanceRadio = 1 - 0.05 * (d - 2);
        }

        var res = base * typeRadio * distanceRadio;

        if (robot2.spirit[2])
            res += 10;

        if (res > 100)
            res = 100;

        return res;
    }


    this.showBattleText = function (text) {
        var html = "<p>" + text + "</p>";
        var d = document.getElementById("attack_data");
        d.innerHTML += html;

        d.style.display = "block";
    }
    this.showBattleTextSpan = function (text) {
        var html = "<span> " + text + "</span>";
        var d = document.getElementById("attack_data");
        d.innerHTML += html;

        d.style.display = "block";
    }

    this.showPic = function(img)
    {
        var d = document.getElementById("attack_data");
        d.appendChild(img);
    }

    this.showPeople = function(robot) {
        this.showPic(g_resourceManager.img_people_image[robot.pilot.id]);

    }
    this.showRobot = function (robot) {
        this.showPic(g_resourceManager.img_robot_image[robot.robot_id]);
    }

    this.clearBattleText = function () {
        var d = document.getElementById("attack_data");
        d.innerHTML = "";
    }
}




