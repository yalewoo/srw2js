var Robot = function (robotData, scene_main) {
	this.scene = scene_main;
	var context2D = scene_main.context2D;
	this.context2D = context2D;

	this.passengers = [];
	this.inMainShip = null;
	this.removePassenger = function(r)
	{
		for (var i = this.passengers.length - 1; i >= 0; i--) {
			if (this.passengers[i] == r){
				this.passengers.splice(i, 1);
			}
		}
	}
	
	

	this.isPlayer = robotData.isPlayer;
	//关数,回合,x,y,机师,机体,等级,智商,机师名,机体名,智商,图标
	//[1,1,8,3,3,54,1,5,"士兵" ,"乍克" ,"8",32],
	this.x = robotData.x;
	this.y = robotData.y;
	this.robot_id = robotData.robot_id;
	this.people = robotData.people;
	
	this.level = robotData.level;
	this.robotBehavior = robotData.robotBehavior;
	this.active = robotData.active;

	this.spirit = robotData.spirit;


	if (this.isPlayer)
	{
		this.img = g_resourceManager.get_img_roboticon(this.robot_id);

	}
	else
	{
		this.img = g_resourceManager.get_img_enemyicon(this.robot_id);
	}
	

	this.TargetX = this.x;
	this.TargetY = this.y;
	this.inMove = false;
	this.afterMove = false;

	this.property = new RobotProperty(this.robot_id);
	this.pilot = new Pilot(this.people);

	this.weapon1 = new Weapon(this.property.weapon1id);
	this.weapon2 = new Weapon(this.property.weapon2id);

	this.exp = 0;
	

	// 实际五维，精神加成之后

	this.t_move = function () {   //机动
		if (this.spirit[7]) return this.move + 5;
		if (this.spirit[1]) return this.move + 3;
		return this.move;
	}

	
	this.t_strength = function () { //强度
		return this.strength;
	}
	this.t_defense = function () { //防卫
		return this.defense;
	}
	this.t_speed = function () { //速度
		return this.speed;
	} 

	this.addHp = function(hp)
	{
		if (this.hp == this.hp_total)
		{
			return;

		}
		this.scene.game.musicManager.PlayOnceFromStart("recover");

		hp = Math.floor(hp);
		var oldhp = this.hp;
		this.hp = this.hp + hp > this.hp_total ? this.hp_total : this.hp + hp;

		var ani = new TextAnimation(this.scene, this.x, this.y, "+" + (this.hp - oldhp));
		this.scene.addAnimation(ani);
	}


	this.moveSpeedUI = 4;
	this.update = function () {
		var inMoveOld = this.inMove;
		if (this.xFloat < 0) {
			this.xFloat += this.moveSpeedUI;
			this.xFloat = Math.min(this.xFloat, 0)
		}
		else if (this.xFloat > 0) {
			this.xFloat -= this.moveSpeedUI;
			this.xFloat = Math.max(this.xFloat, 0)

		}
		else if (this.yFloat < 0) {
			this.yFloat += this.moveSpeedUI;
			this.yFloat = Math.min(this.yFloat, 0)

		}
		else if (this.yFloat > 0) {
			this.yFloat -= this.moveSpeedUI;
			this.yFloat = Math.max(this.yFloat, 0)

		}
		else
		{
			this.inMove = false;
			if (inMoveOld != this.inMove)
			{
				this.moveFinished(this.x, this.y);
			}
		}
	}
	this.draw = function() {

		if (this.inMainShip && !this.drawIgnoreMainShip)
		{
			return;
		}
		if (this.img.isloaded)
		{
			if (this.inMove)
			{
				this.context2D.drawImage(this.img, this.x*32 - this.xFloat, this.y*32 - this.yFloat, this.img.width, this.img.height);

			}
			else
			{
				this.context2D.drawImage(this.img, this.x * 32, this.y * 32, this.img.width, this.img.height);

			}


			if (!this.active)
			{
				var imgdata = this.context2D.getImageData(this.x * 32, this.y * 32, this.img.width, this.img.height);
				//console.log(imgdata);
				imgdata = toGray(imgdata);//灰白滤镜
				this.context2D.putImageData(imgdata, this.x * 32, this.y * 32);

				// var ctx = this.context2D;
				// ctx.fillColor = 'rgba(66, 66, 66, 0.5)';

				// ctx.fillRect(this.x * 32, this.y * 32, this.img.width, this.img.height, false);

			}
		}

	}

	this.moveTo = function (x, y, callback) {

		this.scene.hoverData = null;

		this.xOriginal = this.x;
		this.yOriginal = this.y;
		this.xFloat = (x - this.x) * 32;
		this.yFloat = (y - this.y) * 32;
		this.x = x;
		this.y = y;
		this.inMove = true;
		this.moveToCallback = callback;
	}

	this.moveFinished = function(x, y) {
		if (this.inCancelMove)
		{
			this.afterMove = false;
			this.inCancelMove = false;
			var m = this.scene.calculateMoveRangeCore(this, x, y, -1, false, false);

			this.scene.setBlackEffect(m);

			if (this.drawIgnoreMainShip)
			{
				this.drawIgnoreMainShip = false;
			}

			showMenu1(this.scene.robots);


		}
		else if (this.inAIMove)
		{
			this.afterMove = false;
			this.inAIMove = false;

		}
		else{
			this.afterMove = true;
			var m = this.scene.calculateMoveRangeCore(this, x, y, 1, true, true);

			this.scene.setBlackEffect(m);
			showMenu1(this.scene.robots);
		}

		if (this.passengers.length > 0)
		{
			for (var i = 0; i < this.passengers.length; ++i)
			{
				this.passengers[i].x = this.x;
				this.passengers[i].y = this.y;
				
			}
		}

		if (this.moveToCallback)
		{
			this.moveToCallback();
		}


		
	}
	
	this.canAttack = function(weapon) {
		var m = this.scene.calculateMoveRangeCore(this, this.x, this.y, weapon.range, true, true);

		for (var i = 0; i < m.length; ++i) {
			for (var j = 0; j < m[i].length; ++j) {
				if (m[i][j] >= 0) {
					if (weapon.range > 1 && m[i][j] == weapon.range - 1)
					{
						continue;
					}

					var x = i;
					var y = j;

					var enemy = this.scene.robots.getRobotAt(x, y);
					if (enemy && enemy != this && enemy.isPlayer != this.isPlayer &&
						weapon.firepower[enemy.property.type] > 0)
						{
							return enemy;
						}

					//修理装置
					if (weapon.id == 164 && enemy && enemy.isPlayer == this.isPlayer && enemy.hp < enemy.hp_total) {
						return enemy;
					}
				}
			}
		}
		return null;
	}

	this.canAttackRobotUsingWeapon = function(robot, weapon) 	{
		var m = this.scene.calculateMoveRangeCore(this, this.x, this.y, weapon.range, true, true);

		var i = robot.x;
		var j = robot.y;

		if (m[i][j] >= 0) {
			if (weapon.range > 1 && m[i][j] == weapon.range - 1) {
				return false;
			}


			var enemy = robot;
			if (enemy && enemy != this && enemy.isPlayer != this.isPlayer &&
				weapon.firepower[enemy.property.type] > 0) 
			{
				return true;
			}

			//修理装置
			if (weapon.id == 164 && enemy && enemy.isPlayer == this.isPlayer && enemy.hp < enemy.hp_total) {
				return true;
			}
		}

		return false;
	}


	this.canAttack1 = function() {
		return this.canAttack(this.weapon1);
	}
	this.canAttack2 = function () {
		return this.canAttack(this.weapon2);
	}

	this.attack1 = function() {
		log("attack1")
		this.selectedWeapon = this.weapon1;
		var m = this.scene.calculateMoveRangeCore(this, this.x, this.y, this.selectedWeapon.range, true, true);
		this.scene.setBlackEffect(m);
		g_buttonManager.clear();
	}

	this.attack2 = function () {
		this.selectedWeapon = this.weapon1;
		var m = this.scene.calculateMoveRangeCore(this, this.x, this.y, this.selectedWeapon.range, true, true);
		this.scene.setBlackEffect(m);
		g_buttonManager.clear();
	}

	this.attackDo = function(enemy)
	{
		var self = this;

		if (this.isPlayer == enemy.isPlayer && this.selectedWeapon.id == 164)
		{
			enemy.addHp(this.hp_total / 2);

			this.setNotActive();
		}
		else
		{
			this.scene.startAttackArrow(this.x, this.y, enemy.x, enemy.y, function () {
				var scene_main = self.scene;

				var scene_battle = new SceneBattle(self.scene, self, enemy);

				scene_battle.setFinishHandler(function () {
					self.scene.game.scene = scene_main;
					self.setNotActive();
					if (enemy.hp <= 0) {
						scene_main.game.musicManager.PlayOnceFromStart("boom");

						var ani = new AnimationBoom(scene_main, enemy.x, enemy.y, 1, 24, function() {
							scene_main.robots.deleteRobot(enemy);
							scene_main.checkEvent();
						});
						scene_main.addAnimation(ani);
						
					}
					if (self.hp <= 0) {
						scene_main.game.musicManager.PlayOnceFromStart("boom");

						var ani = new AnimationBoom(scene_main, self.x, self.y,1, 24, function() {
							scene_main.robots.deleteRobot(self);
							scene_main.checkEvent();

						});
						scene_main.addAnimation(ani);
					}

				});
				self.scene.game.scene = scene_battle;
			})
		}
		
	}

	this.setNotActive = function()
	{
		

		this.active = false;
		if (this.drawIgnoreMainShip)
		{
			this.inMainShip.removePassenger(this);
			this.inMainShip = null;
			this.drawIgnoreMainShip = undefined;

		}
		if (this.scene.robots.selectedRobot == this)
		{
			this.scene.robots.setSelectedRobotInactive();
		}

		if (this.setNotActiveCallbackOnce)
		{
			this.setNotActiveCallbackOnce();
			this.setNotActiveCallbackOnce = null;
		}
	}
	this.setActive = function()
	{
		this.active = true;
	}

	this.getExp = function(exp) {
		if (exp)
		{
			this.exp += Math.floor(exp);
			this.updateLevel();
		}
		
	}

	this.getExp(robotData.exp);
	
}


