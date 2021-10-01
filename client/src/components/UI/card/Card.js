import CardItems from "./CardItems";
import classes from "./Card.module.scss";

/**
 *
 * @param noOfElem -> total no of elements that should be in the card
 * @param  items -> array map of data abt the item in the element list (object of img and name of the item)
 * @returns wrapped elements inside the content
 */
const Card = ({ noOfElem, itemsData }) => {
	// console.log(itemsData);
	return (
		<div className={classes["card-main"]}>
			{/* cardItems should produce 1 -2 or 3 items inside based on the number supplied*/}
			<div></div>
			<CardItems nelem={noOfElem} elemData={itemsData} />
		</div>
	);
};

export default Card;
