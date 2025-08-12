import axios from '../axios'

const getAll = () => {
    return axios.get('api/get-all-positions');
}


    


export { getAll };
