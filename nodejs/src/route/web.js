import express from "express";
import userController from '../controllers/userController';
import thuchu from '../controllers/thuchi'
import khachhang from '../controllers/khachhang'


let router = express.Router();

let initWebRoutes = (app) => {

    // API for user
    router.post('/api/login', userController.Login);
    router.post('/api/create-user', userController.createuser);

    // thu chi
    router.post('/api/create-thuchi', thuchu.createthuchi);
    router.get('/api/get-thuchi-nam-thang', thuchu.getnamthang);
    router.get('/api/get-thuchi', thuchu.handleGetThuChi);
    router.delete('/api/delete-thuchi', thuchu.deleteThuchi);
    router.put('/api/update-thuchi', thuchu.updateThuchi);


    // Khách hàng
    router.post('/api/create-khachhang', khachhang.createKhachHang);
    router.get('/api/get-all-khachhang', khachhang.getAll);


    return app.use("/", router);
}

module.exports = initWebRoutes;