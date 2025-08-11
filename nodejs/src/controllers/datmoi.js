import datmoi from "../services/datmoi";

// Create a new "dắt mối" entry
let createDatmoi = async (req, res) => {
  try {
    let result = await datmoi.createDatmoi(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// get all "dắt mối" entries with optional search
let getAllDatmoi = async (req, res) => {
  try {
    let keyword = req.query.keyword || "";
    let result = await datmoi.getAllDatmoi(keyword);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server"
    });
  }
};

module.exports = {
  createDatmoi, getAllDatmoi
};