Robot.prototype.getLevelPropertyPlus = function(plusType, level)
{
	/*  0 +1.5向上取整
		1 +2
		2 +5
		3 +10
		4 麦塔斯速度专用 公式未知
		5 貌似未使用
		6 导弹专属 未知
		7 +2.5向下取整
		8 +3*/
	level = level - 1;
	switch (plusType) {
		case 0:
			return Math.ceil(level * 1.5);
		case 1:
			return (level * 2);
		case 2:
			return (level * 5);
		case 3:
			return (level * 10);
		case 4:
			return (level * 1.5);
		case 5:
			return (level * 1.5);
		case 6:
			return (level * 1.5);
		case 7:
			return Math.floor(level * 2.5) - 1;
		case 8:
			return (level * 3);
		default:
			return level * 1.5;
	}
}

Robot.prototype.updateLevel = function () {
	if (this.isPlayer == 1) {
		var i = 1;
		while (this.exp >= g_robot_exp_table[i]) {
			++i;
		}
		this.level = i;
	}
	else {

	}


	this.hp_total = this.property.robot_hp0 + this.pilot.hp + this.getLevelPropertyPlus(this.property.robot_hp_plus, this.level);
	this.move = this.property.robot_move0 + this.pilot.move;
	this.speed = this.property.robot_speed0 + this.pilot.speed + this.getLevelPropertyPlus(this.property.robot_speed_plus, this.level);
	this.strength = this.property.robot_strength0 + this.pilot.strength + this.getLevelPropertyPlus(this.property.robot_strength_plus, this.level);
	this.defense = this.property.robot_defense0 + this.pilot.defense + this.getLevelPropertyPlus(this.property.robot_defense_plus, this.level);
}

