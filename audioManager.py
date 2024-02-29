import flask, spleeter, os
from flask import render_template, request
import json


def get_stems(songName, directory="songs/output/"):
    final_dir = os.path.join(directory, songName.replace(" ", "_"))
    stems = os.listdir(final_dir)
    stemPaths = []
    for stem in stems:
        stemPaths.append(os.path.join(final_dir, stem))

    return json.dumps({'stems': stemPaths}), 200, {'ContentType':'application/json'}


def get_audio(songName, instrument, directory="songs/combined/"):
    final_dir = os.path.join(directory, songName.replace(" ", "_"))
    return send_from_directory(os.path.join(final_dir), instrument + '.mp3')

def get_combined_audio(songName, directory="songs/output/"):
    final_dir = os.path.join(directory, songName.replace(" ", "_"))
    return send_from_directory(final_dir, 'combinedAudio.mp3')

def send_from_directory(directory, filename):
    return flask.send_from_directory(directory, filename)
