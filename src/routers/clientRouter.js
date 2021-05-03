import express from 'express';

import { getClients, getClientById, getClientPoliciesById } from '../controllers/clientController.js';

const clientsRouter = () => {
  const router = express.Router();

  router.route('/').get(getClients);

  router.route('/:id').get(getClientById);

  router.route('/:id/policies').get(getClientPoliciesById);

  return router;
};

export default clientsRouter;
