var volumeControlDrums = document.getElementById("volumeControlDrums");
var previousValueDrums = volumeControlDrums.value;
var AudioIdDrums = document.getElementById("drumsAudio").id;

volumeControlDrums.addEventListener("input", function() {
    var currentValueDrums = parseFloat(volumeControlDrums.value);

    if (currentValueDrums !== parseFloat(previousValueDrums)) {
        previousValueDrums = volumeControlDrums.value;
    }

    updateVolume(AudioIdDrums, currentValueDrums);
});