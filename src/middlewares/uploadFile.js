const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => { 
    const { id } = req.params;
    cb(null, id + path.extname(file.originalname));
    // Visto no link shorturl.at/ntzR0
  },
});

module.exports = multer({ storage });