var Map = function(scene_main, stage){
	this.scene = scene_main;

	var cxt = scene_main.cxt;
	this.maprects = []
	var stage_map_old = map_data[stage-1];
	var stage_map = stage_map_old[0].map(function(col, i) {
        return stage_map_old.map(function(row) {
        	return row[i];
       })
    });
	cxt.canvas.setAttribute("width",stage_map.length*32);
	cxt.canvas.setAttribute("height",stage_map[0].length*32);
	for (var i = 0; i < stage_map.length; ++i)
	{
		var arr = [];
		for (var j = 0; j < stage_map[i].length; ++j)
		{
			var rect = new MapRect(cxt, i, j, stage_map[i][j]);
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

	this.logXY = function(x, y)
	{
		console.log(this.maprects[x][y]);
	}

}

var MapRect = function(cxt, x, y, type){
	this.x = x;
	this.y = y;
	this.cxt = cxt;
	this.img = g_resourceManager.img_maprect[type];
	this.draw = function() {
		this.cxt.drawImage(this.img,this.x*32,this.y*32);
	}
}