Robot.prototype.InitValue = function () {
	if (this.isPlayer)
	{
	}
	else
	{
		this.exp = 0;
	}
	this.hp = this.hp_total;


}


Robot.prototype.AI_action = function () {
	var selectedRobot = this;
	var scene = selectedRobot.scene;
	//if (selectedRobot.robotBehavior && scene.round < selectedRobot.robotBehavior) {
	if (false)
		{
		var enemy = null;
		if (enemy = selectedRobot.canAttack1()) {
			selectedRobot.selectedWeapon = selectedRobot.weapon1;
			selectedRobot.attackDo(enemy);
			return;
		}
		else if (enemy = selectedRobot.canAttack2()) {
			selectedRobot.selectedWeapon = selectedRobot.weapon2;
			selectedRobot.attackDo(enemy);
			return;
		}
		else {
			scene.robots.setSelectedRobotInactive();
		}
		return;
	}


	// get All robots that can attack
	var enemys = AI.getAllAttackTargetRobots(selectedRobot, scene);
	// Select one target
	// 1. 可以一击击落的机体
	// 2. 造成伤害最高的机体
	var target = null;
	var maxDamage = 0;
	for (var i = 0; i < enemys.length; ++i)
	{
		var enemy = enemys[i];

		var damage1 = 0;
		var damage2 = 0;
		if (enemy.tmp_ai_weapon1) {
			damage1 = BattleCanvas.getDamage(selectedRobot, enemy, selectedRobot.weapon1);
		}
		if (enemy.tmp_ai_weapon2) {
			damage2 = BattleCanvas.getDamage(selectedRobot, enemy, selectedRobot.weapon2);
		}

		if (damage1 > enemy.hp) {
			target = enemy;
			selectedRobot.selectedWeapon = selectedRobot.weapon1;
			break;
		}
		if (damage2 > enemy.hp) {
			target = enemy;
			selectedRobot.selectedWeapon = selectedRobot.weapon2;
			break;
		}

		var damage = Math.max(damage1, damage2);
		if (damage > maxDamage) {
			maxDamage = damage;
			selectedRobot.selectedWeapon = damage1 > damage2 ? selectedRobot.weapon1 : selectedRobot.weapon2;
			target = enemy;
		}
	}


	if (target) {
		// 攻击目标
		// 无须移动的情况
		
		if (selectedRobot.canAttackRobotUsingWeapon(target, selectedRobot.selectedWeapon)) {
			selectedRobot.attackDo(target);
		}
		else {
			// 先移动在攻击
			var m = scene.calculateMoveRange(selectedRobot);
			var x = target.x;
			var y = target.y;
			var target_x = x;
			var target_y = y;
			var canAttack = true;
		
			if (m[x][y - 1] >= 0 && !scene.robots.getRobotAt(x,y - 1)) target_y = y - 1;
			else if (m[x][y + 1] >= 0 && !scene.robots.getRobotAt(x,y + 1)) target_y = y + 1;
			else if (m[x - 1][y] >= 0 && !scene.robots.getRobotAt(x - 1,y)) target_x = x - 1;
			else if (m[x + 1][y] >= 0 && !scene.robots.getRobotAt(x + 1,y)) target_x = x + 1;
			else {
				//不能攻击了
				canAttack = false;
			}

			g_buttonManager.clear();

			if (canAttack) {
				selectedRobot.inAIMove = true;

				selectedRobot.moveTo(target_x, target_y, function() {
					selectedRobot.attackDo(target);
					selectedRobot.setNotActive();
				});

			}
			else {
				scene.AI_move(selectedRobot, function() {
					selectedRobot.setNotActive();
					selectedRobot.selectedWeapon = null;
				});

				

			}

		}
	}
	else {
		// 移动后无法攻击
		scene.AI_move(selectedRobot, function() {
			selectedRobot.setNotActive();
			selectedRobot.selectedWeapon = null;
		});

		
	}

}



