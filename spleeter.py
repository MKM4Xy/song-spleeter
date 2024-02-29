import subprocess, json
import os

@staticmethod
def separate(songName, format, stems, source_directory="songs", output_directory="songs/output/"):

    if songName != None and format != None and stems != None:
        print("Separating audio file: " + songName + "." + format)

        # subprocess.run(["spleeter", "separate", file + "." + format,"-c", format, "-p", "spleeter:"+stems+"stems", "-o", "output"], cwd="songs")
        # without doing cwd
        song_path = os.path.join(source_directory, songName + "." + format)
        
        subprocess.run(["spleeter", "separate", song_path,"-c", format, "-p", "spleeter:"+stems+"stems", "-o", output_directory])

        
        return json.dumps({'success': True, 'result': "ok"}), 200

    else:
        return json.dumps({'success': False, 'error': "Error in processing the song"}), 400

    


