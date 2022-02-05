import { useState } from 'react';
import InputField from '../input/InputField';
import classes from './ProfilePic.module.scss';

/**
 * 	This component depends upon the InputField component
 */
const ProfilePic = (props) => {
	const [droppedImage, setDroppedImage] = useState(null);

	const handleOnDragOver = (e) => {
		e.preventDefault();
		console.log('Im firing');
	};

	const handleOnDrop = (e) => {
		console.log('Files dropped');

		e.preventDefault();
		let imageURL;
		if (e.dataTransfer.items) {
			imageURL = URL.createObjectURL(e.dataTransfer.items[0].getAsFile());
			// setDroppedImage(e.dataTransfer.items[0].getAsFile());
		} else {
			imageURL = URL.createObjectURL(e.dataTransfer.items[0]);
		}
		setDroppedImage(imageURL);
		// e.target.draggable = false;
		console.log(e.dataTransfer.items[0].getAsFile());
	};

	const handleOnChange = async (e) => {
		// console.log(e.target.);
		if (e.target.files && e.target.files.length) {
			let val = await URL.createObjectURL(e.target.files[0]);
			await setDroppedImage(val);
		}
	};

	const handleOnDragStart = async (e) => {
		e.preventDefault();
		console.log('its working');
	};

	const handleOnDragEnd = async (e) => {
		e.preventDefault();
		console.log('testing this out');
	};

	const labelJSX = (src) => {
		return (
			<div>
				{src ? (
					<img src={src} />
				) : (
					<span>Drop a picture or click to upload</span>
				)}
			</div>
		);
	};

	return (
		<div className={classes['profile-pic-wrapper']}>
			<div
				className={classes['profile-pic']}
				onDragOver={handleOnDragOver}
				onDrop={handleOnDrop}
				onChange={handleOnChange}
				onDragStart={handleOnDragStart}
				onDragEnd={handleOnDragEnd}
			>
				<InputField
					variant="1"
					id="file-upload"
					label={labelJSX(droppedImage)}
					type="file"
					accept="image/*"
				/>
			</div>
		</div>
	);
};

export default ProfilePic;
