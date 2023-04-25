// import React from 'react';

// export default function Button({ handleSubmit, text }) {
//   return (
//     <div>
//       <button type="submit" className="my-2 w-full h-14 button-primary"
// onChange={handleSubmit}>{text}</button>
//     </div>
//   );
// }

import React from 'react';

export default function Button({
  handleClick, text, className, type,
}) {
  return (
    <button
      type={isDisabled ? 'disabled' : 'button'}
      className={className}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
    >
      {children}
    </button>

  );
}
