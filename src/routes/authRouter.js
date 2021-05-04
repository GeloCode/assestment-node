import express from 'express';
import { login } from '../controllers/authController';

const authRouter = () => {
  const router = express.Router();

  router.route('/').post(login);

  return router;
};
export default authRouter;
