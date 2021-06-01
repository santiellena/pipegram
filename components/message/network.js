const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files/');
    },
    filename: (req, file, cb) => {
        const [name, extension] = file.originalname.split('.');
        cb(null, `${name}-${Date.now()}.${extension}`)
    }
});

const upload = multer({ storage: storage });

const response = require('../../network/response');
const controller =  require('./controller');

router.get('/', (req, res) => {
    const filterMessages = req.query.idChat || null;
    controller.getMessages(filterMessages)
    .then(list => {
        response.success(req, res, list, 200);
    })
    .catch(e => {
        response.error(req, res, 'Request error', 400, e);
    })
});


router.post('/', upload.single('file'), (req, res) => {
    
    controller.addMessage(req.body.idUser, req.body.message, req.body.idChat, req.file)
    .then(() => {
        response.success(req, res, 'Created successfully', 201);
    })
    .catch( e => {
        response.error(req, res, "Request error", 400, e);
    });
    
    
});

router.patch('/:id', (req, res) => {

    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {

        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Internal error', 500, e);
    });

});

router.delete('/:id', (req, res) => {

    controller.deleteMessage(req.params.id)
    .then((data) => {

        response.success(req, res, data, 200);
    })
    .catch(e => {

        response.error(req, res, 'Internal error', 500, e);
    });

});

module.exports = router;