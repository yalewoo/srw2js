var SceneMain = function (game) {
	this.game = game;
	this.context2D = game.context2D;
	this.canvas = game.canvas;
	this.round = 0;

	this.canvas.width = 18*32;
	this.canvas.height = 22*32;

	this.immediateEventDone = {};

	this.status = "normal";

	var self = this;



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

		this.robots.mousehoverHandler(x, y);
	}

	this.clickHandler = function (event)
	{
		g_buttonCanvasManager.clear();

		if (this.talkDiag)
		{
			this.talkDiag.clickHandler();
			return;
		}


		var x = Math.floor(event.offsetX / 32);
		var y = Math.floor(event.offsetY / 32);

		var robot = this.robots.getRobotAt(x, y);
		if (g_debug_mode_enabled) {
			log(robot);
		}

		if (this.status == "normal") {
			if (robot) {
				updateRobotUI(robot);
				if (robot.active || g_debug_mode_enabled) {
					this.robots.selectedRobot = robot;
					var m = this.calculateMoveRangeCore(robot, x, y, -1, false);
					for (var i = 0; i < this.robots.enemy.length; ++i) {
						var r = this.robots.enemy[i];
						if (robot.canAttackRobot(r)) {
							m[r.x][r.y] = 1;
						}
						else {
							m[r.x][r.y] = -1;
						}
					}
					this.setBlackEffect(m);
					this.status = "robotSelected";
				}
				else {

				}
				
			}
			else {
				this.map.mousedownHandler(x, y);
			}
		}
		else if (this.status == "robotSelected") {
			var selectedRobot = this.robots.selectedRobot;
			if (robot) {

				if (selectedRobot && selectedRobot.canAttackRobotUsingWeapon(robot, selectedRobot.weapon1)) {
					selectedRobot.selectedWeapon = selectedRobot.weapon1;
					selectedRobot.attackDo(robot);
					this.status = "normal";
				}
				// 只有武器2能攻击到时自动使用武器2
				else if (selectedRobot && selectedRobot.canAttackRobotUsingWeapon(robot, selectedRobot.weapon2)) {
					selectedRobot.selectedWeapon = selectedRobot.weapon2;
					selectedRobot.attackDo(robot);
					this.status = "normal";
				}
				else if (robot.pilot.id == 54) {
					
					if (this.canMoveTo(x, y)) {
						// robot是母舰
						this.setBlackEffect(null);

						var self = this;
						selectedRobot.moveTo(x, y, function () {
							robot.passengers.push(selectedRobot);
							selectedRobot.inMainShip = robot;
							selectedRobot.setNotActive();
							self.status = "normal";
						});

					}
				}
			}
			else {
				// 移动
				if (this.canMoveTo(x, y) || g_debug_mode_enabled) {
					var self = this;
					selectedRobot.moveTo(x, y, function() {
						self.status = "robotMoved"
					});
					this.setBlackEffect(null);
					this.status = "robotMoving";
				}
			}
		}
		else if (this.status == "robotMoving") {

		}
		else if (this.status == "robotMoved") {
			var selectedRobot = this.robots.selectedRobot;
			if (robot) {
				if (robot == selectedRobot) {
					// 移动后点击自己结束移动
					// 修理装置修理自己
					if (robot.selectedWeapon && robot.selectedWeapon.id == 164) {
						robot.addHp(robot.hp_total / 2);
					}
					robot.setNotActive();
					this.status = "normal";
				}
				// 只有武器1能攻击到时自动使用武器1，移动后不能使用远程武器
				if (selectedRobot && selectedRobot.weapon1.range == 1 && selectedRobot.canAttackRobotUsingWeapon(robot, selectedRobot.weapon1)) {
					selectedRobot.selectedWeapon = selectedRobot.weapon1;
					selectedRobot.attackDo(robot);
					this.status = "normal";
				}
				// 只有武器2能攻击到时自动使用武器2，移动后不能使用远程武器
				else if (selectedRobot && selectedRobot.weapon2.range && selectedRobot.canAttackRobotUsingWeapon(robot, selectedRobot.weapon2)) {
					selectedRobot.selectedWeapon = selectedRobot.weapon2;
					selectedRobot.attackDo(robot);
					this.status = "normal";
				}
			}
			else {
				
			}
		}



		
		
		

		this.game.musicManager.PlayOnceFromStart("click");
	}

	this.undoSelectedRobot = function() {
		var robot = this.robots.selectedRobot;
		if (robot.afterMove) {
			robot.inCancelMove = true;
			robot.moveTo(robot.xOriginal, robot.yOriginal);
			self.setBlackEffect(null);
			this.status = "robotSelected";
		}
		else {
			
			if (self.robots.selectedRobot.drawIgnoreMainShip)
			{
				self.robots.selectedRobot.drawIgnoreMainShip = false;
			}
			
			self.robots.selectedRobot.selectedWeapon = null;
			self.robots.selectedRobot = null;
			self.setBlackEffect(null);
			g_buttonCanvasManager.clear();
			this.status = "normal";

		}
	}

	this.showRobotMenu = function(robot) {
		var robots = robot.scene.robots;
		if (g_debug_mode_enabled) {
			g_buttonCanvasManager.addButtonForRobot("AI", robot.x, robot.y, function () {
				robot.AI_action();
			});
		}

		// 劝降
		var stage = this.stage;
		if (g_stages[stage].quanxiang) {

			var enemyPeople = g_stages[stage].quanxiang[robot.pilot.id];
			if (enemyPeople) {
				var enemy = robots.getRobotByPeopleId(enemyPeople);
				if (enemy) {
					if ((enemy.x == robot.x && (enemy.y == robot.y - 1 || enemy.y == robot.y + 1)) ||
						(enemy.y == robot.y && (enemy.x == robot.x - 1 || enemy.x == robot.x + 1))) {
						g_buttonCanvasManager.addButtonForRobot("劝降", robot.x, robot.y, function () {
							robots.quanxiang(robot, enemy);
						})
					}
				}
			}

		}

		// 状态
		g_buttonCanvasManager.addButtonForRobot("状态", robot.x, robot.y, function () {
			updateRobotUI(robot);
		});

		// 起飞
		if (robot.pilot.id == 54 && robot.passengers.length > 0) {
			g_buttonCanvasManager.addButtonForRobot("起飞", robot.x, robot.y, function () {
				for (var i = 0; i < robot.passengers.length; ++i) {
					var r = robot.passengers[i];
					(function (r) {
						g_buttonCanvasManager.addButtonForRobot(r.property.robotName, r.x, r.y, function () {
							r.scene.robots.selectedRobot = r;
							r.drawIgnoreMainShip = true;
							var m = r.scene.calculateMoveRangeCore(r, r.x, r.y, -1, false);
							r.scene.setBlackEffect(m);
							r.scene.status = "robotSelected";
						});
					})(r);

				}
			})

		}

		// 精神
		if (robot.canUseAnySpirit()) {
			g_buttonCanvasManager.addButtonForRobot("精神", robot.x, robot.y, function () {
				g_buttonCanvasManager.clear();
				for (var i = 0; i < 19; ++i) {
					if (robot.pilot.spirit_table[i] && robot.pilot.spirit >= g_spirit_consume_table[i] && robot.canUseSpirit(i)) {
						var text = g_spirit_name[i] + "(" + g_spirit_consume_table[i] + ")";
						(function (text2, i2) {
							switch (i2) {
								case 0: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_0() }); break;
								case 1: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_1() }); break;
								case 2: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_2() }); break;
								case 3: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_3() }); break;
								case 4: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_4() }); break;
								case 5: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_5() }); break;
								case 6: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_6() }); break;
								case 7: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_7() }); break;
								case 8: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_8() }); break;
								case 9: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_9() }); break;
								case 10: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_10() }); break;
								case 11: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_11() }); break;
								case 12: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_12() }); break;
								case 13: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_13() }); break;
								case 14: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_14() }); break;
								case 15: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_15() }); break;
								case 16: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_16() }); break;
								case 17: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_17() }); break;
								case 18: g_buttonCanvasManager.addButtonForRobot(text2, robot.x, robot.y, function () { robot.use_sprit_18() }); break;
								default: break;
							}
						})(text, i);
					}
				}
			})
		}

		// 变形
		var transforms = robot.canTransform();

		if (transforms.length > 0) {
			g_buttonCanvasManager.addButtonForRobot("变形", robot.x, robot.y, function () {
				g_buttonCanvasManager.clear();

				for (var i = 0; i < transforms.length; ++i) {
					var property = transforms[i];
					(function (property) {
						g_buttonCanvasManager.addButtonForRobot(property.robotName, robot.x, robot.y, function () {
							robot.transform(property);
						})
					})(property);


				}

			});


		}


		g_buttonCanvasManager.addButtonForRobot("待命", robot.x, robot.y, function () {
			robot.setNotActive();
		})

	}
	this.rightClickHandler = function (e) {
		if (g_buttonCanvasManager.hasAnyButton()) {
			g_buttonCanvasManager.clear();
			return;
		}

		var x = Math.floor(e.offsetX / 32);
		var y = Math.floor(e.offsetY / 32);
		var robot = this.robots.getRobotAt(x, y);
		var robots = this.robots;
		if (robot && this.status == "normal") {
			this.showRobotMenu(robot);
			return;
		}

		// Undo
		var robot = self.robots.selectedRobot;
		if (robot) {
			self.undoSelectedRobot();
		}
		else{
			g_buttonCanvasManager.addButtonHandler("回合" + this.round + "结束", self.nextRound, e.offsetX, e.offsetY, 200, 60);

			g_buttonCanvasManager.addButtonHandler("Save", self.saveToFile, e.offsetX, e.offsetY+100, 200, 60);
			g_buttonCanvasManager.addButtonHandler("Load", self.loadFromFile, e.offsetX, e.offsetY+200, 200, 60);
		}
	}



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
			this.arrowMoveSpeedUI = 6;
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

					// 显示移动消耗剩余
					// if (g_debug_mode_enabled) {
					// 	var showText = function (ctx, x, y, text) {
					// 		ctx.beginPath();
					// 		ctx.fillStyle = "white";
					// 		ctx.font = 16 + "px 黑体";
					// 		ctx.textAlign = "middle";
					// 		ctx.textBaseline = "middle";
					// 		ctx.fillText(text, x, y);
					// 		ctx.closePath();
					// 	}
					// 	showText(this.context2D, i*32+10, j*32+10, this.effectMap[i][j]);
					// }
				}
			}

		}


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

	this.getSavedExp = function(peopleId) {
		var json = window.localStorage.getItem("srw2js_save_data");
		if (json) {
			datas = JSON.parse(json);
		}
		if (datas) {
			for (var i = this.stage - 1; i > 0; --i) {
				if (datas[i][peopleId]) {
					return datas[i][peopleId];
				}
			}
		}
		
		return 0;
	}

	this.loadStage = function(stage)
	{
		this.immediateEventDone = {}
		if (stage != 1){
			var json = window.localStorage.getItem("srw2js_save_data");
			if (json) {
				datas = JSON.parse(json);
			}
			if (datas && datas[stage-1])
			{
				this.money_total = datas["money_total"];
			}
		}
			
		this.startFromFile = false;

		this.stage = stage;

		this.map = new Map(this, stage);


		this.robots = new Robots(this);
		this.robots.loadStage(stage);


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
			self.immediateEventDone = o.immediateEventDone;

			var stage = self.stage;
			if (stage != 1) {
				var json = window.localStorage.getItem("srw2js_save_data");
				if (json) {
					datas = JSON.parse(json);
				}
				if (datas && datas[stage - 1]) {
					this.money_total = datas["money_total"];
				}
			}


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
		o.immediateEventDone = self.immediateEventDone;

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
				m2.push(-1);
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
				if (m[x][y - 1] > 0) {
					visited.push([x, y - 1]);
				}
			}

			//down
			if (m[x][y + 1] < m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots, ignore_maprect)) {
				m[x][y + 1] = m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots, ignore_maprect);
				if (m[x][y + 1] > 0) {
					visited.push([x, y + 1]);
				}
			}

			//left
			if (m[x - 1][y] < m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots, ignore_maprect)) {
				m[x - 1][y] = m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots, ignore_maprect);
				if (m[x - 1][y] > 0) {
					visited.push([x - 1, y]);
				}
			}

			//right
			if (m[x + 1][y] < m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots, ignore_maprect)) {
				m[x + 1][y] = m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots, ignore_maprect);
				if (m[x + 1][y] > 0) {
					visited.push([x + 1, y]);
				}
			}

		}
		return m;
	}

	this.calculateMovePath = function (robot, x_target, y_target) {
		var ignore_maprect = false;
		var ignore_robots = false;
		var xPos = robot.x;
		var yPos = robot.y;


		var m = [];
		for (var i = 0; i < this.map.width; i++) {
			var m2 = [];
			for (var j = 0; j < this.map.height; j++) {
				m2.push(-1);
			}
			m.push(m2);
		}
		m[xPos][yPos] = robot.t_move();    //行动力

		var paths = {};
		var visited = [];
		visited.push([xPos, yPos]);

		while (!visited.length == 0) {

			var now = visited.pop();


			var x = now[0];
			var y = now[1];
			//up
			if (m[x][y - 1] < m[x][y] - this.getMoveConsume(robot, x, y - 1, ignore_robots, ignore_maprect)) {
				m[x][y - 1] = m[x][y] - this.getMoveConsume(robot, x, y - 1, ignore_robots, ignore_maprect);
				paths[[x, y-1]] = [x, y];
				if (m[x][y - 1] > 0) {
					visited.push([x, y - 1]);
				}
			}

			//down
			if (m[x][y + 1] < m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots, ignore_maprect)) {
				m[x][y + 1] = m[x][y] - this.getMoveConsume(robot, x, y + 1, ignore_robots, ignore_maprect);
				paths[[x, y + 1]] = [x, y];
				if (m[x][y + 1] > 0) {
					visited.push([x, y + 1]);
				}
			}

			//left
			if (m[x - 1][y] < m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots, ignore_maprect)) {
				m[x - 1][y] = m[x][y] - this.getMoveConsume(robot, x - 1, y, ignore_robots, ignore_maprect);
				paths[[x-1, y]] = [x, y];
				if (m[x - 1][y] > 0) {
					visited.push([x - 1, y]);
				}
			}

			//right
			if (m[x + 1][y] < m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots, ignore_maprect)) {
				m[x + 1][y] = m[x][y] - this.getMoveConsume(robot, x + 1, y, ignore_robots, ignore_maprect);
				paths[[x + 1, y]] = [x, y];
				if (m[x + 1][y] > 0) {
					visited.push([x + 1, y]);
				}
			}

		}

		var res = [];
		var current = [x_target, y_target];
		res.push(current);
		while (current && current[0] != xPos || current[1] != yPos) {
			current = paths[current];
			if (!current) {
				current = [xPos, yPos];
			}
			res.push(current);
		}

		return res;
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



		if (xTo && yTo) {
			selectedRobot.inAIMove = true;
			selectedRobot.moveTo(xTo, yTo, callback);
		}
		else
		{
			callback();
		}

		
	}

	this.money_total = 0;
	this.getMoney = function(m)
	{
		this.money_total += m;
	}

	this.init = function() {
		var self = this;

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

	this.executeStageEventCore = function (i, arr, callback) {
		var self = this;
		if (i < arr.length)
		{
			if (arr[i].type == "addEnemys") {
				var add_enemy = arr[i].data;
				
				this.game.musicManager.stopAll();
				this.game.musicManager.PlayOnceFromStart("main_add_enemy", function () {
					self.game.musicManager.PlayLoopContinue();
				});

				this.robots.addEnemyAni(add_enemy, 0, function () {
					self.executeStageEventCore(i+1, arr, callback);
				});				
			}
			else if (arr[i].type == "talks") {
				var talk_data = arr[i].data;
				this.talkDiag = new TalkDiag(game, talk_data);
				var self = this;
				this.talkDiag.setFinishHandler(function () {
					self.talkDiag.clear();
					self.talkDiag = null;
					self.executeStageEventCore(i + 1, arr, callback);
				})				
			}
			else if (arr[i].type == "addRobots") {
				var add_robot = arr[i].data;
				var self = this;

				this.robots.addRobotAni(add_robot, 0, function () {
					self.executeStageEventCore(i + 1, arr, callback);
				});				
			}
			else if (arr[i].type == "checkAndTalk") {
				var data = arr[i].data;
				if (data.type == "HasPeople") {
					var peopleid = data.people;
					if (this.robots.getRobotByPeopleId(peopleid)) {
						var talk_data = data.talks1;
						this.talkDiag = new TalkDiag(game, talk_data);
						var self = this;
						this.talkDiag.setFinishHandler(function () {
							self.talkDiag.clear();
							self.talkDiag = null;
							self.executeStageEventCore(i + 1, arr, callback);
						})
					}
					else
					{
						var talk_data = data.talks2;
						this.talkDiag = new TalkDiag(game, talk_data);
						var self = this;
						this.talkDiag.setFinishHandler(function () {
							self.talkDiag.clear();
							self.talkDiag = null;
							self.executeStageEventCore(i + 1, arr, callback);
						})
					}
				}
			}
			else if (arr[i].type == "moveRobot") {
				var data = arr[i].data;
				peopleid = data.people;
				var robot = this.robots.getRobotByPeopleId(peopleid)
				if (robot) {
					if (data.x && data.y) {
						robot.moveTo(data.x, data.y, function () {
							self.setBlackEffect(null);
							robot.setNotActive();
							robot.setActive();
							self.executeStageEventCore(i + 1, arr, callback);
						});
					}
					else if (data.targetPeople) {
						var enemy = this.robots.getRobotByPeopleId(data.targetPeople);
						if (enemy) {
							var x = enemy.x + data.targetPeopleX;
							var y = enemy.y + data.targetPeopleY;
							robot.moveTo(x, y, function () {
								self.setBlackEffect(null);
								robot.setNotActive();
								robot.setActive();
								self.executeStageEventCore(i + 1, arr, callback);
							});
						}
						else{
							log("未识别的剧情事件");
							log(arr[i]);
							self.executeStageEventCore(i + 1, arr, callback);
						}
						
					}
					
				}
				else
				{
					log("未识别的剧情事件");
					log(arr[i]);
					self.executeStageEventCore(i + 1, arr, callback);
				}
			}
			else if (arr[i].type == "removeRobot") {
				var data = arr[i].data;
				peopleid = data.people;
				var robot = this.robots.getRobotByPeopleId(peopleid)
				if (robot) {
					this.robots.deleteRobot(robot);
					self.executeStageEventCore(i + 1, arr, callback);
					
				}
			}
			else if (arr[i].type == "attackRobot") {
				var data = arr[i].data;
				peopleid = data.people;
				var robot = this.robots.getRobotByPeopleId(peopleid);
				var weapon;
				if (data.weapon == 1) weapon = robot.weapon1;
				if (data.weapon == 2) weapon = robot.weapon2;
				if (weapon.id == 66) {
					robot.selectedWeapon = weapon;
					robot.attackCore(function() {
						self.executeStageEventCore(i + 1, arr, callback);
					});
				}
				else
				{
					var enemyPeopleId = data.targetPeople;
					var enemy = this.robots.getRobotByPeopleId(enemyPeopleId);
					robot.selectedWeapon = weapon;
					robot.attackDo(enemy, function() {
						self.executeStageEventCore(i + 1, arr, callback);
					});
					
				}
				
			}
			else if (arr[i].type == "playMusic") {
				var data = arr[i].data;
				this.game.musicManager.stopAll();
				this.game.musicManager.PlayOnceFromStart(data.musicid);
				self.executeStageEventCore(i + 1, arr, callback);
			}
			
			else {
				log("未识别的剧情事件");
				log(arr[i]);
				self.executeStageEventCore(i + 1, arr, callback);
			}
		}
		else
		{
			callback();
		}
	}


	this.executeStageEvent = function (callback) {
		if (g_stages[this.stage] && g_stages[this.stage].round_event
			&& g_stages[this.stage].round_event[this.round])
		{
			var data = g_stages[this.stage].round_event[this.round];
			this.executeStageEventCore(0, data, callback);
		}
		else
		{
			callback();
		}
	}

	this.checkImmediateEvent = function() {
		//this.immediateEventDone
		if (g_stages[this.stage] && g_stages[this.stage].immediateEvent) {
			for (var i = 0; i < g_stages[this.stage].immediateEvent.length; ++i) {
				if (!this.immediateEventDone[i]) {
					var d = g_stages[this.stage].immediateEvent[i];
					if (this.robots.checkCondition(d.check)) {
						this.immediateEventDone[i] = true;
						this.executeStageEventCore(0, d.events, function () {

						});
					}
				}

			}
		}
	}
	this.checkEvent = function() {
		

		if (this.robots.enemy.length == 0)
		{
			// Save data
			var datas = {};
			var json = window.localStorage.getItem("srw2js_save_data");
			if (json) {
				datas = JSON.parse(json);
			}

			var exps = this.robots.loadStage_getExp();
			datas[this.stage] = exps;
			datas["money_total"] = this.money_total

			var str = JSON.stringify(datas);
			window.localStorage.setItem("srw2js_save_data", str);

			// 执行过关剧情
			var data = g_stages[this.stage].round_event["success"];
			var self = this;
			this.executeStageEventCore(0, data, function () {
				self.beginStage(self.stage+1);
			});
		}
	}

	this.beginStage = function(stage) {
		this.stage = stage;
		var self = this;
		var game = this.game;
		var scene_map1 = new SceneStartMap1(game, stage);

		game.setScene(scene_map1);
		scene_map1.setFinishHandler(function () {
			var scene_title = new SceneTitle(game, stage);
			game.setScene(scene_title);
			scene_title.setFinishHandler(function () {
				self.loadStage(stage);
				self.init();

				game.setScene(self);
			});
		});
	}

	this.nextRound = function () {
		self.robots.setAllActive();


		self.inAIActions = true;

		++self.round;
		self.game.musicManager.stopAll();
		self.game.musicManager.PlayLoopFromStart("main_enemy");

		self.AIRobotList = self.robots.enemy.slice();


		var callback = function() {
			self.AI(0);
		}
		self.executeStageEvent(callback);
	}

	

	this.AI = function (i) {
		
		var self = this;
		var enemys = this.AIRobotList;
		if (enemys.length > i) {
			var enemy = enemys[i];

			this.hoverData = [enemy.x, enemy.y];
			
			this.game.addTimer(0.1, function() {
				if (enemy.robotBehavior < self.round) {
					enemy.AI_action(function() {
						self.AI(i + 1);
					});
				}
				else {
					enemy.setNotActive();
					self.AI(i + 1);
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