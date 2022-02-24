const path = require('path');
const multer = require('multer');
const mime = require('mime');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = mime.getExtension(file.mimetype);
    let filename = file.fieldname + '-' + uniqueSuffix + '.' + ext;
    cb(null, filename)
  }
});

const limits = {
  fileSize: 204800,
  files: 1,
};

const fileFilter = (req, file, cb) => {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  const acceptType = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
  if (!acceptType.includes(file.mimetype)) {
    // You can always pass an error if something goes wrong:
    cb(new Error('文件类型必须是.png,.jpg,.jpeg,.gif'))
  } else {
    // To accept the file pass `true`
    cb(null, true)
  }
}
const upload = multer({ storage, limits, fileFilter }).single('companyLogo');

const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.render('fail', {
        data: JSON.stringify({ message: '文件超出200K' })
      })
    } else if (err) {
      // An unknown error occurred when uploading.
      res.render('fail', {
        data: JSON.stringify({ message: err.message })
      })
    } else {
      // Everything went fine.
      const { companyLogo_old } = req.body;
      if (req.file && companyLogo_old) {
        try {
          fs.unlinkSync(path.join(__dirname, `../public/uploads/${companyLogo_old}`));
          req.companyLogo = req.file.filename;
        } catch (error) {
          console.log(error);
        }
      } else if (!req.file && companyLogo_old) {
        req.companyLogo = companyLogo_old;
      } else {
        req.companyLogo = req.file.filename;
      }
      next();
    }
  })
}

module.exports = uploadMiddleware