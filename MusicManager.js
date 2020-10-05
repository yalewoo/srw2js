var MusicManager = function(game) {
    this.game = game;
    this.audio1 = document.getElementById('music1');
    this.audio2 = document.getElementById('music2');
    this.audio3 = document.getElementById('music3');


    this.audios = {};
    this.audios_name = {
        start: "audio/music/85.wav",
        main_robot: "audio/music/87.wav",
        main_enemy: "audio/music/88.wav",
        main_add_enemy: "audio/music/8D.wav",
        start_map: "audio/music/89.wav",
        start_map_dididi: "audio/wav/dididi.mp3",
        start_title: "audio/music/92.wav",
        click: "audio/wav/pushbutton.mp3",
        attack: "audio/wav/huoqiu.mp3",
        boom: "audio/wav/boom.mp3",
        recover: "audio/wav/recover.mp3",
        weapon66: "audio/wav/weapon66.mp3",
        80: "audio/music/80.wav",
        81: "audio/music/81.wav",
        82: "audio/music/82.wav",
        83: "audio/music/83.wav",
        84: "audio/music/84.wav",
        85: "audio/music/85.wav",
        86: "audio/music/86.wav",
        87: "audio/music/87.wav",
        88: "audio/music/88.wav",
        89: "audio/music/89.wav",
        "8A": "audio/music/8A.wav",
        "8B": "audio/music/8B.wav",
        "8C": "audio/music/8C.wav",
        "8D": "audio/music/8D.wav",
        "8E": "audio/music/8E.wav",
        "9F": "audio/music/9F.wav",
        91: "audio/music/91.wav",
        92: "audio/music/92.wav",
        93: "audio/music/93.wav",

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