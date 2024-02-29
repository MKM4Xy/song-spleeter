var volumeControlBass = document.getElementById("volumeControlBass");
var previousValueBass = volumeControlBass.value;
var AudioIdBass = document.getElementById("bassAudio").id;

volumeControlBass.addEventListener("input", function() {
    var currentValueBass = parseFloat(volumeControlBass.value);

    if (currentValueBass !== parseFloat(previousValueBass)) {
        previousValueBass = volumeControlBass.value;
    }

    updateVolume(AudioIdBass, currentValueBass);
});