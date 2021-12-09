import { useState } from 'react';
import AltContent from './LeftCol/AltContent';

import LeftMainContent from './LeftCol/MainContent';
import MiddleMainContent from './MiddleCol/MainContent';
import RightMainContent from './RightCol/MainContent';
import Share from './RightCol/Share';
import classes from './ProductContent.module.scss';

const ProductContent = ({ data }) => {
	// console.log(data);
	data.altImage[5] = { download_url: data.image };
	const [activeData, setActiveData] = useState(data.altImage[5]);

	const altImageRow = data.altImage.map((data) => {
		// console.log(data);
		return (
			<li
				key={data.id}
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
