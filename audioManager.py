import os
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from typing import List
from fastapi.responses import FileResponse


def get_stems(songName: str, directory: str = "songs/output/") -> JSONResponse:
    final_dir = os.path.join(directory, songName.replace(" ", "_").replace(".", "_"))
    stems = os.listdir(final_dir)
    stem_paths = [os.path.join(final_dir, stem) for stem in stems]
    return JSONResponse(content={"stems": stem_paths})

def get_audio(songName: str, instrument: str, directory: str = "songs/combined/") -> str:
    final_dir = os.path.join(directory, songName.replace(" ", "_").replace(".", "_"))
    return FileResponse(os.path.join(final_dir, f"{instrument}.mp3"))

def get_combined_audio(songName: str, directory: str = "songs/output/") -> str:
    final_dir = os.path.join(directory, songName.replace(" ", "_").replace(".", "_"))
    return FileResponse(os.path.join(final_dir, "combinedAudio.mp3"))

def get_combined_audio_from_upload(combined_dir):
    return FileResponse(os.path.join(combined_dir, "combinedAudio.mp3"))