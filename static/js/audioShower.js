function showAudio() {
    let file = document.getElementById('fileToUpload').value;
    var format = document.getElementById('format').value;
    $.ajax({
        url: '/getSingleAudio',
        type: 'GET',
        data: {
            songName: file,
            instrument: "vocals"
        },
        success: function() {
            
            var p = document.getElementById("isAlreadySeparated");
            p.style.visibility = "visible";
            p.style.color = "green";
            p.innerHTML = "Enjoy the song!";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);

            var audio = document.getElementById('bassAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=bass";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            document.getElementById('bassAudioDiv').appendChild(audio);
            document.getElementById('bassDiv').style.visibility = "visible";


            var audio = document.getElementById('drumsAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=drums";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "drumsAudio";
            document.getElementById('drumsAudioDiv').appendChild(audio);
            document.getElementById('drumsDiv').style.visibility = "visible";

            
            var audio = document.getElementById('otherAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=other";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "otherAudio";
            document.getElementById('otherAudioDiv').appendChild(audio);
            document.getElementById('otherDiv').style.visibility = "visible";

            
            var audio = document.getElementById('vocalsAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=vocals";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "vocalsAudio";
            document.getElementById('vocalsAudioDiv').appendChild(audio);
            document.getElementById('vocalsDiv').style.visibility = "visible";

            document.getElementById("timeModulatorLabel").style.visibility = "visible";
            document.getElementById("timeModulatorSlider").style.visibility = "visible";
            document.getElementById("currentTimeLabel").style.visibility = "visible";

            setTimeout(function(){setSliderTime()}, 1000);

        },

        error: function () {
            var p = document.getElementById("isAlreadySeparated");
            p.style.visibility = "visible";
            p.style.color = "red";
            p.innerHTML = "Song has not been separated yet, please separate the song first.";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);
        }
        
     });

}


function showAudioBySelectedSong(selectedSong) {
    let file = selectedSong;
    var format = document.getElementById('format').value;
    $.ajax({
        url: '/getSingleAudio',
        type: 'GET',
        data: {
            songName: file,
            instrument: "vocals"
        },
        success: function() {
            /* if(file == "faccetta nera"){
                document.getElementById("duce").style.visibility = "visible";
        
            }else{
                document.getElementById("duce").style.visibility = "hidden";
            } */

            var p = document.getElementById("isAlreadySeparated");
            p.style.visibility = "visible";
            p.style.color = "green";
            p.innerHTML = "Enjoy the song!";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);

            var audio = document.getElementById('bassAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=bass";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            document.getElementById('bassAudioDiv').appendChild(audio);
            document.getElementById('bassDiv').style.visibility = "visible";


            var audio = document.getElementById('drumsAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=drums";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "drumsAudio";
            document.getElementById('drumsAudioDiv').appendChild(audio);
            document.getElementById('drumsDiv').style.visibility = "visible";

            
            var audio = document.getElementById('otherAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=other";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "otherAudio";
            document.getElementById('otherAudioDiv').appendChild(audio);
            document.getElementById('otherDiv').style.visibility = "visible";

            
            var audio = document.getElementById('vocalsAudio');
            audio.src = "/getSingleAudio?songName=" + file + "&instrument=vocals";
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "vocalsAudio";
            document.getElementById('vocalsAudioDiv').appendChild(audio);
            document.getElementById('vocalsDiv').style.visibility = "visible";

            document.getElementById("timeModulatorLabel").style.visibility = "visible"
            document.getElementById("timeModulatorSlider").style.visibility = "visible"
            setTimeout(function(){setSliderTime()}, 1000);

        },

        error: function () {
            var p = document.getElementById("isAlreadySeparated");
            p.style.visibility = "visible";
            p.style.color = "red";
            p.innerHTML = "Song has not been separated yet, please separate the song first.";
            setTimeout(function(){p.style.visibility = "hidden"}, 3000);
        }
        
     });

}