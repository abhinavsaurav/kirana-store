import classes from "./CardItem.module.scss";
const CardItem = ({ img, name, className }) => {
	// TODO : DECIDE on the structure of the elements which we are passing in
	// Also if we can pass in any more thing like that
	return (
		<div className={classes[className]}>
			<img src={img} alt={"dummy"} className={classes["img-card"]} />
			<div>{name}</div>
		</div>
	);
};

export default CardItem;
