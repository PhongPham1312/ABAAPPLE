import axios from '../axios'

// create a new "dắt mối" entry
const createDatmoi = (data) => {
  return axios.post("api/create-datmoi", data);
}

// get all "dắt mối" entries with optional search
const getAllDatmoi = (keyword) => { 
  return axios.get(`/api/get-all-datmoi?keyword=${keyword}`);
}

// delete a "dắt mối" entry
const deleteDatmoi = (id) => {  
  return axios.delete("api/delete-datmoi", { data: { id } });
}


export {createDatmoi, getAllDatmoi , deleteDatmoi};
