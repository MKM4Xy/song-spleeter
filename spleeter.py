import subprocess, os
from fastapi.responses import JSONResponse

@staticmethod
def separate(songName, format, stems, source_directory="songs", output_directory="songs/output/"):

    if songName != None and format != None and stems != None:
        print("Separating audio file: " + songName + "." + format)

        song_path = os.path.join(source_directory, songName + "." + format)
        
        subprocess.run(["spleeter", "separate", song_path,"-c", format, "-p", "spleeter:"+stems+"stems", "-o", output_directory])
        
        return JSONResponse(status_code=200, content={"success": "ok"})

    else:
        return JSONResponse(status_code=400, content={"error": "Error in processing the song"})

    


