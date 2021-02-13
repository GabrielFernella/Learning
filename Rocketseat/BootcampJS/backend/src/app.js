import 'dotenv/config'; // depois de importado, todos os dados ficam em uma variável do node chamada process.env

import express from 'express';
import path from 'path';
import Youch from 'youch';
import 'express-async-errors';
import * as Sentry from '@sentry/node'; // Ferramenta de tratativas de errros
import sentryConfig from './config/sentry'; // Configs de acesso ao sentry web
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig); // startando as ferrametas do sentry

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json()); // middleware para aceitar requisições no formato json
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // Quando o Middleware recebe 4 parametros, o express entende que é um middleware de tratamento de exceções
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
