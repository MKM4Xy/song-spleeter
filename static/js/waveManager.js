var waveSurfers = [];

function loadWaveform(link, audioDiv) {
    document.getElementById(audioDiv).innerHTML = "";

    var waveSurfer = WaveSurfer.create({
        container: '#' + audioDiv,
        waveColor: 'black',
        progressColor: 'RGB(60,117,255)',
        sampleRate: 8000,
        height: 45,
        width: "80%",
        barGap: 1,
        interact: false
    });

    waveSurfer.load(link);
    waveSurfer.setVolume(0);
    waveSurfer.play();

    waveSurfers[audioDiv] = waveSurfer;

}
