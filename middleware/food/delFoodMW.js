/**
 * deletes the food with the given id from the database
 * @param objectrepository 
 * @returns 
 */
module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.food === 'undefined') {
            return next();
        }

        res.locals.food.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/food');
        });
    };
};