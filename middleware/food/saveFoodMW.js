/**
 * saves the food to the database
 * @param objectrepository 
 * @returns 
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.description === 'undefined' ||
            typeof req.body.price === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.food === 'undefined') {
            res.locals.food = new FoodModel();
        }

        res.locals.food.name = req.body.name;
        res.locals.food.description = req.body.description;
        res.locals.food.price = req.body.price;

        res.locals.food.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/food');
        });
    };
};