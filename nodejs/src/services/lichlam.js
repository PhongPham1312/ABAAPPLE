import db from "../models/index";
import { Op } from "sequelize";

let createLichlam = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.user || !data.ngay || !data.ca) {
                return resolve({
                    errCode: 1,
                    errMessage: "Thiếu tham số!"
                });
            }

            let lich = await db.Lichlam.create({
                user: data.user,
                ngay: data.ngay,
                ca: data.ca
            });

            resolve({
                errCode: 0,
                errMessage: "Tạo lịch thành công!",
                data: lich
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getLichlamNextWeek = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let today = new Date();
      let dayOfWeek = today.getDay(); // CN=0, T2=1...
      let nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + (8 - dayOfWeek)); // thứ 2 tuần tới

      // Chủ nhật tuần tới
      let nextSunday = new Date(nextMonday);
      nextSunday.setDate(nextMonday.getDate() + 6);

      // Convert -> yyyy-mm-dd để query
      let startDate = nextMonday.toISOString().split("T")[0];
      let endDate = nextSunday.toISOString().split("T")[0];

      let data = await db.Lichlam.findAll({
        where: {
          ngay: {
            [Op.between]: [startDate, endDate]
          }
        }
      });

      resolve({
        errCode: 0,
        data: data,
        range: { startDate, endDate }
      });
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
    createLichlam, getLichlamNextWeek
};
