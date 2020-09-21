

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

    this.unshowButton1 = function() {
        var d = document.getElementById("buttons1");
        d.style.display = "block";
    }
}

var g_buttonManager = new ButtonManager();

function buttonHandler(id) {
    g_buttonManager.runHandler(id);
}

var showMenu1 = function(robots)
{
    g_buttonManager.clear();
    g_buttonManager.addButtonHandler("AI行动", function () {
        robots.selectedRobot.AI_action();
    })

    g_buttonManager.addButtonHandler("待命", function () {
        robots.setSelectedRobotInactive();
    })

    var robot = robots.selectedRobot;
    if (robot.canAttack1()) {
        g_buttonManager.addButtonHandler(robot.weapon1.name, function () {
            robot.attack1();
        })
    }
    if (robot.canAttack2()) {
        g_buttonManager.addButtonHandler(robot.weapon2.name, function () {
            robot.attack2();
        })
    }

}