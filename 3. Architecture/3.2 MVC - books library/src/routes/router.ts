import express from 'express';
import multer from 'multer';
import { auth } from '../util/auth';
import { getImage } from '../database/gettingData';
import { getBooksPage, getBookPage, incrementBookWanted } from '../controllers/user';
import { getAdminPage, addBook, markBookAsDeleted, logout } from '../controllers/admin';

const upload = multer();
export const userRouter = express.Router();
export const adminRouter = express.Router();

userRouter.get('/', getBooksPage);
userRouter.get('/book/:id', getBookPage);
userRouter.get('/book/wanted/:id', incrementBookWanted);
userRouter.get('/image/:id', getImage);

adminRouter.use(auth);
adminRouter.get('/', getAdminPage);
adminRouter.post('/addBook', upload.single('image'), addBook);
adminRouter.get('/delete/:id', markBookAsDeleted);
adminRouter.get('/logout', logout);
adminRouter.get('/image/:id', getImage);