import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { userRouter, adminRouter } from './routes/router';
import { createAndFillTables } from './database/tablesInfill';
import { runCron } from './util/cron';

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1/', userRouter);
app.use('/admin/api/v1/', adminRouter);

createAndFillTables();
runCron();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
