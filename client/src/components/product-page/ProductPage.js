import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Suggestion from './Suggestions/Suggestions';
import GoBack from './GoBack/GoBack';
import classes from './ProductPage.module.scss';
import ProductContent from './ProductContent/ProductContent';

const ProductPage = (props) => {
	const [data, setData] = useState({});
	let { id } = useParams();

	useEffect(() => {
		if (id) {
			// This results in a object of data
			const fetchProductDetail = async (id) => {
				const res1 = await fetch(`https://fakestoreapi.com/products/${id}`);
				const data1 = await res1.json();

				// console.log(res);
				return data1;
			};

			// This results in a array
			const fetchRandomImages = async (data) => {
				const randPage = await Math.floor(Math.random() * 100);
				const res2 = await fetch(
					`https://picsum.photos/v2/list?page=${randPage}&limit=5`
				);
				const data2 = await res2.json();

				return { ...data, altImage: data2 };
			};
			fetchProductDetail(id)
				.then((res) => fetchRandomImages(res))
				.then((res) => setData(res));
		}
	}, [id]);

	if (data && data.altImage) {
		console.log(data);
		return (
			<div className={classes['main-container']}>
				<Suggestion>
					This is suggestions and will contain data later propbably
				</Suggestion>
				<GoBack message="Back to results" />
				<ProductContent data={data} />
			</div>
		);
	}

	return 'Loading...';
};

export default ProductPage;
