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

/* var volumeControl = document.getElementById("volumeControl");
volumeControl.addEventListener("input", function() {
    var volume = parseFloat(volumeControl.value);
    updateVolume(volume);
});

function updateVolume(volume) {
    var audio = document.getElementById('vocalsAudio');
        audio.volume = volume;
} */


function updateVolume(id, volume) {
    var audio = document.getElementById(id);
    audio.volume = volume;
    var splitName = id.split('Audio')[0];
    var label = document.getElementById(splitName + "VolumeLabel");
    label.innerHTML = "Volume: " + (volume * 100).toFixed(0) + "%";
    
}
