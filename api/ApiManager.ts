import axios from 'axios'
import API from '../constants/ApiUrl';
const ApiManager = axios.create({
    baseURL: API,
    responseType: 'json',
    withCredentials: true,
});
export default ApiManager