import React from 'react';

export default function Button({ handleSubmit, text, className = "" }) {
  return (
    <div>
      <button type="submit" className={`my-2 w-full h-14 button-primary ${className}`} onChange={handleSubmit}>{text}</button>
    </div>
  );
}