Robot.prototype.use_sprit_begin = function (id) {
	this.pilot.spirit -= g_spirit_consume_table[id];

	this.spirit[id] = true;

}
Robot.prototype.use_sprit_end = function (id) {
	this.scene.undoSelectedRobot();
}

Robot.prototype.use_sprit_0 = function ()	//毅力
{
	this.use_sprit_begin(0);

	log("use_sprit_0");
	this.addHp(50);

	this.use_sprit_end(0);
}
Robot.prototype.use_sprit_1 = function ()	//加速
{
	this.use_sprit_begin(1);

	log("use_sprit_1");


	this.use_sprit_end(1);
}
Robot.prototype.use_sprit_2 = function ()	//瞄准
{
	this.use_sprit_begin(2);

	log("use_sprit_2");


	this.use_sprit_end(2);
}
Robot.prototype.use_sprit_3 = function ()	//防守
{
	this.use_sprit_begin(3);

	log("use_sprit_3");


	this.use_sprit_end(3);
}
Robot.prototype.use_sprit_4 = function ()	//强攻
{
	this.use_sprit_begin(4);

	log("use_sprit_4");


	this.use_sprit_end(4);
}
Robot.prototype.use_sprit_5 = function ()	//友情
{
	this.use_sprit_begin(5);

	log("use_sprit_5");


	this.use_sprit_end(5);
}
Robot.prototype.use_sprit_6 = function ()	//必杀
{
	this.use_sprit_begin(6);

	log("use_sprit_6");


	this.use_sprit_end(6);
}
Robot.prototype.use_sprit_7 = function ()	//疾风
{
	this.use_sprit_begin(7);

	log("use_sprit_7");


	this.use_sprit_end(7);
}
Robot.prototype.use_sprit_8 = function ()	//回避
{
	this.use_sprit_begin(8);

	log("use_sprit_8");


	this.use_sprit_end(8);
}
Robot.prototype.use_sprit_9 = function ()	//潜力
{
	this.use_sprit_begin(9);

	log("use_sprit_9");

	var hp_plus = this.hp_total - this.hp;
	this.addHp(hp_plus);


	this.use_sprit_end(9);
}
Robot.prototype.use_sprit_10 = function ()	//热血
{
	this.use_sprit_begin(10);

	log("use_sprit_10");


	this.use_sprit_end(10);
}
Robot.prototype.use_sprit_11 = function ()	//情义
{
	this.use_sprit_begin(11);

	log("use_sprit_11");


	this.use_sprit_end(11);
}
Robot.prototype.use_sprit_12 = function ()	//传真
{
	this.use_sprit_begin(12);

	log("use_sprit_12");


	this.use_sprit_end(12);
}
Robot.prototype.use_sprit_13 = function ()	//援助
{
	this.use_sprit_begin(13);

	log("use_sprit_13");


	this.use_sprit_end(13);
}
Robot.prototype.use_sprit_14 = function ()	//怒
{
	this.use_sprit_begin(14);

	log("use_sprit_14");


	this.use_sprit_end(14);
}
Robot.prototype.use_sprit_15 = function ()	//祈祷
{
	this.use_sprit_begin(15);

	log("use_sprit_15");


	this.use_sprit_end(15);
}
Robot.prototype.use_sprit_16 = function ()	//干扰
{
	this.use_sprit_begin(16);

	log("use_sprit_16");


	this.use_sprit_end(16);
}
Robot.prototype.use_sprit_17 = function ()	//狂怒
{
	this.use_sprit_begin(17);

	log("use_sprit_17");


	this.use_sprit_end(17);
}
Robot.prototype.use_sprit_18 = function ()	//爱心
{
	this.use_sprit_begin(18);

	log("use_sprit_18");
}


