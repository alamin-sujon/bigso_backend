import { Router } from 'express';
import { ebayController } from './ebay.controller';

const route = Router();

route.get('/', ebayController.getProducts);

export const ebayRoute = route;
