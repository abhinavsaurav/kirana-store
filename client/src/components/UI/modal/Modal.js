// import { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Modal = (props) => {
	// const [showModal, setShowModal] = useState(props.show || false);

	const Content = (props) => {
		if (!props.show) {
			return null;
		}

		return (
			<div className={classes.modal} onClick={(e) => props.toggleShowModal()}>
				<div
					className={classes['modal-content']}
					onClick={(e) => e.stopPropagation()}
				>
					<button
						className={classes.closeBtn}
						onClick={(e) => props.toggleShowModal()}
					>
						&times;
					</button>
					<span>Hi, I am a modal</span>
					{props.children}
				</div>
			</div>
		);
	};

	return ReactDOM.createPortal(
		<Content {...props} />,
		document.querySelector('#modal')
	);
};

export default Modal;
