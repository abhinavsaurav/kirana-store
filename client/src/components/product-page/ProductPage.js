import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/productActions';
import Suggestion from './Suggestions/Suggestions';
import GoBack from './GoBack/GoBack';
import classes from './ProductPage.module.scss';
import ProductContent from './ProductContent/ProductContent';
import Spinner from '../UI/spinner/Spinner';

const ProductPage = (props) => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.product.activeProduct);
	let { id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(fetchProduct(id));
		}
	}, [id]);

	if (data && data.altImage) {
		return (
			<div className={classes['main-container']}>
				<div className={classes['page-container']}>
					<Suggestion>
						This is suggestions and will contain data later propbably
					</Suggestion>

					<GoBack message="Back to results" />

					{/* 
						// ! Setting this explicitly here will set the default image(0-4) but can be
						// ! moved up the prop chain or environment variable if required
						// ! By default the default value is 4 which will be taken if not provided also
					*/}
					<ProductContent data={data} defaultImage="4" />
				</div>
			</div>
		);
	}

	return <Spinner w="100px" h="100px" p="50px" />;
};

export default ProductPage;
