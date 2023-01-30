exports.getEvent = (req, res, next) => {
    res.json({
        message: 'get event successfully',
    });
    next();
}

exports.postEvent = (req, res, next) => {
    res.json({
        message: 'post event successfully',
    });
    next();
}