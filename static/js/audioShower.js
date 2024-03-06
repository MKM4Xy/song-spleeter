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
            var audio = document.getElementById('bassAudio');
            var link = "/getSingleAudio?songName=" + file + "&instrument=bass";
            audio.src = link;
            loadWaveform(link, "bassWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            document.getElementById('bassAudioDiv').appendChild(audio);
            document.getElementById('bassDiv').style.visibility = "visible";


            var audio = document.getElementById('drumsAudio');
            link = "/getSingleAudio?songName=" + file + "&instrument=drums";
            audio.src = link;
            loadWaveform(link, "drumsWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "drumsAudio";
            document.getElementById('drumsAudioDiv').appendChild(audio);
            document.getElementById('drumsDiv').style.visibility = "visible";

            
            var audio = document.getElementById('otherAudio');
            link = "/getSingleAudio?songName=" + file + "&instrument=other";
            audio.src = link;
            loadWaveform(link, "otherWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "otherAudio";
            document.getElementById('otherAudioDiv').appendChild(audio);
            document.getElementById('otherDiv').style.visibility = "visible";

            
            var audio = document.getElementById('vocalsAudio');
            link = "/getSingleAudio?songName=" + file + "&instrument=vocals";
            audio.src = link;
            loadWaveform(link, "vocalsWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "vocalsAudio";
            document.getElementById('vocalsAudioDiv').appendChild(audio);
            document.getElementById('vocalsDiv').style.visibility = "visible";

            document.getElementById("timeModulatorLabel").style.visibility = "visible"
            document.getElementById("timeModulatorSlider").style.visibility = "visible"
            setTimeout(function(){setSliderTime()}, 1000);

            document.getElementById("pauseResume").style.visibility = "visible";
            document.getElementById("syncAudio").style.visibility = "visible";
            document.getElementById("combineSong").style.visibility = "visible";
            document.getElementById("combinedDownload").style.visibility = "visible";
            
        },

        error: function () {
           
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

            var audio = document.getElementById('bassAudio');
            var link = "/getSingleAudio?songName=" + file + "&instrument=bass";
            audio.src = link;
            loadWaveform(link, "bassWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            document.getElementById('bassAudioDiv').appendChild(audio);
            document.getElementById('bassDiv').style.visibility = "visible";


            var audio = document.getElementById('drumsAudio');
            link = "/getSingleAudio?songName=" + file + "&instrument=drums";
            audio.src = link;
            loadWaveform(link, "drumsWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "drumsAudio";
            document.getElementById('drumsAudioDiv').appendChild(audio);
            document.getElementById('drumsDiv').style.visibility = "visible";

            
            var audio = document.getElementById('otherAudio');
            link = "/getSingleAudio?songName=" + file + "&instrument=other";
            audio.src = link;
            loadWaveform(link, "otherWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "otherAudio";
            document.getElementById('otherAudioDiv').appendChild(audio);
            document.getElementById('otherDiv').style.visibility = "visible";

            
            var audio = document.getElementById('vocalsAudio');
            link = "/getSingleAudio?songName=" + file + "&instrument=vocals";
            audio.src = link;
            loadWaveform(link, "vocalsWaveForm");
            audio.type = "audio/" + format;
            audio.controls = false;
            audio.autoplay = true;
            audio.id = "vocalsAudio";
            document.getElementById('vocalsAudioDiv').appendChild(audio);
            document.getElementById('vocalsDiv').style.visibility = "visible";

            document.getElementById("timeModulatorLabel").style.visibility = "visible"
            document.getElementById("timeModulatorSlider").style.visibility = "visible"
            setTimeout(function(){setSliderTime()}, 1000);

            document.getElementById("pauseResume").style.visibility = "visible";
            document.getElementById("syncAudio").style.visibility = "visible";
            document.getElementById("combineSong").style.visibility = "visible";
            document.getElementById("combinedDownload").style.visibility = "visible";

        },

        error: function () {
           
        }
        
     });

}