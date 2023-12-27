const chai = require('chai');
const supertest = require('supertest');
const app = require('../index'); // assuming your main file is named index.js

const expect = chai.expect;
const request = supertest(app);

describe('Express App', () => {
  it('should respond with "Hello, World!" for GET request to /', (done) => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('Hello, World!');
        done();
      });
  });

  it('should respond with 404 for unknown routes', (done) => {
    request.get('/unknown-route')
      .expect(404, done);
  });
});
