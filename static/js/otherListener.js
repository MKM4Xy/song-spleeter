var volumeControlOther = document.getElementById("volumeControlOther");
var previousValueOther = volumeControlOther.value;
var AudioIdOther = document.getElementById("otherAudio").id;

volumeControlOther.addEventListener("input", function() {
    var currentValueOther = parseFloat(volumeControlOther.value);

    if (currentValueOther !== parseFloat(previousValueOther)) {
        previousValueOther = volumeControlOther.value;
    }

    updateVolume(AudioIdOther, currentValueOther);
});