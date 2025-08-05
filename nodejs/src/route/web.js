import express from "express";
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {

    // API for user
    router.post('/api/login', userController.Login);
    router.post('/api/create-user', userController.createuser);


    return app.use("/", router);
}

module.exports = initWebRoutes;