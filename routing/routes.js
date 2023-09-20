const delFoodMW = require('../middleware/food/delFoodMW');
const getFoodMW = require('../middleware/food/getFoodMW');
const getFoodListMW = require('../middleware/food/getFoodListMW');
const saveFoodMW = require('../middleware/food/saveFoodMW');

const addToCartMW = require('../middleware/addToCartMW');
const removeFromCartMW = require('../middleware/removeFromCartMW');
const renderMW = require('../middleware/renderMW');
const FoodModel = require('../models/food');


module.exports = function(app, io) {

    const objRepo = {
        FoodModel: FoodModel,
        io: io
    };

    app.use(
        '/food/new', 
        saveFoodMW(objRepo),
        renderMW(objRepo, 'foodForm')
    );

    app.use(
        '/food/edit/:foodid', 
        getFoodMW(objRepo),
        saveFoodMW(objRepo),
        renderMW(objRepo, 'foodForm')
    );

    app.get(
        '/food/del/:foodid', 
        getFoodMW(objRepo),
        delFoodMW(objRepo),
    );  

    app.use(
        '/order/:foodid', 
        getFoodMW(objRepo),
        addToCartMW(objRepo, app)
    );  

    app.use(
        '/remove/:foodid', 
        getFoodMW(objRepo),
        removeFromCartMW(objRepo, app),
        renderMW(objRepo, 'orders')
    );  

    app.get(
        '/food', 
        getFoodListMW(objRepo),
        renderMW(objRepo, 'foodList')
    );  

    app.get(
        '/orders', 
        getFoodListMW(objRepo),
        renderMW(objRepo, 'orders')
    ); 
    
    app.get(
        '/success', 
        renderMW(objRepo, 'success')
    ); 

    app.use(
        '/',
        getFoodListMW(objRepo),
        renderMW(objRepo, 'index')
    );
};