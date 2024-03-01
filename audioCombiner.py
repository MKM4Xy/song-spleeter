import os
import subprocess
from fastapi import HTTPException
from fastapi.responses import JSONResponse


def combineAudio(song_name: str, volumes: dict, combined_directory: str, output_directory: str):
    song_name = song_name.replace(" ", "_")

    dir_path = os.path.join(output_directory, song_name)
    output_dir = os.path.join(combined_directory, song_name)
    os.makedirs(output_dir, exist_ok=True)

    input_string = ''
    volumes_string = ''
    number_of_files = 0
    letters = ['a', 'b', 'c', 'd']
    for key in volumes.keys():
        file_path = os.path.join(dir_path, f"{key}.mp3")
        if os.path.isfile(file_path):
            input_string += f'-i "{file_path}" '
            volumes_string += f'[{number_of_files}:a]volume={volumes[key]}[{letters[number_of_files]}];'
            number_of_files += 1

    if number_of_files == 0:
        raise HTTPException(status_code=404, detail="No valid input files found.")

    input_string = input_string.strip()
    volumes_string = volumes_string.strip(';')

    command_string = (
        f'ffmpeg {input_string} '
        f'-filter_complex {volumes_string};[a][b][c][d]amix=inputs={number_of_files}:duration=longest '
        f'"{os.path.join(output_dir, "combinedAudio.mp3")}" -y'
    )

    try:
        subprocess.run(command_string, shell=True, check=True, cwd=os.getcwd())
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Failed to combine audio: {e}")

    return JSONResponse(content={"result": "success"})
