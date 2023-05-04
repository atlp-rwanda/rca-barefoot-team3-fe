import React from 'react';
import Select from "react-select"

export function Input__Select({ options = [], name }) {
	return (
		<div className='w-full'>
			<Select options={options} name={name}/>
		</div>
	);
}
