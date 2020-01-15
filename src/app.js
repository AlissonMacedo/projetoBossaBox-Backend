import 'dotenv/config';

import express from 'express';
import cors from 'cors';
// import Youch from 'youch';
import * as Sentry from '@sentry/node';

import http from 'http';

import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }

  middlewares() {
    // this.app.use(Sentry.Handlers.requestHandler()); // olhar
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
    // this.app.use(Sentry.Handlers.errorHandler());
  }

  // exceptionHandler() {
  //   this.app.use(async (err, req, res, next) => {
  //     if (process.env.NODE_ENV === 'development') {
  //       const errors = await new Youch(err, req).toJSON();

  //       return res.status(500).json(errors);
  //     }
  //     return res.status(500).json({ error: 'Internal server error' });
  //   });
  // }
}

export default new App().server;
