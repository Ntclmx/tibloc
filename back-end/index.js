const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const eventRoutes = require('./src/routes/event');
const faqRoutes = require('./src/routes/faq');
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const MongoStore = require('connect-mongo');
// const sessionStore = require("connect-mongoose-session-store")(express);
// const passport = require("passport");
// const passportSetup = require("./src/controllers/passport");
// const cookieSession = require("cookie-session");
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 4000;
// import SequelizeStore from "connect-session-sequelize";
console.log("Start Routing1");
const app = express();


// sessionStore = new sessionStore({
//     host: 'localhost',
//     port: 4000,
//     db: 'mydb',
//     stringify: false,
//     maxAge: 60 * 60 * 1000,
//     autoRemoveExpiredSession: true,
//     sessionSchema: 'any_mongoose_schema',        // optional
//     sessionHistorySchema: 'any_mongoose_schema'  // optional
// });

// app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     // store: MongoStore.create({
//     //     mongoUrl: 'mongodb+srv://tibloc:MongoDBtibloc@cluster0.vlfqswq.mongodb.net/tibloc?retryWrites=true&w=majority'
//     // }),
//     cookie: {
//         maxAge : 8400000,
//         httpOnly: false
//     }
// }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));



console.log("Start Routing3");
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
)

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

console.log("Start Routing5");
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
}).any());



app.use('/public', express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

console.log("Start Routing");

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

    res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Tibloc running on http://localhost:${PORT}`);
        });
    }).catch(err => console.log(err));

