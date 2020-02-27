const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const file = path.join(__dirname, "data/db.json");

module.exports = class Musics {
    constructor(songame,artist,duration,releaseDate,songimage,songurl,filmName,company) {
        this.songame = songame;
        this.artist = artist;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.songimage = songimage;
        this.songurl = songurl;
        this.filmName = filmName;
        this.company = company;
    }

    static all() {
        return new Promise(function (resolve, reject) {
            fs.readFile(file, function (error, fileContents) {
                if (error !== null) {
                    console.log("error:", error);
                    reject();
                }
                const songs = JSON.parse(fileContents);
                resolve(songs)
            });
        });
    }

    static get(id) {
        return new Promise(function (resolve, reject) {
            fs.readFile(file, function (error, fileContents) {
                if (error !== null) {
                    console.log("error:", error);
                    reject();
                }
                const songs = JSON.parse(fileContents);
                const song = songs.find(function (s) {
                    return s.id === id
                });
                resolve(song);
            });
        });
    }

    save() {
        const { songame,artist,duration,releaseDate,songimage,songurl,filmName,company } = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(file, function (error, fileContents) {
                if (error !== null) {
                    console.log("error occured", error);
                    reject();
                }
                const songs = JSON.parse(fileContents);
                songs.push({ id: uuidv4(), songame,artist,duration,releaseDate,songimage,songurl,filmName,company });
                fs.writeFile(file, JSON.stringify(songs), function (error) {
                    if (error !== null) {
                        console.log("error occured", error);
                        reject();
                    }
                    resolve();
                });
            })

        });
    }
}