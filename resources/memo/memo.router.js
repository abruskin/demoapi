import {Router} from 'express';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import controller from './memo.controller.js';
const router = Router ();
const app = express();
app.use(express.json());
app.use(morgan('dev'));

router.route('/')
    .post(controller.post)
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getById)
    .put(controller.put)
    .delete(controller.del)



export default router;