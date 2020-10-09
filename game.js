var Game = function(canvas, fps)
{
	this.canvas = canvas;
	this.context2D = canvas.getContext("2d");
	this.fps = fps;
	this.intervalTime = 1000 / fps;


	this.setupCanvas = function() {
		var context2D = this.context2D;

		context2D.textBaseline = "top";


	}



	this.setupCanvas();

	var game = this;

	this.timers = [];
	this.addTimer = function(time, callback) {
		var fps = this.fps;
		var waitDoTimer = Math.floor(time * fps);

		var timer = {time: waitDoTimer, callback: callback};
		this.timers.push(timer);
	}

	
	this.update = function() {
		game.scene.update();

		// Timer
		if (this.timers.length > 0)
		{
			for (var i = this.timers.length - 1; i >= 0; i--) {
				this.timers[i].time--;
				if(this.timers[i].time < 0) {
					this.timers[i].callback();

					this.timers.splice(i, 1);
				}
			}
		}

	}

	this.draw = function() {
		this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
		game.scene.draw();

		if (g_options.showfps ) {
			CanvasHelper.drawTextWrapLine(game.context2D, "fps:" + game.actualFps.toString(), 0, 30, 350);
		}

	}

	this.lastTime = Date.now();
	this.thisTime = Date.now();
	this.frame = 0;
	this.actualFps = 0;

	this.run = function() {
		++game.frame;
		game.thisTime = Date.now();
		var desiredTime = game.lastTime + game.intervalTime;
		var interval = Math.max(0, desiredTime - game.thisTime);
		

		game.update();

		game.draw();

		if (g_options.showfps && game.frame % 20 == 0) {
			game.actualFps = Math.round(1000 / (game.thisTime - game.lastTime));
		}
		game.lastTime = game.thisTime;
		
		setTimeout(game.run, interval);
	}

	this.setScene = function(scene)
	{
		if (this.scene && this.scene != scene)
		{
			this.scene.clear();
		}

		this.scene = scene;
		this.scene.init();
		
	}

	

	this.musicManager = new MusicManager(this);


	//鼠标滑过
	canvas.addEventListener("mousemove", function (e) {
		g_buttonCanvasManager.hoverHandler(e);

		game.scene.hoverHandler(e);

	});

	// 左键点击
	canvas.addEventListener("click", function (e) {
		if (g_buttonCanvasManager.clickHandler(e)) {
			return;
		}
		
		game.scene.clickHandler(e);
	});

	// 右键点击
	var canvasDom = document.getElementById("myCanvas");
	canvasDom.oncontextmenu = function (e) {
		game.scene.rightClickHandler(e);
		return false;
	};

}