Robot.prototype.canUseSpirit = function(id)
{
	if (this.inMainShip)
		return false;

	switch (id) {
		case 0: return this.hp < this.hp_total;
		case 1: return true;
		case 2: return true;
		case 3: return true;
		case 4: return true;
		case 5: return true;
		case 6: return true;
		case 7: return true;
		case 8: return true;
		case 9: return true;
		case 10: return true;
		case 11: return true;
		case 12: return true;
		case 13: return true;
		case 14: return true;
		case 15: return true;
		case 16: return true;
		case 17: return true;
		case 18: return true;
		default: break;
	}
}


Robot.prototype.canTransform = function()
{
	var lists = [];
	var id2 = this.robot_id;


	if ((this.property.type_original & 0x0c) == 0) {
		return lists;
	}
	var index = this.property.type_original & 0x30;
	while (1) {
		var prev = new RobotProperty(--id2);
		if ((prev.type_original & 0x0c) == (this.property.type_original & 0x0c)) {
			var prev_index = prev.type_original & 0x30;
			if (prev.robot_move0 == 0 || prev_index >= index)
				break;
			lists.push(prev);
		}
		else {
			break;
		}
	}
	id2 = this.robot_id;
	while (1) {
		var prev = new RobotProperty(++id2);
		if ((prev.type_original & 0x0c) == (this.property.type_original & 0x0c)) {
			var prev_index = prev.type_original & 0x30;
			if (prev.robot_move0 == 0 || prev_index <= index)
				break;
			lists.push(prev);
		}
		else {
			break;
		}
	}
	return lists;
}

