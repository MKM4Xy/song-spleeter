import likeComparison

from fastapi.responses import JSONResponse
from pytube import Search, YouTube

def downloadAudio(title, directory="songs"):
    if title != None:
        if title.startswith("https") or title.startswith("http:"):
            try:
                print("Downloading audio: " + title)

                yt = YouTube(title)
                song_title = yt.title.replace(" ", "_").replace(".", "_").replace("/", "")
                stream = yt.streams.filter(only_audio=True).first()
                stream.download(output_path=directory, filename=f"{song_title}.mp3")

                print("Download complete")
                return JSONResponse(status_code=200, content={"success": "ok"})
            
            except Exception as e:
                print(f"Error: {e}")
                return JSONResponse(status_code=400, content={"error": "Song has not been downloaded"})

        try:
            print("Downloading audio: " + title)
            search_results = Search(title)
            video = search_results.results[0]
            
            url = video.watch_url

            yt = YouTube(url)
            stream = yt.streams.filter(only_audio=True).first()
            song_title = yt.title.replace(" ", "_").replace(".", "_").replace("/", "")

            stream.download(output_path=directory, filename= song_title + ".mp3")

            print("Download complete")
            return JSONResponse(status_code=200, content={"success": "ok"})
            
        except Exception as e:
            print(f"Error: {e}")
            return JSONResponse(status_code=400, content={"error": "Song has not been downloaded"})


    else:
        return JSONResponse(status_code=400, content={"error": "Invalid song name"})