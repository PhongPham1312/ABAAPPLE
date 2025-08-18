import express from "express";
import userController from '../controllers/userController';
import thuchu from '../controllers/thuchi'
import khachhang from '../controllers/khachhang'
import datmoi from '../controllers/datmoi'
import position from '../controllers/position'
import lichlam from '../controllers/lichlam'


let router = express.Router();

let initWebRoutes = (app) => {

    // API for user
    router.post('/api/login', userController.Login);
    router.post('/api/create-user', userController.createuser);
    router.get('/api/get-all-user', userController.getAll);
    router.get('/api/get-user', userController.getUserById);

    // thu chi
    router.post('/api/create-thuchi', thuchu.createthuchi);
    router.get('/api/get-thuchi-nam-thang', thuchu.getnamthang);
    router.get('/api/get-thuchi', thuchu.handleGetThuChi);
    router.delete('/api/delete-thuchi', thuchu.deleteThuchi);
    router.put('/api/update-thuchi', thuchu.updateThuchi);


    // Khách hàng
    router.post('/api/create-khachhang', khachhang.createKhachHang);
    router.get('/api/get-all-khachhang', khachhang.getAll);
    router.get('/api/search-khachhang', khachhang.searchUsers);
    router.delete('/api/delete-khachhang', khachhang.deleteKhachHang);

    // dat moi
    router.post('/api/create-datmoi', datmoi.createDatmoi);
    router.get('/api/get-all-datmoi', datmoi.getAllDatmoi);
    router.delete('/api/delete-datmoi', datmoi.deleteDatmoi);

    // position
    router.post('/api/create-position', position.createPosition);
    router.get('/api/get-all-positions', position.getAllPositions);

    // lịch làm
    router.post('/api/create-lichlam', lichlam.createLichlam);
    router.get("/api/get-lichlam-nextweek", lichlam.getLichlamNextWeek);


    return app.use("/", router);
}

module.exports = initWebRoutes;