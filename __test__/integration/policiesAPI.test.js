import config from 'config';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import app from '../../src/app';
import policies from '../samples/policiesBritneySample.json';

describe('POLICIES API testing', () => {
  describe('GET /policies', () => {
    let token, client;

    beforeEach(() => {
      client = {
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin'
      };

      token = jwt.sign(client, config.get('SECRET_KEY'), {
        expiresIn: '1m'
      });
    });

    it('200 Policies of client if token is properly formed', async () => {
      const policiesRequest = await supertest(app)
        .get('/policies')
        .set('Authorization', `Bearer ${token}`);

      expect(policiesRequest.status).toBe(200);
      expect(policiesRequest.body).toEqual(policies);
    });

    it('400 Bad Request token is empty', async () => {
      const policiesRequest = await supertest(app)
        .get('/policies')
        .set('Authorization', `Bearer `);

      expect(policiesRequest.status).toBe(400);
    });
  });
});
