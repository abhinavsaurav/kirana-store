import axios from 'axios';
import { API_URL } from '../data/constants';

const kiranaAPI = axios.create({
	baseURL: API_URL,
});

export default kiranaAPI;
