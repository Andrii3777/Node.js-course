import express from 'express';
import session from 'express-session';
import cors from 'cors';
import routerV1 from './api/v1';
import routerV2 from './api/v2';
import path from 'path';

const app = express();
const port = 3005;

app.use(express.json());
// app.use(express.static(path.join(__dirname, '../public'))); // Hosting static files
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(session({
    store: new session.MemoryStore(),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

app.use('/api/v1', routerV1);
app.use('/api/v2', routerV2);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});