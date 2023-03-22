/**
 * returns all the foods in the database
 * @param objectrepository 
 * @returns 
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');
    
    return function(req, res, next) {


        FoodModel.find({}, (err, foods) => {
            if (err) {
                return next(err);
            }

            res.locals.foods = foods;
            return next();
        });
    };
};