var RobotProperty = function(id)
{
	this.id = id;

	var data = g_robot_data[id];

	this.exp_dievalue = data[13];  //本机死亡带来的固定经验
	this.money = data[10];  //金钱

	//基本属性

	this.robotName = data[1];  //机体名
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

var Robots = function(cxt) {

	this.robots = []
	this.enemy = []

	this.cxt = cxt;
	this.loadStage = function(stage) {
		var stage_robot = stage_robot_date[stage-1];
		for (var i = 0; i < stage_robot.length; ++i)
		{
			var robot = new Robot(stage_robot[i], cxt, isEnemy=false);
			robot.updateLevel();
			robot.InitValue();
			this.robots.push(robot);
		}

		stage_robot = stage_enemy_data[stage-1];
		for (var i = 0; i < stage_robot.length; ++i)
		{
			var robot = new Robot(stage_robot[i], cxt, isEnemy=true);
			robot.updateLevel();
			robot.InitValue();

			this.robots.push(robot);
		}
	}

	this.draw = function() {
		for (var i = 0; i < this.robots.length; ++i)
		{
			this.robots[i].draw();
		}
	}

	this.logXY = function(x, y)
	{
		for (var i = 0; i < this.robots.length; ++i)
		{
			if (this.robots[i].x == x && this.robots[i].y == y)
			{
				log(this.robots[i]);

				updateRobotUI(this.robots[i]);
			}
		}
	}
}


var Robot = function(robot_stage_data, cxt, isEnemy) {
	this.cxt = cxt;
	
	if (isEnemy)
	{
		this.isPlayer = 0;
		//关数,回合,x,y,机师,机体,等级,智商,机师名,机体名,智商,图标
		//[1,1,8,3,3,54,1,5,"士兵" ,"乍克" ,"8",32],
		this.x = robot_stage_data[2];
		this.y = robot_stage_data[3];
		this.robot_id = robot_stage_data[5];
		this.people = robot_stage_data[4];

		this.img = g_resourceManager.img_enemyicon[this.robot_id];
		
		
		this.level = robot_stage_data[6];

	}
	else
	{
		this.isPlayer = 1;

		//关数,回合,x,y,编号,机师,机师名,机体,机体名
		// [1,1,12,16,1,6,"大卫" ,126,"刚达"]
		this.x = robot_stage_data[2];
		this.y = robot_stage_data[3];
		this.robot_id = robot_stage_data[7];
		this.people = robot_stage_data[5];


		this.img = g_resourceManager.img_roboticon[this.robot_id];


		this.exp = 0;
	}

	this.property = new RobotProperty(this.robot_id);
	this.pilot = new Pilot(this.people);

	this.weapon1 = new Weapon(this.property.weapon1id);
	this.weapon2 = new Weapon(this.property.weapon2id);

	this.draw = function() {
		if (this.img.isloaded)
		{
			this.cxt.drawImage(this.img, this.x * 32, this.y * 32, this.img.width, this.img.height);

			var imgdata = this.cxt.getImageData(this.x * 32, this.y * 32, this.img.width, this.img.height);
			//console.log(imgdata);
			imgdata = toGray(imgdata);//灰白滤镜
			this.cxt.putImageData(imgdata, this.x * 32, this.y * 32);

			// var ctx = this.cxt;
			// ctx.fillColor = 'rgba(66, 66, 66, 0.5)';

			// ctx.fillRect(this.x * 32, this.y * 32, this.img.width, this.img.height, false);
		}

	}

	
}

//灰白滤镜
function toGray(imgdata) {
	for (var i = 0; i < imgdata.data.length - 4; i = i + 4) {
		var r = imgdata.data[i];
		var g = imgdata.data[i + 1];
		var b = imgdata.data[i + 2];
		var rgb = (r * 0.3 + g * 0.5 + b * 0.11);
		rgb = .399 * r + .687 * g + .214 * b
		imgdata.data[i] = rgb;
		imgdata.data[i + 1] = rgb;
		imgdata.data[i + 2] = rgb;
	}
	return imgdata;
}
//黑白滤镜
function toBlack(imgdata) {
	for (var i = 0; i < imgdata.data.length - 4; i = i + 4) {
		var r = imgdata.data[i];
		var g = imgdata.data[i + 1];
		var b = imgdata.data[i + 2];
		var rgb = (r + g + b) / 3;
		if (rgb < 100) {
			rgb = 0;
		}
		else {
			rgb = 255;
		}
		imgdata.data[i] = rgb;
		imgdata.data[i + 1] = rgb;
		imgdata.data[i + 2] = rgb;
	}
	return imgdata;
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
