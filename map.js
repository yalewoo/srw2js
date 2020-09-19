var Map = function(scene_main, stage){
	this.scene = scene_main;

	var cxt = scene_main.cxt;
	this.maprects = []

	// 转置
	var stage_map_old = map_data[stage-1];
	var stage_map = stage_map_old[0].map(function(col, i) {
        return stage_map_old.map(function(row) {
        	return row[i];
       })
	});

	this.width = stage_map.length + 2;
	this.height = stage_map[0].length + 2;
	
	cxt.canvas.setAttribute("width", this.width*32);
	cxt.canvas.setAttribute("height", this.height*32);


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
			var rect = new MapRect(cxt, i, j, stage_map2[i][j]);
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

	this.mousehoverHandler = function(x, y)
	{
		//log(this.maprects[x][y]);

		//updateMapRectUI(this.maprects[x][y]);
	}

	this.mousedownHandler = function (x, y) {
		//log(this.maprects[x][y]);

		updateMapRectUI(this.maprects[x][y]);
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

var MapRect = function(cxt, x, y, type){
	this.x = x;
	this.y = y;
	this.cxt = cxt;
	this.kind = type;

	this.style = "A"
	this.img = g_resourceManager.img_maprect[type];
	this.draw = function() {
		this.cxt.drawImage(this.img,this.x*32,this.y*32);
	}
	this.typeName = g_map_data_typename[type];

	   
	this.moveConsume = [1,1,1];
	this.moveConsume[0] = g_map_data_moveConsumeTable[0][this.kind];
	this.moveConsume[1] = g_map_data_moveConsumeTable[1][this.kind];
	this.moveConsume[2] = g_map_data_moveConsumeTable[2][this.kind];

	if (this.style == "C" && m_kind == 1)
	{
		m_moveConsume[2] = 1;
	}

}