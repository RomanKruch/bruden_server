const multer = require('multer');
const path = require('path');
require('dotenv').config();
const TEMP = path.join(process.cwd(), process.env.TEMP_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(new Error('Bad file !!'), false);
  },
});

module.exports = upload;
