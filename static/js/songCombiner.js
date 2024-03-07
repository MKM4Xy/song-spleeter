function combineSong() {
    var songName = document.getElementById("fileToUpload").value;
    if(songName == ""){
        var dropMenu = document.getElementById("alreadySeparatedSongs");
        songName = dropMenu.options[dropMenu.selectedIndex].text;

    }
    
    var volumeControlVocals = document.getElementById('volumeControlVocals');
    var vocalsVolume = volumeControlVocals.value;

    var volumeControlVocals = document.getElementById('volumeControlDrums');
    var drumsVolume = volumeControlVocals.value;

    var volumeControlVocals = document.getElementById('volumeControlBass');
    var bassVolume = volumeControlVocals.value;

    var volumeControlVocals = document.getElementById('volumeControlOther');
    var otherVolume = volumeControlVocals.value;
    

    $.ajax({
        url: '/combineSong',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            songName: songName,
            vocalsVolume: vocalsVolume,
            drumsVolume: drumsVolume,
            bassVolume: bassVolume,
            otherVolume: otherVolume
        }),

        success: function() {
            var download = document.getElementById('combinedDownload');
            download.style.visibility = 'visible';
            download.href = "/getCombinedAudio?songName=" + songName;

        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}


function combineUserSongs(){
    var selectedFiles = new FormData();
    var fileInput = document.getElementById("uploadUser1");
    selectedFiles.append('audio1', fileInput.files[0]);
    var fileInput = document.getElementById("uploadUser2");
    selectedFiles.append('audio2', fileInput.files[0]);
    var fileInput = document.getElementById("uploadUser3");
    selectedFiles.append('audio3', fileInput.files[0]);
    var fileInput = document.getElementById("uploadUser4");
    selectedFiles.append('audio4', fileInput.files[0]);


    $.ajax({
        url: '/combineSongFromUpload',
        type: 'POST',
        data: selectedFiles,
        contentType: false,
        processData: false,

        success: function() {
            document.getElementById("downloadUserCombined").style.visibility = 'visible';
            document.getElementById("downloadUserCombined").href = "/getCombinedAudioFromUpload";

        },
        error: function(error) {
            console.error('Error:', error);
        }
    });

}