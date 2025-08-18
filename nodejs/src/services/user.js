import db from '../models/index'; // import mô hình cơ sở dữ liệu
import bcrypt from 'bcryptjs'; // import thư viện bcryptjs để mã hóa mật khẩu
import { Op } from 'sequelize'; // import toán tử Op từ sequelize để sử dụng trong truy vấn

// mã hóa mật khẩu người dùng
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let salt = bcrypt.genSaltSync(10);  // tạo ra một chuỗi ngẫu nhiên để mã hóa
            let hashPassword = bcrypt.hashSync(password, salt); // mã hóa mật khẩu với chuỗi ngẫu nhiên
            resolve(hashPassword);// trả về mật khẩu đã mã hóa
        } catch (e) {
            reject(e);
        }
    })
}

// kiểm tra phone người dùng đã tồn tại chưa
let checkUserPhone = (userPhone) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // tìm kiếm người dùng trong cơ sở dữ liệu theo số điện thoại
            let user = await db.User.findOne({
                where: { phone: userPhone }
            })
            if (user) {
                resolve(true) // nếu tìm thấy người dùng, trả về true
            } else {
                resolve(false) // nếu không tìm thấy người dùng, trả về false
            }

        } catch (e) {
            reject(e)
        }
    })
}

// tạo người dùng mới
// data: {email, password, name, phone, position, role}
let create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // kiểm tra email và phone
            let existingUser = await db.User.findOne({
                where: {
                    [db.Sequelize.Op.or]: [
                        { email: data.email },
                        { phone: data.phone }
                    ]
                }
            });

            if (!data.name || !data.phone || !data.type) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }

            if (existingUser) {
                // Cập nhật
                existingUser.name = data.name;
                existingUser.phone = data.phone;
                existingUser.position = data.position || existingUser.position;
                existingUser.imageBack = data.imageBack || existingUser.imageBack;
                existingUser.imageFont = data.imageFont || existingUser.imageFont;
                existingUser.money = data.money || existingUser.money;
                existingUser.type = data.type || existingUser.type;

                if (data.password) {
                    existingUser.password = await hashUserPassword(data.password);
                }

                await existingUser.save();

                return resolve({
                    errCode: 0,
                    message: 'Cập nhật thông tin thành công'
                });
            } else {
                // Tạo mới
                if (!data.password) {
                    return resolve({
                        errCode: 2,
                        errMessage: 'Missing password for new user!'
                    });
                }

                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                await db.User.create({
                    email: data.email || null,
                    password: hashPasswordFromBcrypt,
                    name: data.name,
                    phone: data.phone,
                    position: data.position || null,
                    imageBack: data.imageBack || null,
                    imageFont: data.imageFont || null,
                    money: data.money || null,
                    type: data.type
                });

                return resolve({
                    errCode: 0,
                    message: 'Thêm nhân sự mới thành công'
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};


let Login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            let isExistPhone = await checkUserPhone(email);

            if (isExist || isExistPhone) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password',  'name', 'phone', 'position', 'type'],
                    where: {
                        [Op.or]: [
                            { email: email },
                            { phone: email }
                        ]
                    },
                    include: [
                        {
                            model: db.Position,
                            as: 'positionData',
                            attributes: ['chucvu', 'money']
                        }
                    ],
                    raw: true
                });

                if (!user) {
                    userData.errCode = 1;
                    userData.errMessage = "Email hoặc số điện thoại không tồn tại";
                    return resolve(userData);
                }

                // 🚫 Chặn nếu type = 1
                if (user.type === 2) {
                    userData.errCode = 4;
                    userData.errMessage = "Tài khoản của bạn đã bị khóa";
                    return resolve(userData);
                }

                let check = await bcrypt.compare(password, user.password);

                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'OK';
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

// get all
let getall = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let condition = {};

            if (keyword && keyword.trim() !== '') {
                condition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${keyword}%` } },
                        { phone: { [Op.like]: `%${keyword}%` } }
                    ]
                };
            }

            let users = await db.User.findAll({
                attributes: ['id', 'name', 'phone', 'position', 'type'],
                include: [
                    {
                        model: db.Position,
                        as: 'positionData',
                        attributes: ['chucvu', 'money']
                    }
                ],
                where: condition,
                order: [["createdAt", "DESC"]]
            });

            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: users
            });
        } catch (error) {
            reject({
                errCode: 1,
                errMessage: 'Server error',
                data: []
            });
        }
    });
};

let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter',
                    data: null
                });
            }

            let user = await db.User.findOne({
                where: { id: id },
                attributes: {
                        exclude: ['password']
                        },
                include: [
                    {
                        model: db.Position,
                        as: 'positionData',
                        attributes: ['chucvu', 'money']
                    }
                ],
                raw: true,
                nest: true
            });

            if (!user) {
                return resolve({
                    errCode: 1,
                    errMessage: 'User not found',
                    data: null
                });
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: user
            });

        } catch (error) {
            reject({
                errCode: 3,
                errMessage: 'Server error',
                data: null
            });
        }
    });
};

module.exports = {
    Login: Login,
    create : create,
    getall: getall,
    getUserById: getUserById
}