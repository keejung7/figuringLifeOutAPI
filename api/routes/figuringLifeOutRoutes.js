'use strict';
module.exports = function(app) {
    let figuringLifeOut = require('../controllers/figuringLifeOutController');
    
    app.route('/plants')
        .get(figuringLifeOut.listAllPlants)
        .post(figuringLifeOut.createPlant);

    app.route('/plants/:id')
        .get(figuringLifeOut.getPlant)
        .put(figuringLifeOut.updatePlant)
        .delete(figuringLifeOut.deletePlant);
};

