import khachhang from "../services/khachhang";


const createKhachHang = async (req, res) => {
  try {
    const data = await khachhang.createKhachHang(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Server error",
    });
  }
};

module.exports = {
  createKhachHang,    
};