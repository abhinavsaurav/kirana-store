import classes from './Suggestions.module.scss';
import React from 'react';

const Suggestion = (props) => {
	return <div className={classes['suggestions']}>{props.children}</div>;
};

export default Suggestion;
