function downloadSong(){

    var file = document.getElementById("fileToUpload").value;

    $.ajax({
        url: '/downloadSong',
        type: 'GET',
        data: {
            songName: file
        },
        success: function() {
            var loader = document.getElementById("downloadLoader");
            loader.style.visibility = "hidden";

            var p = document.getElementById("isDownloaded");
            p.style.visibility = "visible";
            p.style.color = "green";
            p.innerHTML = "Song has been downloaded";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);
        },
        error: function(jqXHR) {
            var loader = document.getElementById("downloadLoader");
            loader.style.visibility = "hidden";

            var p = document.getElementById("isDownloaded");
            p.style.visibility = "visible";
            p.style.color = "red";
            if(jqXHR.status == 418){
                p.innerHTML = "Song has already been downloaded";
            
            } else if(jqXHR.status == 400){
                var loader = document.getElementById("downloadLoader");
                loader.style.visibility = "hidden";
                
                p.innerHTML = "Song has not been downloaded";
            
            }
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);
        }
    });


}


var download = document.getElementById("downloadButton");

download.addEventListener("click", function() {
    var loader = document.getElementById("downloadLoader");
    loader.style.visibility = "visible";

});