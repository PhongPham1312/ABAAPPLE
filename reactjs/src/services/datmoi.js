import axios from "axios";

// create a new "dắt mối" entry
const createDatmoi = (data) => {
  return axios.post("api/create-datmoi", data);
}

// get all "dắt mối" entries with optional search
const getAllDatmoi = (keyword) => { 
    return axios.get("api/get-all-datmoi", {
        params: { keyword }
    });
    }

    
export {
  createDatmoi, getAllDatmoi
};
