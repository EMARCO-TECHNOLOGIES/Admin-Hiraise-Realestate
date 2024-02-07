import { baseUrl } from '@/utils/baseUrl';
import axios from 'axios'


const adminAxios = axios.create({
    baseURL: baseUrl
});

export default adminAxios
