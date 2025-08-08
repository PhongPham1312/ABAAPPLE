import thuchi from '../services/thuchi'

// create
let createthuchi = async (req, res) => {
    try {
        let result = await thuchi.createthuchi(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// lay danh sach nam , tháng
let getnamthang = async (req, res) => {
    try {
        let result = await thuchi.getYearsAndMonths();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// get all thu chi
const handleGetThuChi = async (req, res) => {
    try {
        const { type, month, year } = req.query;
        const data = await thuchi.getThuChiByTypeAndMonth(type, month, year);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in handleGetThuChi:', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Internal Server Error'
        });
    }
};

let deleteThuchi = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required parameter: id'
            });
        }
        const result = await thuchi.deleteThuchi(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in deleteThuchi:', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Internal Server Error'
        });
    }
};

let updateThuchi = async (req, res) => {
    try {
        const result = await thuchi.updateThuchi(req.body.id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in updateThuchi:', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Internal Server Error'
        });
    }
};


module.exports = {
    createthuchi : createthuchi,
    getnamthang: getnamthang,
    handleGetThuChi: handleGetThuChi,
    deleteThuchi: deleteThuchi,
    updateThuchi: updateThuchi
}