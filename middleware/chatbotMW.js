module.exports = function(objectrepository, viewName) {
    return function(req, res, next) {
        const message = req.body.message;
        console.log(`Received message: ${message}`);
        // TODO: process the message and return a response
        const response = `You said: "${message}"`;
        res.send(response);
    };
};
