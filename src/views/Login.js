import React from 'react';
import '../../scss/login.scss';
import Button from '../../src/components/buttons/button';

export default function Login() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div>
      <h1 className="text-4xl">Login page</h1>
      <Button onClick={handleClick} className="bg-green-500">
        Login 
      </Button>
    </div>
  );
}
