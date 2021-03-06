import React, { useState, useEffect } from 'react';
import StarContainer from './StarContainer';
import classes from './StarRating.module.scss';

const StarRating = ({
	color,
	starBorderColor = 'orange',
	noOfStars = 5,
	defaultRating = 0,
	isHoverDisabled = false,
}) => {
	isHoverDisabled = isHoverDisabled === 'false' ? false : true;

	const [rating, setRating] = useState(parseFloat(defaultRating));
	const [hoverRating, setHoverRating] = useState(0);

	// * Explicitly changine the rating on rating change to re-render
	useEffect(() => {
		setRating(defaultRating);
	}, [defaultRating]);

	const onMouseEnter = (index) => {
		setHoverRating(index);
	};

	const onMouseLeave = () => {
		setHoverRating(0);
	};

	const onSaveRating = () => {
		setRating(hoverRating);
	};

	/**
	 *
	 */
	const starMaker = Array(parseInt(noOfStars))
		.fill(0)
		.map((val, ind) => ind + 1)
		.map((val) => {
			return (
				<StarContainer
					index={val}
					starColor={color}
					rating={rating} // we are passing both rating and star rating
					key={val}
					isHoverDisabled={isHoverDisabled}
					hoverRating={hoverRating}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onSaveRating={onSaveRating}
					starBorderColor={starBorderColor}
				/>
			);
		});

	return <div className={classes['star-rating']}>{starMaker}</div>;
};

export default StarRating;
