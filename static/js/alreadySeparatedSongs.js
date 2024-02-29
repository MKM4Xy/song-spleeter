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
