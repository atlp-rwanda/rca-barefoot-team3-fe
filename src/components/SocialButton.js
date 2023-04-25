// import React from 'react';

// export default function SocialButton({ icon, text }) {
//   return (
//     <div className="my-2 w-full h-14 bg-white border rounded border-primary flex justify-center items-center gap-4">
//       {icon}
//       <h2 className="text-primary">{text}</h2>
//     </div>
//   );
// }

import React from 'react';

export default function SocialButton({
  icon, text, backgroundColor, textColor, borderColor, handleClick,
}) {
  return (
    <div className={`my-2 w-full h-14 bg-${backgroundColor} border rounded border-${borderColor} flex justify-center items-center gap-4`} onClick={handleClick}>
      {icon}
      <h2 className={`text-${textColor}`}>{text}</h2>
    </div>
  );
}
