var AI = function() {
    this.getAllAttackTargetRobots = function(robot, scene)
    {
        var robots = scene.robots;
        var enemysCanAttack = [];
        var enemys = robot.isPlayer ? robots.enemy : robots.robots;
        // 远程
        if (robot.weapon1) {
            for (var i = 0; i < enemys.length; ++i)
            {
               var enemy = enemys[i];
                    if (robot.canAttackRobotUsingWeapon(enemy, robot.weapon1)) {
                        enemy.tmp_ai_weapon1 = true;
                        enemysCanAttack.push(enemy);
                    }
                
                
            }
        }

        if (robot.weapon2) {
            for (var i = 0; i < enemys.length; ++i) {
                var enemy = enemys[i];
                    if (robot.canAttackRobotUsingWeapon(enemy, robot.weapon2)) {
                        enemy.tmp_ai_weapon2 = true;
                        enemysCanAttack.push(enemy);
                    }
                

            }
        }


        // 移动后近攻
        movemap = scene.calculateMoveRange(robot);

        for (var k = 0; k < enemys.length; ++k) {
            var enemy = enemys[k];
            var i = enemy.x;
            var j = enemy.y;

            if (movemap[i - 1][j] >= 0 && !scene.robots.getRobotAt(i - 1, j)
                || movemap[i + 1][j] >= 0 && !scene.robots.getRobotAt(i + 1, j)
                    || movemap[i][j - 1] >= 0 && !scene.robots.getRobotAt(i, j - 1)
                        || movemap[i][j + 1] >= 0 && !scene.robots.getRobotAt(i, j + 1) )
            {
                if (robot.weapon1.range == 1 && robot.weapon1.firepower[enemy.property.type] > 0) {
                    enemy.tmp_ai_weapon1 = true;
                    enemysCanAttack.push(enemy);

                }

                if (robot.weapon2.range == 1 && robot.weapon2.firepower[enemy.property.type] > 0) {
                    enemy.tmp_ai_weapon2 = true;
                    enemysCanAttack.push(enemy);
                }
            }
           
            
        }
                   

        return Array.from(new Set(enemysCanAttack));
    }


    this.getEnemy = function(scene, robot)
    {
        var robots = scene.robots;
        var max = -1;
        var m = scene.calculateMoveRangeCore(robot, robot.x, robot.y, 999, true, true);
        var enemys = robot.isPlayer ? robots.enemy : robots.robots;
        var result = null;
        for (var i = 0; i < enemys.length; ++i) {
            var enemy = enemys[i];
            if (m[enemy.x][enemy.y] > max)
            {
                max = m[enemy.x][enemy.y];
                result = enemy;
            }

        }
        
       return result;
    }
}

var AI = new AI();