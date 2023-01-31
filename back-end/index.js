const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./src/routes/event');
const app = express();

const PORT = 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/v1/', eventRoutes);

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

app.listen(PORT, () => {
    console.log(`Tibloc running on http://localhost:${PORT}`);
});