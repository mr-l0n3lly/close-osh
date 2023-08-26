import express from 'express';
import { opportunitiesController } from '../controllers';
export const opportunitiesRouter = express.Router()

opportunitiesRouter
  .get('/', opportunitiesController.getFiltered)
