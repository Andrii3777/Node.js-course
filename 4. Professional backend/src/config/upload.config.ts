import { UnsupportedMediaTypeException } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export const uploadConfig = {
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new UnsupportedMediaTypeException('File does not match the format .jpg/.jpeg/.png/.gif'), false);
        }
        callback(null, true);
    },
};