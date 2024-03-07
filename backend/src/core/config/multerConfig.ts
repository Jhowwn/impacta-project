import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000)

export default({
  fileFilter: (req, file, cb) => {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(file.mimetype)) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'))
    }

    return cb(null, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', '..', 'uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`)
    }
  })
})
