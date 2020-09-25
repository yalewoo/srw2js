var MusicManager = function() {
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
        90: "audio/music/90.wav",
        91: "audio/music/91.wav",
        92: "audio/music/92.wav",
        93: "audio/music/93.wav",

    }

    this.PlayOnceFromStart = function(name) {
        if (!this.audios[name])
        {
            this.audios[name] = new Audio(this.audios_name[name]);
        }

        var audio = this.audios[name];
        audio.loop = false;
        audio.currentTime = 0;
        audio.play();
    }
    this.PlayLoopFromStart = function (name) {
        if (!this.audios[name]) {
            this.audios[name] = new Audio(this.audios_name[name]);
        }

        var audio = this.audios[name];
        audio.loop = true;
        audio.currentTime = 0;
        audio.play();
    }
    this.PlayLoopFrom = function (name, time) {
        if (!this.audios[name]) {
            this.audios[name] = new Audio(this.audios_name[name]);
        }

        var audio = this.audios[name];
        audio.loop = true;
        audio.currentTime = time;
        audio.play();
    }

    this.stopAll = function() {
        for (var key in this.audios)
        {
            this.audios[key].pause();
        }
    }


   
}