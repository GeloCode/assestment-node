import axios from 'axios';

import clients from '../samples/clientsBritneytSample.json';
import policies from '../samples/policiesBritneySample.json';

describe('End to end testing', () => {
  describe('When we do a request into our APPLICATION', () => {
    const lohalhost = 'http://localhost:3000';
    const client = {
      name: 'Britney',
      email: 'britneyblankenship@quotezart.com',
    }

    let token;

    beforeEach(async () => {
      let credentials = {
        username: client.name,
        password: client.email,
      };

      const loginRequest = await axios.post(
        `${lohalhost}/login`,
        credentials
      );

      token = loginRequest.data.token;
    });

    describe('200 Responses', () => {
      it('Be able to Retrieve policies with valid token', async () => {
        const policiesRequest = await axios.get( `${lohalhost}/policies`, { headers: { Authorization: `Bearer ${token}` }});

        expect(policiesRequest.status).toBe(200);
        expect(policiesRequest.data).toBeDefined();
        expect(policiesRequest.data).toEqual(policies);
      });
      it('Be able to Retrieve clients with valid token', async () => {
        const clientsRequest = await axios.get( `${lohalhost}/clients`, { headers: { Authorization: `Bearer ${token}` }});

        expect(clientsRequest.status).toBe(200);
        expect(clientsRequest.data).toBeDefined();
        expect(clientsRequest.data).toEqual(clients);
      });
    });
  });
});
