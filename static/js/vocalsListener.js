var volumeControlVocals = document.getElementById("volumeControlVocals");
var previousValueVocals = volumeControlVocals.value;
var audioIdVocals = document.getElementById("vocalsAudio").id;

volumeControlVocals.addEventListener("input", function() {
    var currentValueVocals = parseFloat(volumeControlVocals.value);

    if (currentValueVocals !== parseFloat(previousValueVocals)) {
        previousValueVocals = volumeControlVocals.value;
    }

    updateVolume(audioIdVocals, currentValueVocals);
});