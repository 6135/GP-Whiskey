import axios from "axios";
const API_URL = "http://localhost:8000/api/";
class ServiceAPI {
    getObra(){
        return axios.get(API_URL + "obra")
        .then(response => {
            return response.data;
        });
      }
    }

export default new ServiceAPI();
