var Robots = function(cxt) {

	this.robots = []
	this.cxt = cxt;
	this.loadStage = function(stage) {
		var stage_robot = stage_robot_date[stage-1];
		for (var i = 0; i < stage_robot.length; ++i)
		{
			var robot = new Robot(stage_robot[i], cxt);
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
			}
		}
	}
}


var Robot = function(robot_data, cxt) {
	this.cxt = cxt;
	//关数,回合,x,y,编号,机师,机师名,机体,机体名
	// [1,1,12,16,1,6,"大卫" ,126,"刚达"]
	this.x = robot_data[2];
	this.y = robot_data[3];
	this.id = robot_data[7];
	this.people = robot_data[5];

	this.img = new Image();
	this.img_id = g_robot_data[this.id][20];
	this.img.src = "img/robots/1/" + g_robot_data[this.id][20] + ".png"

	this.draw = function() {
		this.cxt.drawImage(this.img,this.x*32,this.y*32);

	}
}