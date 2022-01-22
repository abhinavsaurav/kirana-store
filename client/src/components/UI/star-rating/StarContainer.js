import React from 'react';
import Star from './Star';
import classes from './StarContainer.module.scss';
import StarHalf from './StarHalf';

const StarContainer = ({
	index,
	starColor,
	starBorderColor,
	rating,
	isHoverDisabled,
	hoverRating,
	onMouseEnter,
	onMouseLeave,
	onSaveRating,
}) => {
	/**
	 * @description returns the color memoizing it since it will be used a lot
	 * 				for the products and rating products
	 *
	 */
	const fill = React.useMemo(() => {
		// for hover rating setting
		if (hoverRating >= index) {
			return starColor;
		}
		// for setting rating
		else if (!hoverRating && rating >= index) {
			return starColor;
		}

		return 'none';
	}, [rating, hoverRating, index, starColor]);

	/**
	 *
	 * @param {function} execute
	 * @param {value -> Integer} index
	 * @returns execute a function if present with a index
	 *
	 */
	const fixedStarsCheck = (execute, index) => {
		if (isHoverDisabled) {
			return;
		}
		return execute(index);
	};

	const halfStarCheck = () => {
		const checkIfDecimal = rating - index;
		if (checkIfDecimal > 0 && checkIfDecimal < 1) {
			if (checkIfDecimal >= 0.5) {
				return true;
			}
		}
		return false;
	};

	return (
		<div
			style={{ color: starBorderColor }}
			className={classes['star-wrapper']}
			onMouseEnter={() => fixedStarsCheck(onMouseEnter, index)}
			onMouseLeave={() => fixedStarsCheck(onMouseLeave)}
			onClick={() => fixedStarsCheck(onSaveRating)}
		>
			{halfStarCheck() ? <StarHalf fill={fill} /> : <Star fill={fill} />}
		</div>
	);
};

export default StarContainer;
