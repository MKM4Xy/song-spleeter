import os

def getSeparatedSongsTitles(directory="songs/output/"):

    dirNames = []
    for dir in os.listdir(directory):
        dir_path = os.path.join(directory, dir)
        if os.path.isdir(dir_path):
            dirNames.append(dir.replace("_", " ").replace(".", " "))

    return dirNames 