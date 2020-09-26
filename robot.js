var RobotProperty = function(id)
{
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

var Pilot = function(id)
{
	this.id = id;
	var t = g_people_data[id];
	
	this.name = t[1];


	this.spirit_total0 = t[2];


	this.spirit_increase = t[3];

	this.spirit_table = [];
	for (var i = 0; i < 19; ++i)
	{
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



var Robots = function(scene_main) {
	this.scene = scene_main;
	var context2D = scene_main.context2D;

	this.robots = []
	this.enemy = []

	this.deleteRobot = function(robot)
	{
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
	this.loadStage = function(stage) {

		
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




	this.update = function () {
		for (var i = 0; i < this.robots.length; ++i) {
			this.robots[i].update();
		}
		for (var i = 0; i < this.enemy.length; ++i) {
			this.enemy[i].update();
		}
	}
	this.draw = function() {
		updateRobotUI(this.selectedRobot);
		
		for (var i = 0; i < this.robots.length; ++i)
		{
			this.robots[i].draw();
		}
		for (var i = 0; i < this.enemy.length; ++i) {
			this.enemy[i].draw();
		}
	}

	this.mousehoverHandler = function(x, y)
	{
		
		for (var i = 0; i < this.robots.length; ++i)
		{
			if (this.robots[i].x == x && this.robots[i].y == y)
			{
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
	this.getRobotAt = function(x, y) {
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
			if (robot.inMove)
			{

			}
			else if (robot == this.selectedRobot)
			{
				robot.setNotActive();

			}
			
			else if (this.selectedRobot == null)
			{
				updateMapRectUI(null);

				this.selectedRobot = robot;

				var m = this.scene.calculateMoveRangeCore(robot, x, y, -1, false);

				this.scene.setBlackEffect(m);
				
				showMenu1(this);
			}
			else
			{

				//使用选择的武器攻击
				if (this.selectedRobot.selectedWeapon && this.selectedRobot.canAttackRobotUsingWeapon(robot, this.selectedRobot.selectedWeapon)) 
				{

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
				else if (this.selectedRobot)
				{
					this.selectedRobot.setNotActive();
				}
			}

			return true;
		}
		else{
			if (this.selectedRobot)
			{

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
		if (this.selectedRobot)
		{
			this.selectedRobot.afterMove = false;
			this.selectedRobot.selectedWeapon = false;
			this.selectedRobot = null;
		}
		
		this.scene.setBlackEffect(null);
		g_buttonManager.clear();
		g_buttonCanvasManager.clear();

	}

	this.setAllActive = function() {
		for (var i = 0; i < this.robots.length; ++i) {
			this.robots[i].setActive();
		}
		for (var i = 0; i < this.enemy.length; ++i) {
			this.enemy[i].setActive();
		}
	}
	
}


var Robot = function (robot_stage_data, scene_main, isEnemy) {
	this.scene = scene_main;
	var context2D = scene_main.context2D;
	this.context2D = context2D;
	
	if (isEnemy)
	{
		this.isPlayer = 0;
		//关数,回合,x,y,机师,机体,等级,智商,机师名,机体名,智商,图标
		//[1,1,8,3,3,54,1,5,"士兵" ,"乍克" ,"8",32],
		this.x = robot_stage_data[2]+1;
		this.y = robot_stage_data[3]+1;
		this.robot_id = robot_stage_data[5];
		this.people = robot_stage_data[4];


		this.img = g_resourceManager.get_img_enemyicon(this.robot_id);
		
		
		this.level = robot_stage_data[6];
		this.robotBehavior = Number(robot_stage_data[10]);

	}
	else
	{
		this.isPlayer = 1;

		//关数,回合,x,y,编号,机师,机师名,机体,机体名
		// [1,1,12,16,1,6,"大卫" ,126,"刚达"]
		this.x = robot_stage_data[2]+1;
		this.y = robot_stage_data[3]+1;
		this.robot_id = robot_stage_data[7];
		this.people = robot_stage_data[5];


		this.img = g_resourceManager.get_img_roboticon(this.robot_id);


		this.exp = 0;
	}

	this.TargetX = this.x;
	this.TargetY = this.y;
	this.inMove = false;
	this.afterMove = false;

	this.property = new RobotProperty(this.robot_id);
	this.pilot = new Pilot(this.people);

	this.weapon1 = new Weapon(this.property.weapon1id);
	this.weapon2 = new Weapon(this.property.weapon2id);

	this.active = true;

	this.spirit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	// 实际五维，精神加成之后

	this.t_move = function () {   //机动
		//if (spirit[7]) return move + 5;
		//if (spirit[1]) return move + 3;
		return this.move;
	}
	this.t_hp_total = function () { //总hp
		return this.hp;
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
		log("attack")

		
		var self = this;

		if (this.isPlayer == enemy.isPlayer && this.selectedWeapon.id == 164)
		{
			this.scene.game.musicManager.PlayOnceFromStart("recover");
			enemy.hp += Math.floor(this.hp_total / 2);
			enemy.hp = Math.min(enemy.hp, enemy.hp_total)
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
						self.scene.robots.deleteRobot(enemy);
					}
					if (self.hp <= 0) {
						self.scene.robots.deleteRobot(self);
					}
				});
				self.scene.game.scene = scene_battle;
			})
		}
		
	}

	this.setNotActive = function()
	{
		this.active = false;
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
			return Math.ceil(level * 1.5) + 1;
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
		this.spirit = this.pilot.spirit_total0;
	}
	else
	{
		this.spirit = 0;
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
			damage1 = Battle.getDamage(selectedRobot, enemy, selectedRobot.weapon1);
		}
		if (enemy.tmp_ai_weapon2) {
			damage2 = Battle.getDamage(selectedRobot, enemy, selectedRobot.weapon2);
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
