
var load_maprect_image = function() {
	var images_path = ["A_00", "A_01", "A_02", "A_03", "A_04", "A_05", "A_06", "A_07", "A_08", "A_09", "A_0A", "A_0B", "A_0C", "A_0D", "A_0E", "A_0F", ];
	var image_path_parent = "img/maprect/";
	var map_images = {};
	for (var i = 0; i < images_path.length; ++i)
	{
		map_images[i] = new Image();
		map_images[i].src = image_path_parent + images_path[i] + ".png";
	}
	return map_images;
}

var ResourceManager = function() {
	this.img_maprect = load_maprect_image();
}