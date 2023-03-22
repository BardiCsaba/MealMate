const delFoodMW = require('../middleware/food/delFoodMW');
const getFoodMW = require('../middleware/food/getFoodMW');
const getFoodListMW = require('../middleware/food/getFoodListMW');
const saveFoodMW = require('../middleware/food/saveFoodMW');

const renderMW = require('../middleware/renderMW');
const chatbotMW = require('../middleware/chatbotMW');
const FoodModel = require('../models/food');


module.exports = function(app) {
    const objRepo = {
        FoodModel: FoodModel,
    };

    app.post(
        '/chatbot',
        chatbotMW(objRepo)
    );

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

    app.get(
        '/food', 
        getFoodListMW(objRepo),
        renderMW(objRepo, 'foodList')
    );  

    app.use(
        '/',
        getFoodListMW(objRepo),
        renderMW(objRepo, 'index')
     );
};