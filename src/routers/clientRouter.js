import express from 'express';

import { getClients, getClientById } from '../controllers/clientController';

const clientsRouter = () => {
  const router = express.Router();

  router.route('/').get(getClients);

  router.route('/:id').get(getClientById);

  return router;
};

export default clientsRouter;
