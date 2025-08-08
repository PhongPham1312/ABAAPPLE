import express from "express";
import userController from '../controllers/userController';
import thuchu from '../controllers/thuchi'

let router = express.Router();

let initWebRoutes = (app) => {

    // API for user
    router.post('/api/login', userController.Login);
    router.post('/api/create-user', userController.createuser);

    // thu chi
    router.post('/api/create-thuchi', thuchu.createthuchi);
    router.get('/api/get-thuchi-nam-thang', thuchu.getnamthang);
    router.get('/api/get-thuchi', thuchu.handleGetThuChi);


    return app.use("/", router);
}

module.exports = initWebRoutes;