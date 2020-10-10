var g_options_default = {
    showfps : false,
    showHp: false,
}

var g_options_default_debug = {
    showfps: true,
    showHp: true,
}

var g_options = JSON.parse(JSON.stringify(g_options_default));
if (g_debug_mode_enabled) {
    g_options = JSON.parse(JSON.stringify(g_options_default_debug));
}

(function() {
    var json = window.localStorage.getItem("srw2js_save_options");
    if (json) {
        var datas = JSON.parse(json);
        if (datas) {
            var keys = Object.keys(datas);
            for (var i = 0; i < keys.length; ++i) {
                g_options[keys[i]] = datas[keys[i]];
            }

        }
    }
    
})();
