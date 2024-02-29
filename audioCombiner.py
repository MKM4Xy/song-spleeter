import json
import os
import subprocess

from flask import send_file

def combineAudio(songName, volumes:dict, combined_directory="/songs/combined/", song_directory="songs/"):

    songName = songName.replace(" ", "_")

    # Construct input and output directories
    dir = os.path.join(song_directory, songName)
    output_dir = os.path.join(combined_directory, songName)
    os.makedirs(output_dir, exist_ok=True)

    input_string = ''
    volumes_string = ''
    number_of_files = 0
    letters = ['a', 'b', 'c', 'd']
    for key in volumes.keys():
        if os.path.isfile(os.path.join(dir, key + '.mp3')):
            input_string += f'-i {os.path.join(dir, key + ".mp3")} '
            volumes_string += f'[{number_of_files}:a]volume={volumes[key]}[{letters[number_of_files]}];'
            number_of_files += 1

    input_string = input_string.strip()
    volumes_string = volumes_string.strip(';')

    #ffmpeg -i vocals.mp3 -i drums.mp3 -i bass.mp3 -i other.mp3 -filter_complex [0:a]volume=1[a];[1:a]volume=1[b];[2:a]volume=1[c];[3:a]volume=1[d];[a][b][c][d]amix=inputs=4:duration=longest
    #C:/Users/maxym/Desktop/spleeter2/Pys/songs/output/call_me_maybe/combined/combinedAudio.mp3 -y

    #ffmpeg -i "songs/output/faccetta_nera\vocals.mp3" -i "songs/output/faccetta_nera\drums.mp3" -i 
    #"songs/output/faccetta_nera\bass.mp3" -i "songs/output/faccetta_nera\other.mp3" -filter_complex [0:a]volume=1[a];[1:a]volume=1[b];[2:a]volume=1[c];[3:a]volume=1[d];[a][b][c][d]amix=inputs=4:duration=longest 
    #songs/combined/faccetta_nera\combinedAudio.mp3 -y

    command_string = (
        f'ffmpeg {input_string} '
        f'-filter_complex {volumes_string};[a][b][c][d]'
        f'amix=inputs={number_of_files}:duration=longest '
        f'{os.path.join(output_dir, "combinedAudio.mp3")}'
        ' -y'
    )

    subprocess.run(command_string, capture_output=True, cwd = os.getcwd())


    return json.dumps({'result': "success" }), 200, {'ContentType':'application/json'}