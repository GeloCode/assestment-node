import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import session from 'express-session';
import NodeCache from 'node-cache';

import {
  HTTP_CODES,
  HTTP_MESSAGES,
  DEFAULT_MESSAGE_VIABLE_URLS
} from './utils/constants.js';

import authMiddleware from './middlewares/authMiddleware.js';
import credentialsCheckMiddleware from './middlewares/credentialsCheckMiddleware.js';
import makeRequestToAssetmentMiddleware from './middlewares/makeRequestToAssetmentMiddleware.js';

import authRouter from './routes/authRouter.js';
import clientRouter from './routes/clientRouter.js';
import policyRouter from './routes/policyRouter.js';

const app = express();
const myCache = new NodeCache();

app.use(session({
  secret: config.get('SECRET_SESSION'),
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: DEFAULT_MESSAGE_VIABLE_URLS });
});

app.use('/login', credentialsCheckMiddleware, makeRequestToAssetmentMiddleware(myCache, config.get('CLIENTS_URI')), authRouter());

app.use('/clients', authMiddleware, makeRequestToAssetmentMiddleware(myCache, config.get('CLIENTS_URI'), config.get('POLICIES_URI')), clientRouter());

app.use('/policies', authMiddleware, makeRequestToAssetmentMiddleware(myCache, config.get('POLICIES_URI')), policyRouter());

app.use((req, res) => {
  res
    .status(HTTP_CODES.BAD_REQUEST)
    .send({
      code: HTTP_CODES.BAD_REQUEST,
      message: `${HTTP_MESSAGES.BAD_REQUEST}: this resource is not defined`
    });
});

export default app;
