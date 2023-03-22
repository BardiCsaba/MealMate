/**
 * returns the food with the given id from the database
 * @param objectrepository 
 * @returns 
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    
    const FoodModel = requireOption(objectrepository, 'FoodModel');
    
    return function(req, res, next) {
        FoodModel.findOne({ _id: req.params.foodid }, (err, food) => {
            if (err || !food) {
                return next(err);
            }

            res.locals.food = food;
            return next();
        });
    };
};