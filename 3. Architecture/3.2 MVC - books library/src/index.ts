import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { userRouter, adminRouter } from './routes/router';
import { createAndFillTables } from './database/tablesInfill';
import env from './config';
import { runCron } from './util/cron';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(`/api/v${env.API_VERSION}/`, userRouter);
app.use(`/admin/api/v${env.API_VERSION}/`, adminRouter);

createAndFillTables();
//runCron();

app.listen(env.APP_PORT, () => {
    console.log(`Server listening on port ${env.APP_PORT}: http://localhost:${env.APP_PORT}/api/v${env.API_VERSION}/`);
});