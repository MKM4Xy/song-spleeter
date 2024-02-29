function separate() {
    var file = document.getElementById('fileToUpload').value;
    var stems = document.getElementById('stems').value;
    var format = document.getElementById('format').value;


    $.ajax({
        url: '/separate',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            file: file,
            format: format,
            stems: stems
    }),

        success: function() {
            var loader = document.getElementById("separateLoader");
            loader.style.visibility = "hidden";

            var p = document.getElementById("separateLabel");
            p.style.visibility = "visible";
            p.style.color = "green";
            p.innerHTML = "Enjoy the song!";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);
            showAudio();
            putAudioInOption(file);

        },
        
        error: function(){
            var loader = document.getElementById("separateLoader");
            loader.style.visibility = "hidden";

            var p = document.getElementById("separateLabel");
            p.style.visibility = "visible";
            p.style.color = "red";
            p.innerHTML = "Error while separating the song.";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);
        
        }
    });

    
}


var download = document.getElementById("separateButton");

download.addEventListener("click", function() {
    var loader = document.getElementById("separateLoader");
    loader.style.visibility = "visible";

});