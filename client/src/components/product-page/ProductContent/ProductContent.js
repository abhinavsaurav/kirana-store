import { useEffect, useState } from 'react';
import AltContent from './LeftCol/AltContent';

import MainContent from './LeftCol/MainContent';
import classes from './ProductContent.module.scss';

const ProductContent = ({ data }) => {
	// console.log(data);
	const { image } = data;
	const [activeLink, setActiveLink] = useState(image);

	const altImageRow = data.altImage.map((data) => {
		// console.log(data);
		return (
			<li className={classes['alt-img-container']}>
				<img src={data.download_url} alt={`image by ${data.author}`} />
			</li>
		);
	});

	return (
		<div className={classes['container']}>
			<div className={classes['col-left']}>
				<MainContent>
					<img src={activeLink} alt={data.title} />
				</MainContent>
				<AltContent>{altImageRow}</AltContent>
			</div>
			<div className={classes['col-middle']}>top middle container</div>
			<div className={classes['col-right']}>right checkout container</div>
		</div>
	);
};

export default ProductContent;
