import * as request from 'supertest';
import app from '../src/index';

describe('Test the routes', () => {
  test('POST: /query_arab_to_roman should return a successful response object', async () => {
    try {
      const expectedJson = {
        success: true,
        data: null,
        error: null,
      };
      const requestData = {
        nb: 500,
      };
      const response = await request(app)
        .post('/query_arab_to_roman')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .catch((err: Error) => {
          console.error(err);
          throw err;
        });
      expect(response.body).toEqual(expectedJson);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });

  test('POST: /query_arab_to_roman should return an error if parameter is not a number', async () => {
    try {
      const expectedJson = {
        success: false,
        data: null,
        error: 'CC is not a number',
      };
      const requestData = {
        nb: 'CC',
      };
      const response = await request(app)
        .post('/query_arab_to_roman')
        .send(requestData)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(401)
        .catch((err: Error) => {
          console.error(err);
          throw err;
        });
      expect(response.body).toEqual(expectedJson);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
});
