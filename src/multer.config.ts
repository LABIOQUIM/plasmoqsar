import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const multerConfig = {
  storage: diskStorage({
    destination: './Files',
    filename: (req, file, cb) => {
      const fileName = path.parse(file.originalname).name.replace(/\s/g, '');

      const extension = path.parse(file.originalname).ext;

      const userDir = `./Files/${req.headers['x-username']}`;

      if (fs.existsSync(userDir)) {
        fs.rmSync(userDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
      }

      cb(null, `${req.headers['x-username']}/${fileName}${extension}`);
    },
  }),
};

export default multerConfig;