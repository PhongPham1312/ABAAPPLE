import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

// create user
const createUser = (data) => {
    return axios.post('api/create-user', data);
}

// get all users
const getAllUsers = (keyword) => {
    return axios.get(`api/get-all-user?keyword=${keyword}`);
}

const getUserById = (id) => {
    return axios.get(`api/get-user?id=${id}`);
}

export { handleLoginApi , createUser, getAllUsers, getUserById };