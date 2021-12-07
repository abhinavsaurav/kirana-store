// import { Fragment } from "react";
import CardItem from "./CardItem";
import classes from "./CardItems.module.scss";

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

	return <div className={classes.wrapper}>{renderItems}</div>;
};

export default CardItems;