Robot.prototype.transform = function(property2)
{
	this.robot_id = property2.id;
	this.property = property2;

	this.img = g_resourceManager.get_img_roboticon(this.robot_id);

	this.weapon1 = new Weapon(this.property.weapon1id);
	this.weapon2 = new Weapon(this.property.weapon2id);

	// 盖塔变形同时换驾驶员
	if ((this.property.type_original & 0x0c) == 0x08) {
		var exp = this.exp;
		
		if (this.property.type_original >> 4 == 3) {
			this.setPilot(10);
		}
		else if (this.property.type_original>> 4 == 2) {
			this.setPilot(9);
		}
		else if (this.property.type_original>> 4 == 1) {
			this.setPilot(8);
		}
		this.exp = exp;
	}


	this.updateLevel();

	showMenu1(this.scene.robots);

}

Robot.prototype.setPilot = function(id)
{
	var oldSpirit = this.pilot.spirit;
	this.people = id
	this.pilot = new Pilot(this.people);
	this.pilot.spirit = oldSpirit;
}


var RobotProperty = function (id) {
	this.id = id;

	var data = g_robot_data[id];

	this.exp_dievalue = data[13];  //本机死亡带来的固定经验
	this.money = data[10];  //金钱

	//基本属性

	this.robotName = data[1];  //机体名
	this.name = data[1];  //机体名
	this.type_original = data[3];//原始类型
	this.type = data[3] & 3;   //类型 0=空，1=陆，2=海

	this.img_id = data[20]; //图标id

	//等级1时数据
	this.robot_move0 = data[6];   //机动
	this.robot_hp0 = data[19]; //Hp
	this.robot_strength0 = data[8];   //强度
	this.robot_defense0 = data[9];    //防卫
	this.robot_speed0 = data[7];  //速度
	//成长方式
	this.robot_hp_plus = data[18]; //Hp
	this.robot_strength_plus = data[16];   //强度
	this.robot_defense_plus = data[17];    //防卫
	this.robot_speed_plus = data[15];  //速度


	//武器Id
	this.weapon1id = data[24];
	this.weapon2id = data[25];
};

var Pilot = function (id) {
	this.id = id;
	var t = g_people_data[id];

	this.name = t[1];


	this.spirit_total0 = t[2];
	this.spirit = this.spirit_total0;

	this.spirit_increase = t[3];

	this.spirit_table = [];
	for (var i = 0; i < 19; ++i) {
		var f = t[i + 4] == 1 ? true : false;
		this.spirit_table.push(f);
	}

	this.move = t[23];
	this.strength = t[24];
	this.defense = t[25];
	this.speed = t[26];
	this.hp = t[27];

	this.music_id = t[28];
}


Robot.prototype.getRunTimeRobotData = function() {
	var o = {}
    o.x = this.x;
    o.y = this.y;

    o.robot_id = this.property.id;
    o.people = this.people;

    o.isPlayer = this.isPlayer;
    o.level = this.level;
	o.exp = this.exp;
	o.robotBehavior = this.robotBehavior;
	o.isDead = false;

    o.hp = this.hp;
	o.people_spirit = this.pilot.spirit
	if (this.inMainShip)
	{
		o.inMainShip = this.inMainShip.pilot.id; //是否在母舰中
	}
	else
	{
		o.inMainShip = null; //是否在母舰中
	}
	o.active = this.active;
	o.spirit = this.spirit; // 数组


	return o;
}