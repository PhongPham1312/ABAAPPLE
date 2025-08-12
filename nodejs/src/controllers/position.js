import position from "../services/position";

let createPosition = async (req, res) => {
  try {
    let result = await position.createPosition(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server"
    });
  }
};

let getAllPositions = async (req, res) => {
  try {
    let result = await position.getAllPositions();
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
  createPosition,
  getAllPositions
};
