import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../store/productActions';
// import axios from 'axios';

import Carousel from './UI/carousel/Carousel';
import Card from './UI/card/Card';
import classes from './DefaultPage.module.scss';
import DummyData from '../data/DummyData';
import ProductCard from './UI/card/ProductCards/SmallCard/ProductCard';
import Spinner from './UI/spinner/Spinner';
// Mocking my data here

const DefaultPage = () => {
	const dispatch = useDispatch();
	const productsData = useSelector((state) => state.product.products);
	// const [productsData, setProductsData] = useState([]);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, []);

	// TODO : Assign the signed in page and else
	// const cardName1 = isSignedIn || "Shop Now & more";
	const cardName1 = 'Shop Now & more';
	const cardName2 = 'Shop Now & more';
	const cardName3 = 'Shop Now & more';
	const cardName4 = 'Shop Now & more';
	const cardName5 = 'Shop Now & more';
	const cardName6 = 'Shop Now & more';
	const cardName7 = 'Shop Now & more';
	const cardName8 = 'Shop Now & more';

	const singleItem = DummyData.singleItem;

	const packOfFour = DummyData.packOfFour;

	const AllProducts = (
		<div className={classes['products-container']} style={{}}>
			<div className={classes.wrapper} style={{}}>
				{productsData ? (
					productsData.map((data) => {
						return (
							<ProductCard
								key={data._id}
								data={data}
								width="225px"
								height="300px"
							/>
						);
					})
				) : (
					<Spinner w="100px" h="100px" />
				)}
			</div>
		</div>
	);

	return (
		<div className={classes['page-container']}>
			{/* {console.log(singleItem)} */}
			{/* // will have a */}
			<Carousel />
			{AllProducts}
			<div className={classes.defaultcards} style={{}}>
				{/**
				 *
				 *
				 * Probably make a loop and iterate it using a map for
				 * producing the jsx element again and again
				 *
				 *
				 *
				 */}
				<Card
					noOfElem={singleItem.length || 1}
					itemsData={singleItem}
					header={cardName1}
				/>
				<Card
					noOfElem={packOfFour.length}
					itemsData={packOfFour}
					header={cardName2}
				/>
				<Card
					noOfElem={singleItem.length}
					itemsData={singleItem}
					header={cardName3}
				/>
				<Card
					noOfElem={packOfFour.length}
					itemsData={packOfFour}
					header={cardName4}
				/>
				<Card
					noOfElem={packOfFour.length}
					itemsData={packOfFour}
					header={cardName6}
				/>
				<Card
					noOfElem={singleItem.length}
					itemsData={singleItem}
					header={cardName5}
				/>
				<Card
					noOfElem={packOfFour.length}
					itemsData={packOfFour}
					header={cardName8}
				/>
				<Card
					noOfElem={singleItem.length}
					itemsData={singleItem}
					header={cardName7}
				/>
				{/* <Card
					noOfElem={singleItem.length}
					itemsData={singleItem}
					header={cardName8}
				/> */}
			</div>
		</div>
	);
};

export default DefaultPage;
