var time = document.getElementById("timeModulatorSlider");

time.addEventListener("input", function() {
    timeValue = time.value;

    var audio = document.getElementById('bassAudio');
    audio.currentTime = timeValue;
    var audio = document.getElementById('drumsAudio');
    audio.currentTime = timeValue;
    var audio = document.getElementById('otherAudio');
    audio.currentTime = timeValue;            
    var audio = document.getElementById('vocalsAudio');
    audio.currentTime = timeValue;

    if(audio.onpause){
        audio.play();
    }

});


function setSliderTime() {
    songLength = document.getElementById('vocalsAudio').duration;
    document.getElementById("timeModulatorSlider").max = songLength;

}

function setCurrentTime(currentTime){
    time = document.getElementById("timeModulatorSlider");
    time.value = currentTime;

}


var vocalsAudio = document.getElementById('vocalsAudio');

vocalsAudio.addEventListener("timeupdate", function() {
    setCurrentTime(vocalsAudio.currentTime);
    document.getElementById("currentTimeLabel").innerHTML = formatTime(vocalsAudio.currentTime);
});


function formatTime(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = Math.floor(timeInSeconds % 60);
    return pad(minutes) + ":" + pad(seconds);
}


function pad(number) {
    return (number < 10) ? "0" + number : number;
}
