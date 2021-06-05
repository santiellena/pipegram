const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');
const config = require('../configs');

const storageFiles = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${config.publicRoute}${config.filesRoute}`);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        cb(null, `${uniqid()}${extension}`) //It generates an unique ID for the file
    },
});

const file = multer({ 
    storage: storageFiles,
    dest: `${config.publicRoute}${config.filesRoute}`,
    limits: {
        fileSize: 1000000,
        
    }
}).single('file');

module.exports = {
    file,
}