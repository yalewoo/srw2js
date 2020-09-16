

var ButtonManager = function() {
    this.buttonhandlers = [null, null, null, null, null, null, null, null, null]
    this.used = 0;

    this.registerHandler = function(id, callback)
    {
        this.buttonhandlers[id] = callback;
    }

    this.addButtonHandler = function(name, callback)
    {
        var id = "button" + (this.used+1);
        log(id)
        var d = document.getElementById(id);
        d.innerText = name;

        this.buttonhandlers[this.used] = callback;
        ++this.used;
    }

    this.runHandler = function(id)
    {
        this.buttonhandlers[id-1]();
    }

    this.draw = function() {
        for (var i = 1; i <= 9; ++i)
        {
            var id = "button" + i;
            var d = document.getElementById(id);

            if (this.buttonhandlers[i-1])
            {
                d.style.display = "inline";
            }
            else
            {
                d.style.display = "none";
            }
        }
    }

    this.clear = function() {
        this.buttonhandlers = [null, null, null, null, null, null, null, null, null]
        this.used = 0;
    }
}

var g_buttonManager = new ButtonManager();

function buttonHandler(id) {
    g_buttonManager.runHandler(id);
}