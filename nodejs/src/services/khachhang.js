import db from "../models";

const createKhachHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra dữ liệu bắt buộc
      if (!data.name || !data.phone || !data.type) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required fields: name, phone, or type",
        });
      }

      // Tìm khách hàng theo số điện thoại
      let existing = await db.Khachhang.findOne({
        where: { phone: data.phone },
      });

      if (existing) {
        // Nếu đã tồn tại → cập nhật
        await existing.update({
          name: data.name,
          phone1: data.phone1 || null,
          phone2: data.phone2 || null,
          diachi: data.diachi || null,
          cmt: data.cmt || null,
          cms: data.cms || null,
          type: data.type,
          link: data.link || null,
        });

        return resolve({
          errCode: 0,
          errMessage: "Updated existing customer",
          data: existing,
        });
      } else {
        // Nếu chưa tồn tại → tạo mới
        const kh = await db.Khachhang.create({
          name: data.name,
          phone: data.phone,
          phone1: data.phone1 || null,
          phone2: data.phone2 || null,
          diachi: data.diachi || null,
          cmt: data.cmt || null,
          cms: data.cms || null,
          type: data.type,
          link: data.link || null,
        });

        return resolve({
          errCode: 0,
          errMessage: "Created new customer",
          data: kh,
        });
      }
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};

module.exports = {
  createKhachHang,
};
