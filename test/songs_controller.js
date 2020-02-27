/*Dont delete db.json file*/

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../app');
chai.use(chaiHttp);


describe('Songs controller', function() {
    it('should return lists  of song', function(done) {
        chai.request(server)
        .get('/songs')
        .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property('content-type','application/json; charset=utf-8');
                res.body.should.have.property('msg');
                res.body.should.have.property('data').to.be.an.instanceof(Array);
            done();
        });
    });

    it('should return a song', function(done) {
        chai.request(server)
        .get('/songs/a5b292bf-c2da-43d1-b629-91b5498a32b7')
        .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property('content-type','application/json; charset=utf-8');
                res.body.should.have.property('msg');
                res.body.should.have.property('data').to.be.an.instanceof(Object);
            done();
        });
    });

    it('should return a html page', function(done) {
        chai.request(server)
        .get('/')
        .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property('content-type','text/html; charset=utf-8');
            done();
        });
    });

    it('should stream musics', function(done) {
        chai.request(server)
        .get('/musics/2020-02-01T08-20-23.002Z-Thanos-remix.mp3')
        .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property('transfer-encoding','chunked');
            done();
        });
    });
})
      

