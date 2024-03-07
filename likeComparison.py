from fuzzywuzzy import process
import os

def searchSongMatch(songName, directory="songs"):
    if songName == None:
        return None
    songNames = []
    for file in os.listdir(directory):
        if file.endswith('.mp3') or file.endswith('.wav'):
            songNames.append(file.split('.')[0])
    
    if len(songNames) == 0:
        return None

    match, score = process.extractOne(songName.replace(" ", "_").replace(".", "_"), songNames)
    if score >= 80:  
        return match.split('.')[0]
    else:
        return None
