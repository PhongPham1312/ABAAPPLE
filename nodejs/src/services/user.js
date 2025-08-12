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
            // kiểm tra email đã tồn tại chưa
            let isExist = await checkUserEmail(data.email);
            // kiểm tra phone đã tồn tại chưa
            let isExistPhone = await checkUserPhone(data.phone);
            // tạo người dùng mới trong cơ sở dữ liệu
            if (isExist || isExistPhone) { // nếu email hoặc phone đã tồn tại
                // trả về lỗi nếu email hoặc phone đã tồn tại
                resolve({
                    errCode: 1,
                    errMessage: `Your email is already in use, please try another email or phone`
                })
                return;
            }
            // nếu email và phone chưa tồn tại, tạo người dùng mới
            // kiểm tra có đủ email, password, name, phone không
            if (!data.email || !data.password || !data.name || !data.phone ) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                })
                return;
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password); // mã hóa mật khẩu người dùng
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                name: data.name,
                phone: data.phone,
                position: data.position || 'null',
                money: data.money || 'null',
                type: 0 // mặc định là 'user' nếu không có loại người dùng
            })
            resolve('Create a new user succeed!')
        } catch (e) {
            reject(e);
        }
    })
}

let Login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            let isExistPhone = await checkUserPhone(email);

            if (isExist || isExistPhone) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'name', 'phone', 'position', 'type'],
                    where: {
                        [Op.or]: [
                            { email: email },
                            { phone: email }
                        ]
                    },
                    raw: true
                });

                if (!user) {
                    userData.errCode = 1;
                    userData.errMessage = "Email hoặc số điện thoại không tồn tại";
                    return resolve(userData);
                }

                // 🚫 Chặn nếu type = 1
                if (user.type === 1) {
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





module.exports = {
    Login: Login,
    create : create
}