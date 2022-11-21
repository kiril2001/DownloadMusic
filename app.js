//requiered packages
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const yt = require("yt-converter");
const timeout = require('connect-timeout');
const ytdl = require('ytdl-core');
const fs = require('fs');
const  YoutubeMp3Downloader = require("youtube-mp3-downloader");

//create de express server
const app = express();

//server port number
const PORT = process.env.PORT || 3000;

//set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//needed to parse html 
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


app.get("/", function (req, res) {
    res.render('index');
})




var cancionesLinks = []
var cancionesTitle = []
var cancionesImage = []

app.post("/convert-mp3", async (req, res) => {
    cancionesLinks = []
    cancionesTitle = []
    cancionesImage = []

    const id1 = req.body.videoId; //lo que estara en el buscador

    const fetchAPI = await fetch(`https://youtube138.p.rapidapi.com/search/?q=${id1}&hl=en&gl=US`, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host": process.env.API_HOST
        }
    })

    const Res = await fetchAPI.json();

    for (let i = 0; i < 10;) {
        if (Res["contents"][i]["channel"]) {
            i++
        } else {
            cancionesTitle.push(Res["contents"][i]["video"]["title"]);
            cancionesImage.push(Res["contents"][i]["video"]["thumbnails"][0]["url"]);
            cancionesLinks.push(Res["contents"][i]["video"]["videoId"]);
            i++
        }
    }

    console.log(cancionesTitle);
    console.log(cancionesLinks);






    return res.render("index", {
        comprobar: true,
        success: true,
        song_id1: 0, song_title1: cancionesTitle[0], song_image1: cancionesImage[0],
        song_id2: 1, song_title2: cancionesTitle[1], song_image2: cancionesImage[1],
        song_id3: 2, song_title3: cancionesTitle[2], song_image3: cancionesImage[2],
        song_id4: 3, song_title4: cancionesTitle[3], song_image4: cancionesImage[3],
        song_id5: 4, song_title5: cancionesTitle[4], song_image5: cancionesImage[4],
        song_id6: 5, song_title6: cancionesTitle[5], song_image6: cancionesImage[5],
        song_id7: 6, song_title7: cancionesTitle[6], song_image7: cancionesImage[6],
        song_id8: 7, song_title8: cancionesTitle[7], song_image8: cancionesImage[7],
        song_id9: 8, song_title9: cancionesTitle[8], song_image9: cancionesImage[8],
        song_id10: 9, song_title10: cancionesTitle[9], song_image10: cancionesImage[9],

    })



})
app.post("/descargar", async (req, res) => {
    const id = req.body.codSong; //lo que estara en el buscador
    
    DownloadMp3(cancionesLinks[id], cancionesTitle[id])
    if(__dirname + cancionesTitle){
        return res.redirect("/")
    }


})
const os = require("os");

// check the available memory
const userHomeDir = os.homedir();


//start the server
app.listen(PORT, () => {
    console.log(`Server starded on port ${PORT}`);
})

function DownloadMp3(videoId, titulo) {
    listo = false
    yt.convertAudio({
        url: `https://www.youtube.com/watch?v=${videoId}`,
        itag: 140,
        directoryDownload: `${userHomeDir}\\Downloads`,
        title: titulo
        
    })
}


