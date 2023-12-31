import * as fs from "fs";
import { diskStorage } from "multer";
import * as path from "path";

const multerConfig = {
  limits: {
    fileSize: 8000000, // Compliant: 8MB
  },
  storage: diskStorage({
    destination: "/files",
    filename: (req, file, cb) => {
      const fileName = path.parse(file.originalname).name.replace(/\s/g, "");

      const extension = path.parse(file.originalname).ext;

      // @ts-expect-error
      const userDir = `/files/${req.username}`;

      if (fs.existsSync(userDir)) {
        fs.rmSync(userDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
      }

      // @ts-expect-error
      cb(null, `${req.username}/${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
