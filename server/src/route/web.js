const express = require('express');
const router = express.Router();
/* const userController = require('../controllers/userController'); */

let initWebRoutes = (app) => {

    /* router.post('/api/login', userController.handleLoging);
    router.post('/api/create-user', userController.createUser); */


    return app.use("/", router);
}

module.exports = initWebRoutes;