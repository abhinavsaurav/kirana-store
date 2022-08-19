import axios from 'axios';
import { API_URL } from '../data/constants';

const kiranaAPI = axios.create({
	baseURL: API_URL,
});

export const kiranaAPIAdmin = axios.create({
	baseURL: `${API_URL}admin`,
});

export default kiranaAPI;
