module.exports = {
    getSongs: getSongs,
    getSong: getSong,
    getStreamMusic: getStreamMusic,
    getAddSong: getAddSong,
    postUploadSong: postUploadSong
};

const port = process.env.PORT || 10010;
const musicModel = require("../../musicModel");
const baseUrl = `http://localhost:${port}`;
const fs = require('fs');
const path = require("path");

function getSongs(req, res) {
     return musicModel.all().then(function (songs) {
        const allSongs = songs.map(song => {
            const { songurl, ...rest } = song;
            return {
                ...rest,
                songimage: `${baseUrl}/${rest.songimage}`
            };
        });
         return res.status(200).json({ msg: 'success', data: allSongs });
    }).catch(function (err) {
        return res.status(500).json({ msg: "Error", data: null });
    })
}

function getSong(req,res){
    const _id = req.swagger.params.id.value;
    return musicModel.get(_id).then(function (song) {
        const songObj = {
            ...song,
            songurl: `${baseUrl}/${song.songurl}`,
            songimage:`${baseUrl}/${song.songimage}`
        };
        return res.status(200).json({msg:'success',data:songObj});
    }).catch(function (err) {
        return res.status(500).json({msg:'Error',data:null});
    })
}

function getStreamMusic(req,res){
    const filename = req.swagger.params.filename.value;
    const file = path.join(__dirname,'../../','musics',filename);
    fs.exists(file,(exists)=>{
        if(exists){
            const src = fs.createReadStream(file);
            src.pipe(res);
        }else{
            return res.status(500).json({msg:"file not found",data:null}); 
        }
    });
}


function getAddSong(req,res){
    return res.render('index',{title:'upload songs'});
}

function postUploadSong(req,res){
    let { songname,artistname,duration,releasedate, filmname, company } = req.swagger.params;
    songname = songname.value;
    artistname = artistname.value;
    releasedate = releasedate.value;
    filmname = filmname.value;
    duration = duration.value;
    company = company.value;
    const songImage = req.files['songimage'][0].path.replace(/\s/g, '');
    const songUrl = req.files['songaudio'][0].path.replace(/\s/g, '');
    const musicModal = new musicModel(songname,artistname,duration,releasedate,songImage,songUrl,filmname,company);
    return musicModal.save().then(()=>{
        return res.send(
            '<h1>Song sucessfully added</h1><br/><a href="/">Go home</a> '
        );
    }).catch(err=>{
        return res.send(
            '<h1>Error occured</h1><br/><a href="/">Go home</a> '
        );
    })
}