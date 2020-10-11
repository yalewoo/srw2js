var MusicManager = function(game) {
    this.game = game;
    this.audio1 = document.getElementById('music1');
    this.audio2 = document.getElementById('music2');
    this.audio3 = document.getElementById('music3');


    this.audios = {};
    this.audios_name = {
        start: "audio/music2/85.mp3",
        main_robot: "audio/music2/87.mp3",
        main_enemy: "audio/music2/88.mp3",
        main_add_enemy: "audio/music2/8D.mp3",
        start_map: "audio/music2/89.mp3",
        start_map_dididi: "audio/wav/dididi.mp3",
        start_title: "audio/music2/92.mp3",
        click: "audio/wav/pushbutton.mp3",
        attack: "audio/wav/huoqiu.mp3",
        boom: "audio/wav/boom.mp3",
        recover: "audio/wav/recover.mp3",
        weapon66: "audio/wav/weapon66.mp3",
        80: "audio/music2/80.mp3",
        81: "audio/music2/81.mp3",
        82: "audio/music2/82.mp3",
        83: "audio/music2/83.mp3",
        84: "audio/music2/84.mp3",
        85: "audio/music2/85.mp3",
        86: "audio/music2/86.mp3",
        87: "audio/music2/87.mp3",
        88: "audio/music2/88.mp3",
        89: "audio/music2/89.mp3",
        "8A": "audio/music2/8A.mp3",
        "8B": "audio/music2/8B.mp3",
        "8C": "audio/music2/8C.mp3",
        "8D": "audio/music2/8D.mp3",
        "8E": "audio/music2/8E.mp3",
        "9F": "audio/music2/9F.mp3",
        90: "audio/music2/90.mp3",
        91: "audio/music2/91.mp3",
        92: "audio/music2/92.mp3",
        93: "audio/music2/93.mp3",

    }

    this.currentLoop = null;

    this.PlayOnceFromStart = function(name, callback) {
        



        if (!this.audios[name])
        {
            this.audios[name] = new Audio(this.audios_name[name]);
        }

        var audio = this.audios[name];
        audio.loop = false;
        audio.currentTime = 0;
        audio.play();

        if (callback)
        {
            audio.onended  = callback;
        }
    }
    this.PlayLoopFromStart = function (name, recordCurrent) {
        if (name == "main_robot") {
            if (this.game && this.game.scene && this.game.scene.map && this.game.scene.map.style == "D") {
                name = "8C"
            }
        }
        if (name == "main_enemy") {
            if (this.game && this.game.scene && this.game.scene.map && this.game.scene.map.style == "D") {
                name = 91
            }
        }

        recordCurrent = recordCurrent == false ? false : true;
        if (!this.audios[name]) {
            this.audios[name] = new Audio(this.audios_name[name]);
        }

        
        var audio = this.audios[name];
        audio.loop = true;
        audio.currentTime = 0;
        audio.play();
        if (recordCurrent)
        {
            this.currentLoop = audio;
        }
    }
    this.PlayLoopFrom = function (name, time, recordCurrent) {
        recordCurrent = recordCurrent == false ? false : true;
        if (!this.audios[name]) {
            this.audios[name] = new Audio(this.audios_name[name]);
        }

        var audio = this.audios[name];
        audio.loop = true;
        audio.currentTime = time;
        audio.play();
        if (recordCurrent) {
            this.currentLoop = audio;
        }
    }

    this.PlayLoopContinue = function() {
        this.currentLoop.play();
    }

    this.stopAll = function() {
        for (var key in this.audios)
        {
            this.audios[key].pause();
        }
    }


   
}