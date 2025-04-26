import { diskStorage } from 'multer';
import { extname } from 'path';

export const uploadContratoOptions = {
    storage: diskStorage({
        destination: './uploads/tmp',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(new Error('Solo se permiten archivos PDF.'), false);
        }
        cb(null, true);
      },
};