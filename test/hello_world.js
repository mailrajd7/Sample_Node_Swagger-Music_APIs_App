let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../app');

chai.use(chaiHttp);

describe('controllers', function() {
  describe('hello_world', function() {
    describe('GET /hello', function() {
      it('should return a default string', function(done) {
          chai.request(server)
          .get('/hello')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql('Hello, stranger!');
            done();
          });
      });
      it('should accept a name parameter', function(done) {
        chai.request(server)
        .get('/hello')
        .query({ name: 'Scott'})
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.eql('Hello, Scott!');
          done();
        });
    });
    })
  })
})

