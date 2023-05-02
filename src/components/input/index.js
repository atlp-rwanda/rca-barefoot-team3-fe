import React from "react"

import { Input__Date } from "./date";
import { Input__Select } from "./select";

function InputContainer({ children }){
  return (
    <div className="w-full">
      {children}
    </div>
  )
}

function Input_TextField() {
	return <div className='w-full'>input</div>;
}

export const Input = {
	Default: (props) => (
		<InputContainer {...props}>
			<Input_TextField {...props} />
		</InputContainer>
	),
	Date: (props) => (
		<InputContainer {...props}>
			<Input__Date {...props} />
		</InputContainer>
	),
	Select: (props) => (
		<InputContainer {...props}>
			<Input__Select {...props} />
		</InputContainer>
	),
};