import CardItems from "./CardItems";
import classes from "./Card.module.scss";

/**
 *
 * @param noOfElem -> total no of elements that should be in the card
 * @param  items -> array map of data abt the item in the element list (object of img and name of the item)
 * @returns wrapped elements inside the content
 */
const Card = ({ header, noOfElem, itemsData }) => {
	// console.log(itemsData);
	return (
		<div className={classes["card-body"]}>
			{/* cardItems should produce 1 -2 or 3 items inside based on the number supplied*/}
			<div className={classes.header}>{header}</div>
			<CardItems nelem={noOfElem} elemData={itemsData} />
			<div className={classes.shop}>Shop Now</div>
		</div>
	);
};

export default Card;
