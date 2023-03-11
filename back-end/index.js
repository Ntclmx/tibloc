const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const PORT = 4000;

const eventRoutes = require('./src/routes/event');
const faqRoutes = require('./src/routes/faq');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(bodyParser.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('eventLogo'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/v1/', eventRoutes);
app.use('/v1/', faqRoutes);

app.use((req, res) => {
    res.status(404);
    res.send('404 Not Found');
});

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message : message, data: data});
});

mongoose.connect('mongodb+srv://tibloc:MongoDBtibloc@cluster0.vlfqswq.mongodb.net/tibloc?retryWrites=true&w=majority')
.then( () => {
    app.listen(PORT, () => {
        console.log(`Tibloc running on http://localhost:${PORT}`);
    });
}).catch( err => console.log(err));

