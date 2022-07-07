const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./ogbmain/uploads/`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +"_" + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true)
    } else {
        //reject file
        cb({message: 'Unsupported file format'}, false)
    }
}  


const upload = multer({
    storage: storage,
 //   limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})  
module.exports = upload;

 