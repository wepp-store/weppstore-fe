import React from 'react';

const LogoIcon = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-label="Logo"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="18.1875"
        y="13.5938"
        width="11.625"
        height="11.625"
        rx="5.8125"
        stroke="currentColor"
        strokeWidth="3.375"
      />
      <path
        d="M9.75 18.5366C9.75 6.93231 19.3125 6 24.0938 6C28.875 6 38.4375 6.93231 38.4375 18.5366C38.4375 30.1408 28.875 38.9515 24.0938 41.9062C19.3125 38.9515 9.75 30.1408 9.75 18.5366Z"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
};

export default LogoIcon;
