import Icons from '../Icons';
const ChevronLeft = (props) => {
	return (
		<Icons>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				{...props}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
		</Icons>
	);
};

export default ChevronLeft;
