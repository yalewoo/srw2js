var MusicManager = function() {
    this.audio1 = document.getElementById('music1');
    this.audio2 = document.getElementById('music2');


    this.playOnce = function() {
        this.audio2.play();
    }
}