import db from '../models/index'; // import mô hình cơ sở dữ liệu

// create thu chi
let createthuchi = (data) => {
    return new Promise( async (resolve, reject) => {

        try{
            // kiểm tra dữ liệu vào
            if(!data.type || !data.content || !data.ngay || !data.money) {
                resolve({
                        errCode: 1,
                        message: 'Thiếu dữ liệu bắt buộc: type, content hoặc ngay!'
                    });
                    return;
            }

            // tạo mới thu chi
            let res = await db.Thuchi.create({
                    type: data.type,
                    content: data.content,
                    money: data.money,
                    ngay: data.ngay,
                    link: data.link || null,
                    dam: data.dam || null
            });

            resolve({
                    errCode: 0,
                    message: 'Tạo mới thành công!',
                    data: res
                });
        }
        catch(e) {
            reject(e)
        }
         
    })
} 

let getYearsAndMonths = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let records = await db.Thuchi.findAll({
                attributes: ['ngay'],
                raw: true
            });

            let result = {};

            records.forEach(item => {
                if (item.ngay && typeof item.ngay === 'string' && item.ngay.includes('.')) {
                    let parts = item.ngay.split('.'); // "6.8.2025" → ["6", "8", "2025"]

                    if (parts.length === 3) {
                        let day = parseInt(parts[0]);
                        let month = parseInt(parts[1]);
                        let year = parseInt(parts[2]);

                        if (!result[year]) {
                            result[year] = new Set();
                        }

                        result[year].add(month);
                    }
                }
            });

            // Convert Set to Array
            for (let year in result) {
                result[year] = Array.from(result[year]).sort((a, b) => a - b);
            }

            resolve({
                errCode: 0,
                data: result
            });
        } catch (e) {
            reject({
                errCode: -1,
                message: 'Lỗi khi lấy dữ liệu!',
                error: e.message
            });
        }
    });
};

import { Op, Sequelize } from 'sequelize';

const getThuChiByTypeAndMonth = (type, month , year) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type || !month) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing type or month!'
                });
            }
            
            let searchPattern = `%.${month}.${year}`;

            let data = await db.Thuchi.findAll({
                where: {
                    type: type.toLowerCase(),
                    ngay: {
                        [Op.like]: searchPattern
                    }
                },
                order: [['ngay', 'DESC']]
            });
            resolve({
                errCode: 0,
                data: data
            });

        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    createthuchi: createthuchi,
    getYearsAndMonths : getYearsAndMonths,
    getThuChiByTypeAndMonth: getThuChiByTypeAndMonth
}