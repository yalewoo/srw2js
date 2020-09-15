var SceneMain = function (game, stage) {
	this.game = game;
	var cxt = game.cxt
	this.cxt = game.cxt;

	this.update = function () {
		this.map.update();
		this.robots.update();
	}

	this.draw = function() {
		this.map.draw();
		this.robots.draw();

		if (this.effectMap) {
			for (var i = 0; i < this.effectMap.length; ++i)
			{
				for (var j = 0; j < this.effectMap[i].length; ++j)
				{
					if (this.effectMap[i][j] < 0) {
						var x = i;
						var y = j;

						var imgdata = this.cxt.getImageData(x * 32, y * 32, 32, 32);
						//console.log(imgdata);
						imgdata = toGray(imgdata);//灰白滤镜
						this.cxt.putImageData(imgdata, x * 32, y * 32);
					}
				}
			}

		}

	}

	this.loadStage = function(stage)
	{
		this.map = new Map(this, stage);


		this.robots = new Robots(this);
		this.robots.loadStage(stage);
	}

	this.currentHoverX = 0;
	this.currentHoverY = 0;


	var self = this;
	cxt.canvas.addEventListener('mousemove', function(event) {
		//console.log(event);
return;
		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)
		if (x != self.currentHoverX || y != self.currentHoverY)
		{
			//log('selected (' + x + "," + y + ")")
			self.currentHoverX = x;
			self.currentHoverY = y;

			self.map.mousehoverHandler(x, y);

			self.robots.mousehoverHandler(x, y);
		}

	})
	
	cxt.canvas.addEventListener('click', function (event) {

		


		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)

		self.map.mousedownHandler(x, y);

		self.robots.mousedownHandler(x, y);

		self.game.musicManager.playOnce();

	})

	var canvasDom = document.getElementById("myCanvas");
	canvasDom.oncontextmenu = function (e) {
		var robot = self.robots.selectedRobot;
		if (robot)
		{
			log(robot)
			if (robot.afterMove)
			{
				robot.inCancelMove = true;
				robot.moveTo(robot.xOriginal, robot.yOriginal);
				self.setBlackEffect(null);
			}
			else{
				self.robots.selectedRobot = null;
				self.setBlackEffect(null);
			}
		}

		

			return false;
		}; 

	this.getMoveConsume = function (robot, x, y, ignore_robot) {
		var robot2 = this.robots.getRobotAt(x, y);

		if (robot2) {

			if ((!ignore_robot) && robot2.isPlayer != robot.isPlayer) {

				return 9999;
			}
		}

		return this.map.maprects[x][y].moveConsume[robot.property.type];
	}

	this.calculateMoveRange = function(robot, x_start, y_start, move_value, ignore_robots)
	{
		//qDebug() << robot->property.robotName << "start searching";

		var xPos = robot.x;
		var yPos = robot.y;

		if (x_start != -1)
			xPos = x_start;
		if (y_start != -1)
			yPos = y_start;

		var m = []; 
		for (var i = 0; i < this.map.width; i++) { 
			var m2 = [];
			for (var j = 0; j < this.map.height; j++) { 
				m2.push(-99);
			}
			m.push(m2);
		}

		if (move_value == -1) {
			//qDebug() << robot->move;
			m[xPos][yPos] = robot.t_move();    //行动力
		}
		else
			m[xPos][yPos] = move_value;


		var visited = [];
		visited.push([xPos, yPos]);

		while (!visited.length == 0) {

			var now = visited.pop();


			var x = now[0];
			var y = now[1];
			//up
			if (m[x][y - 1] < m[x][y] - this.getMoveConsume(robot, x, y - 1, ignore_robots)) {
				m[x][y - 1] = m[x][y] - this.getMoveConsume(robot, x, y - 1, ignore_robots);
				if (m[x][y - 1] >= 0) {
					visited.push([x, y - 1]);
				}
			}

			//down
			if (m[x][y + 1] < m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots)) {
				m[x][y + 1] = m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots);
				if (m[x][y + 1] >= 0) {
					visited.push([x, y + 1]);
				}
			}

			//left
			if (m[x - 1][y] < m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots)) {
				m[x - 1][y] = m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots);
				if (m[x - 1][y] >= 0) {
					visited.push([x - 1, y]);
				}
			}

			//right
			if (m[x + 1][y] < m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots)) {
				m[x + 1][y] = m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots);
				if (m[x + 1][y] >= 0) {
					visited.push([x + 1, y]);
				}
			}

		}
		return m;
	}

	this.setBlackEffect = function(effectMap) {
		this.effectMap = effectMap;
	}
	this.canMoveTo = function(x, y)
	{
		if (this.effectMap)
		{
			return this.effectMap[x][y] >= 0;
		}
		return false;
	}

}