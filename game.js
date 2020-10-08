var Game = function(canvas, fps)
{
	this.canvas = canvas;
	this.context2D = canvas.getContext("2d");
	this.fps = fps;
	this.FPS = 1000 / fps;


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

	}

	var self = this;
	this.run = function() {
		
		var desiredTime = Date.now() + game.FPS;
		var interval = Math.max(0, desiredTime - Date.now());

		self.update();
		self.draw();
		
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

	var self = this;

	//鼠标滑过
	canvas.addEventListener("mousemove", function (e) {
		g_buttonCanvasManager.hoverHandler(e);

		self.scene.hoverHandler(e);

	});

	// 左键点击
	canvas.addEventListener("click", function (e) {
		if (g_buttonCanvasManager.clickHandler(e)) {
			return;
		}
		
		self.scene.clickHandler(e);
	});

	// 右键点击
	var canvasDom = document.getElementById("myCanvas");
	canvasDom.oncontextmenu = function (e) {
		self.scene.rightClickHandler(e);
		return false;
	};

}

