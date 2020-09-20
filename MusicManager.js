var MusicManager = function() {
    this.audioContainer = document.getElementById('musicdiv');
    this.audio1 = document.getElementById('music1');
    this.audio2 = document.getElementById('music2');
    this.audio3 = document.getElementById('music3');

    this.backgroundDiv = document.getElementById('music_background');

    this.playOnce = function() {
        this.audio2.play();
    }

    this.PlayAttackOnce = function() {
        this.audio3.currentTime = 0;
        this.audio3.play();
    }

    this.music_start = new Audio("audio/music/85.wav")
    this.music_start.loop = true;
    this.playStart = function() {
       
        this.music_start.play();
    }

    this.stopStart = function() {
        this.music_start.pause();
    }

    this.music_main_robot = new Audio("audio/music/87.wav")
    this.music_main_robot.loop = true;
    this.playRobot = function () {

        this.music_main_robot.play();
    }

    this.stopRobot = function () {
        this.music_main_robot.pause();
    }


    this.music_start_map = new Audio("audio/music/89.wav")
    this.music_start_map.loop = true;
    this.playMap1 = function () {
        this.music_start_map.currentTime = 0.5;
        this.music_start_map.play();
    }

    this.stopMap1 = function () {
        this.music_start_map.pause();
    }


    this.music_start_title = new Audio("audio/music/92.wav")
    this.music_start_title.loop = false;
    this.playTitle = function () {

        this.music_start_title.play();
    }

    this.stopTitle = function () {
        this.music_start_title.pause();
    }


    this.music_dididi = new Audio("audio/wav/dididi.mp3")
    this.music_dididi.loop = false;
    this.playDididi = function () {

        this.music_dididi.play();
    }

    this.stopDididi = function () {
        this.music_dididi.pause();
    }


    
           
}