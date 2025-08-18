import lichlamService from "../services/lichlam";

let createLichlam = async (req, res) => {
    try {
        let data = await lichlamService.createLichlam(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "Lỗi server..."
        });
    }
};

let getLichlamNextWeek = async (req, res) => {
  try {
    let data = await lichlamService.getLichlamNextWeek();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Lỗi server..."
    });
  }
};

module.exports = {
    createLichlam, getLichlamNextWeek
};
