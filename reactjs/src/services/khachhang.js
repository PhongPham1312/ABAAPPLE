import axios from '../axios'

const createKhachHang = (data) => {
    return axios.post('api/create-khachang', data);
}

const getAll = () => {
    return axios.get('api/get-all-khachhang');
}

export { createKhachHang , getAll,  };
