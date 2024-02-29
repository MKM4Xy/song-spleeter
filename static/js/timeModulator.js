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
    //document.getElementById("timeModulatorSlider").style.width = songLength + "px";

}

function setCurrentTime(currentTime){
    time = document.getElementById("timeModulatorSlider");
    time.value = currentTime;

}


var vocalsAudio = document.getElementById('vocalsAudio');

vocalsAudio.addEventListener("timeupdate", function() {
    setCurrentTime(vocalsAudio.currentTime);

});