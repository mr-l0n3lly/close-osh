import { Router } from 'express';
import { pipeController } from '../controllers';

export const pipesRouter = Router();

pipesRouter.get('/', pipeController.getAll);
