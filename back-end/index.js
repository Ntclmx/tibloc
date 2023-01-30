const express = require('express');

const event = require('./src/routes/event');x

app.use('/', event);

app.use((req, res) => {
    res.status(404);
    res.send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Tibloc running on http://localhost:${port}`);
});