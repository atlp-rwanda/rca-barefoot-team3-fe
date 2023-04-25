import React from 'react';

export default function SocialButton({
  icon, text, backgroundColor, textColor, borderColor, handleClick,
}) {
  return (
    <button
      type="button"
      className={`my-2 w-full h-14 bg-${backgroundColor} 
    border rounded border-${borderColor} flex justify-center items-center gap-4`}
      onClick={handleClick}
    >
      {icon}
      <h2 className={`text-${textColor}`}>{text}</h2>
    </button>
  );
}
