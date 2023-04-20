import React from 'react';

export default function SocialButton({ handleSubmit, icon, text }) {
  return (
    <div className="my-2 w-full h-14 bg-white border rounded border-primary flex justify-center items-center gap-4" onClick={handleSubmit}>
      {icon}
      <h2 className="text-primary">{text}</h2>
    </div>
  );
}
