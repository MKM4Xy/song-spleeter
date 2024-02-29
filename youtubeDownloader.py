""" import json, os
from pytube import YouTube, Search

def downloadAudio(title):
    try:
        # Search for the video with the given title on YouTube
        search_results = Search(title)
        video = search_results.results[0]

        with open(os.path.join("songs", video.title.split()), 'wb') as f:
            f.write(video.streams.get_audio_only().stream_to_buffer())
        

        return json.dumps({'success': True, 'audio_file': video.title}), 200
        
    except Exception as e:
        print(f"Error: {e}")
        return json.dumps({'success': False, 'error': str(e)}), 400
 """


import json, likeComparison
from pytube import Search, YouTube

def downloadAudio(title, directory="songs"):

    match = likeComparison.searchSongMatch(title)
    if(match == None):

        try:
            print("Downloading audio: " + title)
            # Search for the video with the given title on YouTube
            search_results = Search(title)
            video = search_results.results[0]
            
            url = video.watch_url
            
            # Download the video
            yt = YouTube(url)
            stream = yt.streams.get_audio_only()
            stream.download(output_path=directory, filename=title.replace(" ", "_") + ".mp3")



            print("Download complete")
            return json.dumps({'success': True, 'result': "ok"}), 200
            
        except Exception as e:
            print(f"Error: {e}")
            return json.dumps({'success': False, 'error': "Song has not been downloaded"}), 400

    else:
        return json.dumps({'success': False, 'error': "Song already downloaded"}), 418