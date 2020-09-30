var SceneMain = function (game) {
	this.game = game;
	this.context2D = game.context2D;
	this.canvas = game.canvas;
	this.round = 0;
	this.robots_exps = {};

	this.canvas.width = 18*32;
	this.canvas.height = 22*32;

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
		if (this.inAIActions)
		{
			return;
		}
		var x = Math.floor(event.offsetX / 32)
		var y = Math.floor(event.offsetY / 32)
		if (x != self.currentHoverX || y != self.currentHoverY) {
			this.hoverData = [x, y];
		}
	}
	this.clickHandler = function (event)
	{
		g_buttonCanvasManager.clear();

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

		self.game.musicManager.PlayOnceFromStart("click");
	}

	this.undoSelectedRobot = function() {
		var robot = this.robots.selectedRobot;
		if (robot.afterMove) {
			robot.inCancelMove = true;
			robot.moveTo(robot.xOriginal, robot.yOriginal);
			self.setBlackEffect(null);
		}
		else {
			
			if (self.robots.selectedRobot.drawIgnoreMainShip)
			{
				self.robots.selectedRobot.drawIgnoreMainShip = false;
			}
			
			self.robots.selectedRobot.selectedWeapon = null;
			self.robots.selectedRobot = null;
			self.setBlackEffect(null);
			g_buttonManager.clear();
			g_buttonCanvasManager.clear();

		}
	}
	this.rightClickHandler = function (e) {
		var robot = self.robots.selectedRobot;
		if (robot) {
			self.undoSelectedRobot();
		}
		else{
			if (g_buttonCanvasManager.hasAnyButton())
			{
				g_buttonCanvasManager.clear();

			}
			else
			{
				g_buttonCanvasManager.addButtonHandler("回合" + this.round + "结束", self.nextRound, e.offsetX, e.offsetY, 200, 60);

				g_buttonCanvasManager.addButtonHandler("Save", self.saveToFile, e.offsetX, e.offsetY+100, 200, 60);
				g_buttonCanvasManager.addButtonHandler("Load", self.loadFromFile, e.offsetX, e.offsetY+200, 200, 60);

			}

		}
	}

	
	this.registerHandler();


	this.startAttackArrow = function(x, y, x2, y2, callback) {
		this.arrowImg = g_resourceManager.img_logos["arrow2"];
		this.arrowX = x;
		this.arrowY = y;
		this.arrowXTarget = x2;
		this.arrowYTarget = y2;
		this.arrowXFloat = (x2-x) * 32;
		this.arrowYFloat = (y2 -y) * 32;
		this.arrowMoveFinished = callback;
	}

	this.animations = [];
	this.addAnimation = function(animation) {
		this.animations.push(animation);
	}
	this.update = function () {
		this.map.update();
		this.robots.update();

		g_buttonCanvasManager.update(this.context2D);

		if (this.arrowImg) {
			this.arrowMoveSpeedUI = 4;
				if (this.arrowXFloat < 0) {
					this.arrowXFloat += this.arrowMoveSpeedUI;
					this.arrowXFloat = Math.min(this.arrowXFloat, 0)
				}
				else if (this.arrowXFloat > 0) {
					this.arrowXFloat -= this.arrowMoveSpeedUI;
					this.arrowXFloat = Math.max(this.arrowXFloat, 0)

				}
				else if (this.arrowYFloat < 0) {
					this.arrowYFloat += this.arrowMoveSpeedUI;
					this.arrowYFloat = Math.min(this.arrowYFloat, 0)

				}
				else if (this.arrowYFloat > 0) {
					this.arrowYFloat -= this.arrowMoveSpeedUI;
					this.arrowYFloat = Math.max(this.arrowYFloat, 0)

				}
				else {
					this.arrowImg = null;
					this.arrowMoveFinished();

				}
			

		}

		if (this.animations.length > 0) {
			for (var i = this.animations.length - 1; i >= 0; i--) {
				if (this.animations[i].update() == false){
					this.animations.splice(i, 1);
				}
			}
		}

		
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
			if (this.arrowImg)
			{
				this.context2D.drawImage(this.arrowImg, this.arrowXTarget * 32 - this.arrowXFloat, this.arrowYTarget * 32 - this.arrowYFloat);
			}
			else
			{
				if (this.hoverData)
				{
					var img = g_resourceManager.img_logos["select"];
					this.context2D.drawImage(img, this.hoverData[0] * 32, this.hoverData[1] * 32);
				}
				
			}
			
		}

		if (this.animations.length > 0) {
			for (var i = this.animations.length - 1; i >= 0; i--) {
				this.animations[i].draw();
			}
		}
	}

	this.loadStage = function(stage)
	{
		if (stage != 1){
			this.robots_exps = this.robots.loadStage_getExp();
		}
			
		this.startFromFile = false;

		this.stage = stage;

		this.map = new Map(this, stage);


		this.robots = new Robots(this);
		this.robots.loadStage(stage);

		if (stage != 1) {
			this.robots.loadStage_setExp(this.robots_exps);
		}

		this.round = 1;
	}

	var self = this;

	this.loadFromFile = function() {

		this.startFromFile = true;
		var json=window.localStorage.getItem("srw2js_save");
		if (json)
		{
			var jsonObj=JSON.parse(json);
			var o = jsonObj;
	
			self.stage = o.stage;
	
			self.map = new Map(self, o.stage);
	
	
			self.robots = new Robots(self);
	
			self.robots.addRobotsRuntime(o.arr);
	
			self.round = o.round;

			return true;
		}
		else
		{
			alert("找不到存档，请刷新后重新开始")
		}
		

		return false;
	}
	this.saveToFile = function() {
		var o = {stage: self.stage, round: self.round};
		o.arr = self.robots.getRobotRuntimeArr();
		
		var str = JSON.stringify(o);

		window.localStorage.setItem("srw2js_save", str);
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

		var m2 = this.calculateMoveRangeCore(selectedRobot, closeEnemy.x, closeEnemy.y, 999, true, false);

		var xTo, yTo;
		var value = 0;

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

	this.money_total = 0;
	this.getMoney = function(m)
	{
		this.money_total += m;
	}

	this.init = function() {
		var self = this;

		g_buttonManager.unshowButton1();
		if (!this.startFromFile)
		{
			self.game.musicManager.stopAll();
			this.game.musicManager.PlayLoopFromStart("start_map");
			this.executeStageEvent(function(){
				self.game.musicManager.stopAll();
				self.game.musicManager.PlayLoopFromStart("main_robot");
			});
		}
		else
		{
			this.game.musicManager.PlayLoopFromStart("main_robot");
		}
		
	}
	this.clear = function() {
		this.game.musicManager.stopAll();
	}

	this.executeStageEvent = function (callback) {
		if (g_stages[this.stage] && g_stages[this.stage].round_event
			&& g_stages[this.stage].round_event[this.round])
		{
			var add_enemy = g_stages[this.stage].round_event[this.round].addEnemys;
			if (add_enemy) {
				var self = this;
				this.game.musicManager.stopAll();
				this.game.musicManager.PlayOnceFromStart("main_add_enemy", function() {
					self.game.musicManager.PlayLoopContinue();
				});
				
				
				this.robots.addEnemyAni(add_enemy, 0, function() {
					var talk_data = g_stages[self.stage].round_event[self.round].talks;
					if (talk_data) {
						self.talkDiag = new TalkDiag(game, talk_data);
						self.talkDiag.setFinishHandler(function () {
							self.talkDiag.clear();
							self.talkDiag = null;
								callback();
						})
		
						g_buttonManager.unshowButton1();
					}
					else{
						callback();
					}
				});
				
				g_buttonManager.unshowButton1();
			}
			else
			{
				var talk_data = g_stages[this.stage].round_event[this.round].talks;
				if (talk_data) {
					this.talkDiag = new TalkDiag(game, talk_data);
					var self = this;
					this.talkDiag.setFinishHandler(function () {
						self.talkDiag.clear();
						self.talkDiag = null;
							callback();
					})
	
					g_buttonManager.unshowButton1();
				}
				else{
					callback();
				}
			}


			

		}
		else
		{
			callback();
		}
	}

	this.checkEvent = function() {
		var self = this;
		var callback = function() {
			var game = self.game;
			var scene_map1 = new SceneStartMap1(game, self.stage+1);


			game.setScene(scene_map1);
			scene_map1.setFinishHandler(function () {
				var scene_title = new SceneTitle(game, self.stage + 1);
				game.setScene(scene_title);
				scene_title.setFinishHandler(function () {
					self.stage++;
					self.loadStage(self.stage);
					self.init();

					game.setScene(self);
				});
			});
		}

		if (this.robots.enemy.length == 0)
		{
			var add_robot = g_stages[this.stage].round_event["success"].addRobots;
			if (add_robot) {
				var self = this;				
				
				this.robots.addRobotAni(add_robot, 0, function() {
					var talk_data = g_stages[self.stage].round_event["success"].talks;
					if (talk_data) {
						self.talkDiag = new TalkDiag(game, talk_data);
						self.talkDiag.setFinishHandler(function () {
							self.talkDiag.clear();
							self.talkDiag = null;
								callback();
						})
		
						g_buttonManager.unshowButton1();
					}
					else{
						callback();
					}
				});
				
				g_buttonManager.unshowButton1();
			}
			else
			{
				var talk_data = g_stages[this.stage].round_event["success"].talks;
				if (talk_data) {
					this.talkDiag = new TalkDiag(game, talk_data);
					var self = this;
					this.talkDiag.setFinishHandler(function () {
						self.talkDiag.clear();
						self.talkDiag = null;
							callback();
					})
	
					g_buttonManager.unshowButton1();
				}
				else{
					callback();
				}
			}
		}
	}

	this.nextRound = function () {
		self.inAIActions = true;

		++self.round;
		self.game.musicManager.stopAll();
		self.game.musicManager.PlayLoopFromStart("main_enemy");

		var callback = function() {
			self.AI(0);
		}
		self.executeStageEvent(callback);
	}

	

	this.AI = function (i) {
		
		var self = this;
		var enemys = this.robots.enemy;
		if (enemys.length > i) {
			var enemy = enemys[i];
			this.hoverData = [enemy.x, enemy.y];
			
			this.game.addTimer(0.1, function() {
				enemy.setNotActiveCallbackOnce = function () {
					self.AI(i + 1);

				}


				if (enemy.robotBehavior < self.round) {
					enemy.AI_action();

				}
				else {
					enemy.setNotActive();
					
				}
			})

			

		}
		else {
			this.game.musicManager.stopAll();
			this.game.musicManager.PlayLoopFromStart("main_robot");

			// 加血
			this.robots.updateForNewTurn();
			this.robots.setAllActive();

			this.inAIActions = false;

		}



	}

}