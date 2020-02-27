# Music Swagger API
* This is a NodeJS and Swagger based sample project, which exposes apis for getting music, music details, music stream.
* It also has option to upload a music file with thumbnail and other details

## Pre-requisite
* NodeJS v10
* npm install -g swagger

## Tools and Technologies Used
* Swagger
* NodeJS
* Mocha, Chai

## URLS LISTS

### Test Url
* http://127.0.0.1:10010/hello?name=Scott

### ALL Songs
* http://127.0.0.1:10010/songs

### Particular Song
* http://127.0.0.1:10010/songs/{id}

### AdminView To add Song
* http://127.0.0.1:10010/


### Stream musics
* http://127.0.0.1:10010/musics/{filename}

### PostMethod For Uploading
* http://127.0.0.1:10010/upload


## Installation
* npm install

## Running Test Cases
* npm run test

## Runing API Application without Swagger
* npm start

# Running Appliaction with Swagger
* swagger project start

## Running application with swagger in edit mode
* swagger project edit
* Open http://127.0.0.1:43911/#/edit in browser and perform operations