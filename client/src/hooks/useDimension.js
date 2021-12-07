import { useState, useEffect } from 'react';

const useDimension = () => {
	let width = window.innerWidth;
	let height = window.innerHeight;
	const [dimension, setDimension] = useState([width, height]);

	const resizeMe = (e) => {
		const w = window.innerWidth - 250;
		const h = window.innerHeight;
		setDimension([w, h]);
	};

	/**
	 * Need to add a debounce mechanism for performance reason
	 * that is a set timeout and cleartimeou to clear a even after
	 * a specified time
	 *
	 */
	useEffect(() => {
		window.addEventListener('resize', resizeMe);
		resizeMe();

		return () => window.removeEventListener('resize', resizeMe);
	}, []);

	return dimension;
};

export default useDimension;
