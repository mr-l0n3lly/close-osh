import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';

// @ts-ignore
// It's done because of tsoa
import { RegisterRoutes } from '../dist/routes';
import { HttpError, logger, NotFoundError } from './utils';

export const app: Application = express();

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json());
app.use(morgan('tiny'));


app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerOptions: {
    url: '/swagger.json',
  },
}));

RegisterRoutes(app)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message })
  }

  res
    .status(500)
    .json({
      error: 'Internal Server Error',
    });
});


