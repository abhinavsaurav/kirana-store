// Also known as slideshow
import { useState, useCallback, useRef } from "react";

import { Link } from "react-router-dom";
import classes from "./Carousel.module.scss";
import pic4 from "../../assets/pictures/carousel/pic4.png";
import pic2 from "../../assets/pictures/carousel/pic2.png";
import pic3 from "../../assets/pictures/carousel/pic3.png";
import pic1 from "../../assets/pictures/carousel/pic1.png";
import { useEffect } from "react";

// default data
let data = [pic1, pic2, pic3, pic4];

const Carousel = (props) => {
	const delay = 5000;
	const [current, setCurrent] = useState(0);
	const timer = useRef(null);
	const [addClass, setAddClass] = useState(true);

	useEffect(() => {
		if (props.data) {
			data = props.data;
		}
	}, [props.data]);

	const carouselLogic = useCallback(
		(operator) => {
			if (operator) {
				// clearTimeout(timer.current);
				// timer.current = setTimeout(carouselLogic, 8000);
			}
			// console.log(current);
			setAddClass(false);
			if (operator === "-") {
				// setAddClass(false);
				if (current === 0) {
					setCurrent(+data.length - 1);
				} else {
					setCurrent(current - 1);
				}
			} else if (operator === "+") {
				// setAddClass(true);
				if (current === data.length - 1) {
					setCurrent(0);
				} else {
					setCurrent(current + 1);
				}
			} else {
				if (current === data.length - 1) {
					setCurrent(0);
				} else {
					setCurrent(current + 1);
				}
			}
			setAddClass(true);
		},
		[current]
	);

	useEffect(() => {
		timer.current = setTimeout(carouselLogic, delay);

		return () => clearTimeout(timer.current);
	}, [carouselLogic]);

	const backHandler = (e) => {
		// console.log("Im clicked");
		clearTimeout(timer.current);
		carouselLogic("-");
	};

	const forwardHandler = (e) => {
		clearTimeout(timer.current);
		carouselLogic("+");
	};

	return (
		<div className={classes.carousel}>
			{props.children}
			<Link to="/login">
				{/* {data.map((image, ind) => {
					return (
						<img
							key={ind}
							src={image}
							alt={`Carousel pic${ind}`}
							className={current === ind ? "active" : "notActive"}
						/>
					);
				})} */}

				{addClass && (
					<>
						<img
							// data[current] is dummy data
							className={props.animation ? "" : classes.img1}
							// src={`${props.data ? props.data[current] : data[current]}`}
							src={data[current]}
							alt="carousel pic"
						/>
						{props.animation && (
							<img
								className={classes.img2}
								src={data[current === +data.length - 1 ? 0 : +current + 1]}
								alt="carousel pic 2"
							/>
						)}
					</>
				)}
			</Link>
			<div onClick={backHandler} className={classes.back}>
				&lt;
			</div>
			<div onClick={forwardHandler} className={classes.forward}>
				&gt;
			</div>
		</div>
	);
};

export default Carousel;
