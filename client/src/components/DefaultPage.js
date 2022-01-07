import { useEffect, useState } from 'react';
import Carousel from './UI/carousel/Carousel';
import Card from './UI/card/Card';
import classes from './DefaultPage.module.scss';
import DummyData from '../data/DummyData';
import ProductCard from './UI/card/ProductCards/SmallCard/ProductCard';
// Mocking my data here

const DefaultPage = () => {
	const [productsData, setProductsData] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch('/products');
			const data = await response.json();
			await setProductsData(data);
			// await console.log(productsData);
		};
		fetchProducts();
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

	return (
		<div className={classes['page-container']}>
			{/* {console.log(singleItem)} */}
			{/* // will have a */}
			<Carousel />
			<div className={classes['products-container']} style={{}}>
				<div className={classes.wrapper} style={{}}>
					{productsData.map((data) => {
						return (
							<ProductCard
								key={data._id}
								data={data}
								width="225px"
								height="300px"
							/>
						);
					})}
				</div>
			</div>
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
