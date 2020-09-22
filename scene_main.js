var SceneMain = function (game) {
	this.game = game;
	this.context2D = game.context2D;
	this.canvas = game.canvas;
	this.round = 0;

	var self = this;

	this.registerHandler = function() {
		var self = this;
		window.addEventListener("keydown", function (e) {
			if (Number(e.key)) {
				self.loadStage(Number(e.key));
			}
		})

	}

	this.hoverData = []

	this.hoverHandler = function(event)
	{
		
		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)
		if (x != self.currentHoverX || y != self.currentHoverY) {
			this.hoverData = [x, y];
			
		}
	}
	this.clickHandler = function (event)
	{
		if (self.talkDiag)
		{
			self.talkDiag.clickHandler();
			return;
		}

		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)


		if (!self.robots.mousedownHandler(x, y)) {
			self.map.mousedownHandler(x, y);

		}

		self.game.musicManager.playOnce();
	}

	this.rightClickHandler = function (e) {
		var robot = self.robots.selectedRobot;
		if (robot) {
			log(robot)
			if (robot.afterMove) {
				robot.inCancelMove = true;
				robot.moveTo(robot.xOriginal, robot.yOriginal);
				self.setBlackEffect(null);
			}
			else {
				log("right click")
				self.robots.selectedRobot.selectedWeapon = null;
				self.robots.selectedRobot = null;
				self.setBlackEffect(null);
				g_buttonManager.clear();
				g_buttonCanvasManager.clear();

			}
		}
		else{
			var AI = function() {
				self.AI(0);
			}
			g_buttonCanvasManager.addButtonHandler("回合结束", AI, e.offsetX, e.offsetY, 200, 60);

		}
	}

	this.AI = function(i) {
		if (i == 0)
		{
			this.game.musicManager.stopRobot();
			this.game.musicManager.playEnemy();
		}

		var enemys = this.robots.enemy;
		if (enemys.length > i)
		{
			var enemy = enemys[i];
			
			enemy.setNotActiveCallbackOnce = function()
			{
				self.AI(i+1);
	
			}
			enemy.AI_action();

		}
		else{
			this.game.musicManager.stopEnemy();
			this.game.musicManager.playRobot();
			this.robots.setAllActive();
		}
		
	}
	this.registerHandler();

	this.update = function () {
		this.map.update();
		this.robots.update();

		g_buttonCanvasManager.update(this.context2D);
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

						var imgdata = this.context2D.getImageData(x * 32, y * 32, 32, 32);
						//console.log(imgdata);
						imgdata = toGray(imgdata);//灰白滤镜
						this.context2D.putImageData(imgdata, x * 32, y * 32);
					}
				}
			}

		}

		g_buttonManager.draw();

		g_buttonCanvasManager.draw(this.context2D);

		if (this.talkDiag)
		{
			this.talkDiag.draw();
		}
		else
		{
			var img = g_resourceManager.img_logos["select"];
			this.context2D.drawImage(img, this.hoverData[0] * 32, this.hoverData[1] * 32);
		}
	}

	this.loadStage = function(stage)
	{
		this.stage = stage;
		this.map = new Map(this, stage);


		this.robots = new Robots(this);
		this.robots.loadStage(stage);
	}

	this.currentHoverX = 0;
	this.currentHoverY = 0;

	this.getMoveConsume = function (robot, x, y, ignore_robot, ignore_maprect) {
		if (this.map.maprects[x][y].moveConsume[0] == 9999)
		{
			return 9999;
		}
		if (ignore_maprect)
		{
			return 1;
		}

		var robot2 = this.robots.getRobotAt(x, y);

		if (robot2) {

			if ((!ignore_robot) && robot2.isPlayer != robot.isPlayer) {

				return 9999;
			}
		}

		return this.map.maprects[x][y].moveConsume[robot.property.type];
	}

	this.calculateAttackRange = function (robot, weapon)
	{
		return this.calculateMoveRangeCore(robot, robot.x, robot.y, weapon.range, true, true);
	}
	this.calculateMoveRange = function (robot) {
		return this.calculateMoveRangeCore(robot, robot.x, robot.y, -1, false, false);
	}
	this.calculateMoveRangeCore = function(robot, x_start, y_start, move_value, ignore_robots, ignore_maprect)
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
			if (m[x][y - 1] < m[x][y] - this.getMoveConsume(robot, x, y - 1, ignore_robots, ignore_maprect)) {
				m[x][y - 1] = m[x][y] - this.getMoveConsume(robot, x, y - 1, ignore_robots, ignore_maprect);
				if (m[x][y - 1] >= 0) {
					visited.push([x, y - 1]);
				}
			}

			//down
			if (m[x][y + 1] < m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots, ignore_maprect)) {
				m[x][y + 1] = m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots, ignore_maprect);
				if (m[x][y + 1] >= 0) {
					visited.push([x, y + 1]);
				}
			}

			//left
			if (m[x - 1][y] < m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots, ignore_maprect)) {
				m[x - 1][y] = m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots, ignore_maprect);
				if (m[x - 1][y] >= 0) {
					visited.push([x - 1, y]);
				}
			}

			//right
			if (m[x + 1][y] < m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots, ignore_maprect)) {
				m[x + 1][y] = m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots, ignore_maprect);
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

	this.AI_move = function (selectedRobot, callback)
	{
		var closeEnemy = AI.getEnemy(this, selectedRobot);
		if (!closeEnemy) {
			callback();
			return;
		}

		var m = this.calculateMoveRange(selectedRobot);

		var m2 = this.calculateMoveRangeCore(selectedRobot, closeEnemy.x, closeEnemy.y, 999, true, true);

		var xTo, yTo;
		var value;
		for (var i = 0; i < m.length; ++i)
		{
			for (var j = 0; j < m[i].length; ++j)
			{
				if (this.robots.getRobotAt(i, j) == null && m[i][j] >= 0) {
					xTo = i;
					yTo = j;
					value = m2[i][j];
				}
			}
		}
		for (var i = 0; i < m.length; ++i)
		{
			for (var j = 0; j < m[i].length; ++j)
			{
				if (m[i][j] >= 0) {
					if (this.robots.getRobotAt(i, j) == null && m2[i][j] > value) {
						xTo = i;
						yTo = j;
						value = m2[i][j];
					}

				}
			}
		}


		g_buttonManager.clear();

		selectedRobot.inAIMove = true;
		selectedRobot.moveTo(xTo, yTo, callback);
	}

	this.init = function() {
		this.game.musicManager.playMap1();

		this.talkDiag = new TalkDiag(game, g_stage_prelude_talk_date[this.stage-1][1]);
		var self = this;
		this.talkDiag.setFinishHandler(function() {
			self.talkDiag.clear();
			self.talkDiag = null;

			self.game.musicManager.stopMap1();
			this.game.musicManager.playRobot();

		})

		g_buttonManager.unshowButton1();		
	}
	this.clear = function() {
		this.game.musicManager.stopRobot();
	}



}