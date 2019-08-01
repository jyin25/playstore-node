const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET /apps endpoint', () => {
  it('should return array', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      })
  })

  it('must sort by rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'Rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        let rating = true;
        let i = 0
        while(rating && i < res.body.length -1) {
          if(res.body[i].Rating <= res.body[i + 1].Rating) {
            i++
          } else {
            rating = false;
          }
        }
        expect(rating).to.be.true;
      })
  })
})