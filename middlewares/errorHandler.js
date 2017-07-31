module.exports = function (err, req, res, next) {
    console.error(err, req.body);
    res.sendStatus(500);
};