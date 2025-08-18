import axios from '../axios'

const createLichlam = (data) => {
    return axios.post('/api/create-lichlam', data);
}

const getLichlamNextWeek = () => {
    return axios.get('/api/get-lichlam-nextweek');
}


export {
    createLichlam, getLichlamNextWeek
}