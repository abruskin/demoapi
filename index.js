import express from 'express' ;
import morgan from 'morgan';
import config from './config/index.js';
import memoRouter from './resources/memo/memo.router.js';
import fs from 'fs';
import userRouter from './resources/user/user.router.js';
import {auth} from './lib/jwt.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded);
app.use(morgan(config.morgan_format));
app.use('/api/user', userRouter);


app.use(auth);

app.use('/api/memo', memoRouter);


app.listen(config.port, () => {
    console.log(`server running | on port ${config.port} | ${config.env}`);
});


