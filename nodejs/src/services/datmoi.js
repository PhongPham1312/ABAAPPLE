import db from "../models";
import { Op, fn, col, where } from "sequelize";

const createDatmoi = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra dữ liệu bắt buộc
      if (!data.name || !data.phone) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required fields"
        });
      }

      const newRecord = await db.Datmoi.create({
        name: data.name,
        phone: data.phone,
        tentk: data.tentk || null,
        tennh: data.tennh || null,
        sotk: data.sotk || null,
        link: data.link || null
      });

      resolve({
        errCode: 0,
        errMessage: "Created successfully",
        data: newRecord
      });
    } catch (error) {
      reject(error);
    }
  });
};

// get all dat moi with search functionality
const getAllDatmoi = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let whereCondition = {};

      if (keyword && keyword.trim() !== "") {
        const keywords = keyword.trim().split(/\s+/);

        const andConditions = keywords.map(word => {
          // Nếu là số
          if (/^\d+$/.test(word)) {
            return {
              [Op.or]: [
                where(
                  fn("REPLACE", fn("REPLACE", fn("REPLACE", col("phone"), " ", ""), ".", ""), "-", ""),
                  { [Op.like]: `%${word}%` }
                ),
                where(
                  fn("REPLACE", fn("REPLACE", fn("REPLACE", col("sotk"), " ", ""), ".", ""), "-", ""),
                  { [Op.like]: `%${word}%` }
                )
              ]
            };
          }
          // Nếu là chữ
          return {
            [Op.or]: [
              { name: { [Op.like]: `%${word}%` } },
              { tentk: { [Op.like]: `%${word}%` } },
              { tennh: { [Op.like]: `%${word}%` } },
              { link: { [Op.like]: `%${word}%` } }
            ]
          };
        });

        whereCondition = { [Op.and]: andConditions };
      }

      const data = await db.Datmoi.findAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]]
      });

      resolve({
        errCode: 0,
        errMessage: "OK",
        data
      });

    } catch (error) {
      reject(error);
    }
  });
};

// delete dat moi
const deleteDatmoi = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter: id"
        });
      }

      const datmoi = await db.Datmoi.findOne({
        where: { id: id }
      });

      if (!datmoi) {
        return resolve({
          errCode: 2,
          errMessage: "Datmoi not found"
        });
      }

      await db.Datmoi.destroy({
        where: { id: id }
      });

      resolve({
        errCode: 0,
        errMessage: "Delete successfully"
      });

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createDatmoi, getAllDatmoi, deleteDatmoi
};
