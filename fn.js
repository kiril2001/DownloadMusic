const yt = require("yt-converter");

module.exports = {
    "DownloadMp4": DownloadMp4,
    "DownloadMp3": DownloadMp3,

}




//Download song in mp3
function DownloadMp3(videoId, titulo) {
    listo = false
    yt.convertAudio({
        url: `https://www.youtube.com/watch?v=${videoId}`,
        itag: 140,
        directoryDownload: __dirname,
        title: titulo
    })
}

//Download song in mp4
function DownloadMp4(videoId) {
    yt.convertAudio({
        url: `https://www.youtube.com/watch?v=${codigo[1]}`,
        itag: 18,
        directoryDownload: 'videos', //__dirname
        title: titulo
    })
}



