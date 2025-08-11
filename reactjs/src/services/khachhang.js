import axios from '../axios'

const createKhachHang = (data) => {
    return axios.post('api/create-khachang', data);
}

const getAll = () => {
    return axios.get('api/get-all-khachhang');
}

const searchUsers = (keyword) => {
    return axios.get(`api/search-khachhang?keyword=${keyword}`);
}

// delete customer
const deleteKhachHang = (id) => {
    return axios.delete('api/delete-khachhang', { data: { id } });
}
    


export { createKhachHang , getAll, searchUsers, deleteKhachHang };
