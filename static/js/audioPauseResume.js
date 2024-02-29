function pause_resume(){
    var audio = document.getElementById('vocalsAudio');

    if (audio.paused) {
        audio.play();
        var audio = document.getElementById('bassAudio');
        audio.play();
        var audio = document.getElementById('drumsAudio');
        audio.play();
        var audio = document.getElementById('otherAudio');
        audio.play();
    } else {
        audio.pause();
        var audio = document.getElementById('bassAudio');
        audio.pause();
        var audio = document.getElementById('drumsAudio');
        audio.pause();
        var audio = document.getElementById('otherAudio');
        audio.pause();
    }


}