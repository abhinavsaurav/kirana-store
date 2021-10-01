import { Fragment } from "react";
import CardItem from "./CardItem";

const CardItems = ({ nelem, elemData }) => {
	// Currently only configuring for one or four elements but can be configured easily for
	// others too
	// TODO: Mindfull of the changes here to @Category change it
	// console.log(elemData);
	const renderItems = elemData.map(function ({ image, category }, index) {
		return (
			<CardItem
				key={index}
				img={image}
				name={category}
				className={nelem === 1 ? "one" : "four"}
			/>
		);
	});

	return <Fragment>{renderItems}</Fragment>;
};

export default CardItems;
