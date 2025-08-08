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

const deleteThuchi = (id) => {
    return axios.delete('/api/delete-thuchi', {
        data: { id }
    });
};

const updateThuchi = (id, data) => {
    return axios.put('/api/update-thuchi', {
        id: id,
        ...data
    });
};

export { createthuchi , getthuchinamthang, getThuchi, updateThuchi , deleteThuchi };
