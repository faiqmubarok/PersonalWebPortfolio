import multer from "multer";
import path from "path";

export const createMulterUpload = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder); // Folder tempat menyimpan file
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

    const fileFilter = (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|svg/; 
      const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = allowedTypes.test(file.mimetype);

      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only images are allowed"));
      }
    };

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
    fileFilter,
  });
};
