module.exports = function(objRepo) {
    return function(req, res, next) {
        console.log('Received chat message: ' + req.body.message);

        objRepo.io.emit('chat message', 'Sir? ' + req.body.message);
    };
};
