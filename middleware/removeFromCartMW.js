module.exports = function(objRepo, app) {
    return function(req, res, next) {
        if (typeof app.locals.orders === 'undefined') {
            app.locals.orders = [];
        }

        if (typeof res.locals.food !== 'undefined') {
            app.locals.orders = app.locals.orders.filter(function(order) {
                return order._id.toString() !== res.locals.food._id.toString();
            });
            app.locals.total = app.locals.orders.reduce((sum, food) => sum + food.price, 0);
            console.log(app.locals.orders);
        }

        return next();
    };
};