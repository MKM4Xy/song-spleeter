import json
import os
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from typing import Optional
import spleeter
import audioManager
import youtubeDownloader
import likeComparison
import audioCombiner
import separatedSongList
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import imgManager


load_dotenv()

SONG_DIR = os.getenv('SONG_DIR', "songs/audios")
OUTPUT_DIR = os.getenv('OUTPUT_DIR', "songs/output")
COMBINED_DIR = os.getenv('COMBINED_DIR', "songs/combined")
PORT = int(os.getenv('PORT', 8000))

if not os.path.exists(SONG_DIR):
    os.makedirs(SONG_DIR)

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

if not os.path.exists(COMBINED_DIR):
    os.makedirs(COMBINED_DIR)


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post('/separate')
async def separate(data: dict):
    file = data.get('file')
    format = data.get('format')
    stems = data.get('stems')
    if(file == None or format == None or stems == None):
        return JSONResponse(status_code=400, content={"error": "Invalid content"})
    
    fileName = likeComparison.searchSongMatch(file, SONG_DIR)
    return spleeter.separate(fileName, format, stems, SONG_DIR, OUTPUT_DIR)

@app.get('/getAudioFiles')
async def getAudioFiles(songName: str):
    return audioManager.get_stems(songName, OUTPUT_DIR)

@app.get('/getSingleAudio')
async def getSingleAudio(songName: str, instrument: str):
    songName = likeComparison.searchSongMatch(songName, SONG_DIR)
    return audioManager.get_audio(songName, instrument, OUTPUT_DIR)

@app.get('/downloadSong')
async def downloadSong(songName: str):
    if likeComparison.searchSongMatch(songName, SONG_DIR) == None:
        return youtubeDownloader.downloadAudio(songName, SONG_DIR)
    
    else:
        return JSONResponse(status_code=418, content={"error": "Song has already been downloaded"})

@app.post('/combineSong')
async def combineSong(request : Request):
    data = await request.json()
    songName = data.get('songName')
    vocalsVolume = data.get('vocalsVolume')
    drumsVolume = data.get('drumsVolume')
    bassVolume = data.get('bassVolume')
    otherVolume = data.get('otherVolume')

    songName = likeComparison.searchSongMatch(songName, SONG_DIR)
    volumes = {'vocals': vocalsVolume, 'drums': drumsVolume, 'bass': bassVolume, 'other': otherVolume}
    return audioCombiner.combineAudio(songName, volumes, COMBINED_DIR, OUTPUT_DIR)

@app.get('/getCombinedAudio')
async def getCombinedAudio(songName: str):
    songName = likeComparison.searchSongMatch(songName, SONG_DIR)
    return audioManager.get_combined_audio(songName, COMBINED_DIR)

@app.get('/getSeparatedSongsTitles')
async def getSeparatedSongsTitles():
    return separatedSongList.getSeparatedSongsTitles(OUTPUT_DIR)

@app.get('/getImgFromName')
def getImg(data):
    img = data.get('imgName')
    return imgManager.getImgFromName(img)

@app.get('/favicon.ico')
def favicon():
    return FileResponse('static/favicon.ico')

""" @app.get('/getBenito')
def getBenito():
    return FileResponse('imgs/benito.png') """




if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=PORT)
