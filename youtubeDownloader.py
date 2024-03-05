import json, likeComparison
from pytube import Search, YouTube

def downloadAudio(title, directory="songs"):

    match = likeComparison.searchSongMatch(title)

    if(match == None):

        if title.startswith("https") or title.startswith("http:"):
            try:
                print("Downloading audio: " + title)

                yt = YouTube(title)
                song_title = yt.title.replace(" ", "_")
                stream = yt.streams.filter(only_audio=True).first()
                stream.download(output_path=directory, filename=f"{song_title}.mp3")

                print("Download complete")
                return json.dumps({'success': True, 'result': "ok"}), 200
            
            except Exception as e:
                print(f"Error: {e}")
                return json.dumps({'success': False, 'error': "Song has not been downloaded"}), 400

        try:
            print("Downloading audio: " + title)
            search_results = Search(title)
            video = search_results.results[0]
            
            url = video.watch_url

            yt = YouTube(url)
            stream = yt.streams.filter(only_audio=True).first()
            song_title = yt.title.replace(" ", "_")

            stream.download(output_path=directory, filename= song_title + ".mp3")

            print("Download complete")
            return json.dumps({'success': True, 'result': "ok"}), 200
            
        except Exception as e:
            print(f"Error: {e}")
            return json.dumps({'success': False, 'error': "Song has not been downloaded"}), 400


    else:
        return json.dumps({'success': False, 'error': "Song already downloaded"}), 418