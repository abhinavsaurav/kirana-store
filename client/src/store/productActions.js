import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
	'fetchAllProducts',
	async () => {
		try {
			const response = await axios.get('/products');

			return response.data;
		} catch (e) {}
	}
);

export const fetchProduct = createAsyncThunk('fetchProduct', async (id) => {
	const fetchProductDetail = async (id) => {
		const response = await axios.get(`/products/${id}`);
		return response.data;
	};

	// This results in a array
	const fetchRandomImages = async (data) => {
		const randPage = await Math.floor(Math.random() * 100);
		const res2 = await axios.get(
			`https://picsum.photos/v2/list?page=${randPage}&limit=4`
		);
		const data2 = res2.data;
		// console.log(data);
		// console.log(data2);
		const updatedDataObj = { ...data, altImage: data2 };
		// adding the default images for
		updatedDataObj.altImage[4] = { download_url: data.image };
		return updatedDataObj;
	};
	return fetchProductDetail(id).then((res) => fetchRandomImages(res));
	// .then((res) => setData(res));
});
