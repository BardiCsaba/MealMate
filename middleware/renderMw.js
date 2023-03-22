/**
 * renders the page
 * @param objectrepository 
 * @returns 
 */
 module.exports = function(objectrepository, viewName) {
    return function(req, res, next) {
        res.render(viewName);
    };
};