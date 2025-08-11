import db from "../models";

const createPosition = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.chucvu || !data.type || !data.money) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter"
        });
      }

      await db.Position.create({
        chucvu: data.chucvu,
        money: data.money || 'null',
        type: data.type
      });

      resolve({
        errCode: 0,
        errMessage: "Create Position successfully"
      });

    } catch (error) {
      reject(error);
    }
  });
};

const getAllPositions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const positions = await db.Position.findAll({
        order: [['id', 'DESC']]
      });

      resolve({
        errCode: 0,
        data: positions
      });

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createPosition,
  getAllPositions
};
