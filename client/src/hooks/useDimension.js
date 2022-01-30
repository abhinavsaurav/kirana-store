import { useState, useEffect } from 'react';

const useDimension = () => {
	let width = window.innerWidth;
	let height = window.innerHeight;
	const [dimension, setDimension] = useState({ width, height });

	const resizeMe = (e) => {
		const w = window.innerWidth - 250;
		const h = window.innerHeight;
		setDimension({ width: w, height: h });
	};

	/**
	 *
	 * UPDATE:ADDED DEBOUNCE BELOW
	 * Need to add a debounce mechanism for performance reason
	 * that is a set timeout and cleartimeou to clear a even after
	 * a specified time
	 *
	 */

	const debounce = (func, delay = 500) => {
		let timeoutId;

		return function () {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, arguments);
			}, delay);
		};
	};

	useEffect(() => {
		window.addEventListener('resize', debounce(resizeMe, 500));

		return () => window.removeEventListener('resize', resizeMe);
	}, [window.innerWidth, window.innerHeight]);

	return dimension;
};

export default useDimension;
