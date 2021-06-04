const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');

const storageFiles = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        cb(null, `${uniqid()}${extension}`) //It generates an unique ID for the file
    },
});

const file = multer({ 
    storage: storageFiles,
    dest: 'public/files/',
    limits: {
        fileSize: 1000000,
        
    }
}).single('file');

module.exports = {
    file,
}