import React from 'react';

export function Input__Date({ name }) {
  return (
    <div className="w-full">
      <div className="border px-3 py-1 rounded border-2 border-[#F5F5F5]">
        <input type="date" className="focus:outline-none" name={name} />
      </div>
    </div>
  );
}
