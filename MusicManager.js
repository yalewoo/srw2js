var MusicManager = function() {
    this.audioContainer = document.getElementById('musicdiv');
    this.audio1 = document.getElementById('music1');
    this.audio2 = document.getElementById('music2');
    this.audio3 = document.getElementById('music3');



    this.playOnce = function() {
        this.audio2.play();
    }

    this.PlayAttackOnce = function() {
        this.audio3.currentTime = 0;
        this.audio3.play();
    }


           
}