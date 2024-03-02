function resetAudio() {
    var audio = document.getElementById('bassAudio');
    audio.currentTime = 0;
    var audio = document.getElementById('drumsAudio');
    audio.currentTime = 0;
    var audio = document.getElementById('otherAudio');
    audio.currentTime = 0;            
    var audio = document.getElementById('vocalsAudio');
    audio.currentTime = 0;
}


function updateVolume(id, volume) {
    var audio = document.getElementById(id);
    audio.volume = volume;
    var splitName = id.split('Audio')[0];
    var label = document.getElementById(splitName + "VolumeLabel");
    label.innerHTML = "Volume: " + (volume * 100).toFixed(0) + "%";
    
}


function syncAudio() {
    currentTimes = [];
    var audio = document.getElementById('bassAudio');
    currentTimes.push(audio.currentTime);
    var audio = document.getElementById('drumsAudio');
    currentTimes.push(audio.currentTime);
    var audio = document.getElementById('otherAudio');
    currentTimes.push(audio.currentTime);
    var audio = document.getElementById('vocalsAudio');
    currentTimes.push(audio.currentTime);

    var minTime = Math.min.apply(Math, currentTimes);

    var audio = document.getElementById('bassAudio');
    audio.currentTime = minTime;
    var audio = document.getElementById('drumsAudio');
    audio.currentTime = minTime;
    var audio = document.getElementById('otherAudio');
    audio.currentTime = minTime;
    var audio = document.getElementById('vocalsAudio');
    audio.currentTime = minTime;

}