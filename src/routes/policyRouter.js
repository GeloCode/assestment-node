import express from 'express';

import { getPolicies, getPolicyById } from '../controllers/policyController.js';

const policiesRouter = () => {
  const router = express.Router();

  router.route('/').get(getPolicies);
  
  router.route('/:id').get(getPolicyById);

  return router;
};

export default policiesRouter;
