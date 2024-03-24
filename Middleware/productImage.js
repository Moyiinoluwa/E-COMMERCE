const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'productImages',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const productUpload = multer({ storage: storage}).single('image')

module.exports = productUpload