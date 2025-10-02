import { Router } from 'express';
import { workRoute } from '../modules/work/work.route';
import { feedbackRoute } from '../modules/feedback/feedback.route';
import { textRoute } from '../modules/homeText/text.route';
import { ebayRoute } from '../modules/ebay/ebay.route';

const route = Router();
const modules = [
  {
    path: '/work',
    route: workRoute,
  },
  {
    path: '/feedback',
    route: feedbackRoute,
  },
  {
    path: '/text',
    route: textRoute,
  },
  {
    path: '/ebay',
    route: ebayRoute,
  },
];

modules.map((el) => route.use(el.path, el.route));
export default route;
