/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { Input__Date } from './date';
import { Input__Select } from './select';

function InputContainer({ children, label }) {
  return (
    <div className="w-full">
      <label className="text-[14px] font-[500]">{label}</label>
      {children}
    </div>
  );
}

function Input_TextField() {
  return <div className="w-full">input</div>;
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
