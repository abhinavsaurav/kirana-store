import { useState } from 'react';
import AltContent from './LeftCol/AltContent';

import LeftMainContent from './LeftCol/MainContent';
import MiddleMainContent from './MiddleCol/MainContent';
import RightMainContent from './RightCol/MainContent';
import Share from './RightCol/Share';
import classes from './ProductContent.module.scss';
import { useEffect } from 'react';

const ProductContent = ({ data, defaultImage = 4 }) => {
	const [activeData, setActiveData] = useState(
		data.altImage[parseInt(defaultImage)]
	);

	// Setting the data to the default image whenever the data changes
	useEffect(() => {
		setActiveData(data.altImage[parseInt(defaultImage)]);
	}, [data]);

	const altImageRow = data.altImage.map((data, ind) => {
		return (
			<li
				key={ind}
				onClick={() => setActiveData(data)}
				onMouseEnter={() => setActiveData(data)}
				className={classes['alt-img-container']}
			>
				<img src={data.download_url} alt={`by ${data.author}`} />
			</li>
		);
	});

	const changeActiveData = () => {
		return setActiveData;
	};

	return (
		<div className={classes['container']}>
			<div className={classes['col-left']}>
				<LeftMainContent>
					<img src={activeData.download_url} alt={activeData.title} />
				</LeftMainContent>
				<AltContent>{altImageRow}</AltContent>
			</div>
			<div className={classes['col-middle']}>
				<MiddleMainContent
					data={data}
					setActiveLeftColData={changeActiveData}
				/>
			</div>
			<div className={classes['col-right']}>
				<Share data={data} />
				<RightMainContent data={data} />
			</div>
		</div>
	);
};

export default ProductContent;
