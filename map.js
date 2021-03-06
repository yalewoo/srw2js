var Map = function(scene_main, stage){
	this.scene = scene_main;

	var context2D = scene_main.context2D;
	this.maprects = []

	var map_data = g_stages[stage].map;
	this.style = g_stages[stage].mapStyle ? g_stages[stage].mapStyle : "A";
	// 转置
	var stage_map_old = map_data;
	var stage_map = stage_map_old[0].map(function(col, i) {
        return stage_map_old.map(function(row) {
        	return row[i];
       })
	});

	this.width = stage_map.length + 2;
	this.height = stage_map[0].length + 2;
	
	context2D.canvas.width = this.width*32;
	context2D.canvas.height = this.height*32;



	var stage_map2 = [];
	for (var i = 0; i < this.width; i++) {
		var m2 = [];
		for (var j = 0; j < this.height; j++) {
			m2.push(0);
		}
		stage_map2.push(m2);
	}
	for (var i = 0; i < stage_map.length; ++i) {
		for (var j = 0; j < stage_map[i].length; ++j) {
			stage_map2[i+1][j+1] = stage_map[i][j];
		}
	}

	for (var i = 0; i < stage_map2.length; ++i)
	{
		var arr = [];
		for (var j = 0; j < stage_map2[i].length; ++j)
		{
			var rect = new MapRect(context2D, i, j, stage_map2[i][j], this.style);
			arr.push(rect)
		}
		this.maprects.push(arr);
	}

	this.update = function() {

	}

	this.draw = function() {
		for (var i = 0; i < this.maprects.length; ++i)
		{
			for (var j = 0; j < this.maprects[i].length; ++j)
			{
				this.maprects[i][j].draw();
			}
		}
	}

	this.isSupply = function(x, y)
	{
		return this.maprects[x][y].kind == 10;
	}

	this.mousehoverHandler = function(x, y)
	{
		//log(this.maprects[x][y]);

		//updateMapRectUI(this.maprects[x][y]);
	}

	this.mousedownHandler = function (x, y) {
		//log(this.maprects[x][y]);
		updateRobotUI(null);
		updateMapRectUI(this.maprects[x][y]);

		// var ani = new Weapon66(this.scene, x, y, 1, 30);
		// this.scene.addAnimation(ani);


		//g_buttonCanvasManager.addButtonHandler("Test", null, x*32, y*32, 50, 100);
	}
	

	this.calcDistance = function(robot1, robot2)
	{
		var x1 = robot1.x;
		var y1 = robot1.y;
		var x2 = robot2.x;
		var y2 = robot2.y;

		var dx = Math.abs(x1 - x2);
		var dy = Math.abs(y1 - y2);
		return dx + dy;
	}

}

var MapRect = function(context2D, x, y, type, style){
	this.x = x;
	this.y = y;
	this.context2D = context2D;
	this.kind = type;

	this.style = style;
	this.img = g_resourceManager.get_img_maprect(style, type);
	this.draw = function() {
		this.context2D.drawImage(this.img,this.x*32,this.y*32);
	}
	this.typeName = g_map_data_typename[this.style][type];

	   
	this.moveConsume = [1,1,1];
	this.moveConsume[0] = g_map_data_moveConsumeTable[this.style][0][this.kind];
	this.moveConsume[1] = g_map_data_moveConsumeTable[this.style][1][this.kind];
	this.moveConsume[2] = g_map_data_moveConsumeTable[this.style][2][this.kind];

	if (this.style == "C" && this.kind == 1)
	{
		this.moveConsume[2] = 1;
	}

}