function pause_resume(){
    var audio = document.getElementById('vocalsAudio');
    var waves = waveSurfers;
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

    var wave = waves['vocalsWaveForm'];
    wave.playPause();
    wave = waves['bassWaveForm'];
    wave.playPause();
    wave = waves['drumsWaveForm'];
    wave.playPause();
    wave = waves['otherWaveForm'];
    wave.playPause();


}