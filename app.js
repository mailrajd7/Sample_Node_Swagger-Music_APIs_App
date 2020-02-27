'use strict';
const express = require("express");
var SwaggerExpress = require('swagger-express-mw');
var app = express();
const multer = require('multer');
const path = require("path");
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

/*multer code */
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
          cb(null, 'images')
      }else{
          cb(null, 'musics');
      }
  },
  filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname.replace(/\s/g, ''));
  }
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(multer({ storage: fileStorage }).fields([{ name: 'songimage', maxCount: 1 }, { name: 'songaudio', maxCount: 1 }]));
app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

/*Multer code ends*/

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
