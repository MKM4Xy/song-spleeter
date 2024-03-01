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
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


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
    return youtubeDownloader.downloadAudio(songName, SONG_DIR)

@app.post('/combineSong')
async def combineSong(songName: str, vocalsVolume: Optional[float] = None, drumsVolume: Optional[float] = None, bassVolume: Optional[float] = None, otherVolume: Optional[float] = None):
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




if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=PORT)
