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
    var audiosNames = ["uploadUser1", "uploadUser2", "uploadUser3", "uploadUser4"];

    for(var i = 0; i < 4; i++){
        var file = document.getElementById(audiosNames[i]).files[0];
        if(file != undefined || file != null){
            selectedFiles.append("audios", file);
        }
    }

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