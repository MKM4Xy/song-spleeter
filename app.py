from sre_parse import TYPE_FLAGS
import flask, spleeter, audioManager, youtubeDownloader, likeComparison, audioCombiner, separatedSongList
from flask import render_template, request
import os
from dotenv import load_dotenv


load_dotenv()

SONG_DIR = os.getenv('SONG_DIR', "songs/audios")
OUTPUT_DIR = os.getenv('OUTPUT_DIR', "songs/output")
COMBINED_DIR = os.getenv('COMBINED_DIR', "songs/combined")


app = flask.Flask(__name__, template_folder='templates')

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/separate', methods=['POST'])
def separate():
    data = request.json

    file = data.get('file')
    format = data.get('format')
    stems = data.get('stems')
    fileName = likeComparison.searchSongMatch(file, SONG_DIR)

    return spleeter.separate(fileName, format, stems, SONG_DIR, OUTPUT_DIR)
    


@app.route('/getAudioFiles', methods=['GET'])
def getAudioFiles():
    songName = request.args.get('songName')
    return audioManager.get_stems(songName, OUTPUT_DIR);


@app.route('/getSingleAudio', methods=['GET'])
def getSingleAudio():
    song = request.args.get('songName')
    songName = likeComparison.searchSongMatch(song, SONG_DIR)
    instrument = request.args.get('instrument')
    return audioManager.get_audio(songName, instrument, OUTPUT_DIR)


@app.route('/downloadSong', methods=['GET'])
def downloadSong():
    songName = request.args.get('songName')
    return youtubeDownloader.downloadAudio(songName, SONG_DIR)


@app.route('/combineSong', methods=['POST'])
def combineSong():
    songName = request.json.get('songName')
    songName = likeComparison.searchSongMatch(songName, SONG_DIR)
    vocalsVolume = request.json.get('vocalsVolume')
    drumsVolume = request.json.get('drumsVolume')
    bassVolume = request.json.get('bassVolume')
    otherVolume = request.json.get('otherVolume')

    return audioCombiner.combineAudio(songName, {'vocals': vocalsVolume, 'drums': drumsVolume, 'bass': bassVolume, 'other': otherVolume}, COMBINED_DIR, OUTPUT_DIR)


@app.route('/getCombinedAudio', methods=['GET'])
def getCombinedAudio():
    songName = request.args.get('songName')
    songName = likeComparison.searchSongMatch(songName, SONG_DIR)
    return audioManager.get_combined_audio(songName, COMBINED_DIR)


@app.route('/getSeparatedSongsTitles', methods=['GET'])
def getSeparatedSongsTitles():
    return separatedSongList.getSeparatedSongsTitles(OUTPUT_DIR)

if __name__ == '__main__':
   app.run()
