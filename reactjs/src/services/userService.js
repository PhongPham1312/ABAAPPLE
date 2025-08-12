import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

// create user
const createUser = (data) => {
    return axios.post('api/create-user', data);
}

// get all users
const getAllUsers = () => {
    return axios.get('api/get-all-user');
}

export { handleLoginApi , createUser, getAllUsers };