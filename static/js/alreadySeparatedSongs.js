$(document).ready(function(){
    getSeparatedSongsTitles();

});



function getSeparatedSongsTitles(){
    $.ajax({
        url: '/getSeparatedSongsTitles',
        type: 'GET',
        success: function(response) {
            for(let i = 0; i < response.length; i++){
                dropMenu = document.getElementById("alreadySeparatedSongs");
                option = document.createElement("option");
                option.text = response[i];
                dropMenu.add(option);

            }

        }
    });

}

var dropMenu = document.getElementById("alreadySeparatedSongs");

function putAudioInOption(songName){
    option = document.createElement("option");
    option.text = songName.replace("_", " ");
    dropMenu.add(option);

}


dropMenu.addEventListener("change", function(){
    var selectedSong = dropMenu.options[dropMenu.selectedIndex].text;
    if(selectedSong != "Select already separated songs"){
        showAudioBySelectedSong(selectedSong);
    
    }
    
});





/* ffmpeg -i "1.mp3" -i "2.mp3" -filter_complex "[1:a]adelay=10000|10000[a2]; [0:a][a2]amix=inputs=2:duration=longest[out]" -map "[out]" "done.mp3" -y
 */