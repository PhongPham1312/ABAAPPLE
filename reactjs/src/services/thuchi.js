import axios from '../axios'

const createthuchi = (data) => {
    return axios.post('api/create-thuchi', data);
}

const getthuchinamthang = () => {
    return axios.get('api/get-thuchi-nam-thang');
}

const getThuchi = (type, month, year) => {
    return axios.get('/api/get-thuchi', {
        params: {
            type: type,
            month: month,
            year: year
        }
    });
};

export { createthuchi , getthuchinamthang, getThuchi

};