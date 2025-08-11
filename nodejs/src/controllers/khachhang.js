import khachhang from "../services/khachhang";

// create or update customer
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

//get all customers
let getAll = async (req, res) => {
  try {
    let result = await khachhang.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// search customers
let searchUsers = async (req, res) => {
  try {
    let keyword = req.query.keyword || "";
    let result = await khachhang.searchUsers(keyword); // service trả Promise

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// delete customer
let deleteKhachHang = async (req, res) => {
  try {
    let id = req.body.id; // hoặc req.params.id nếu dùng URL param
    let result = await khachhang.deleteKhachHang(id);
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
  createKhachHang, getAll, searchUsers, deleteKhachHang
};