import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export const BrowserShare = (props?: Props) => (
  <svg
    version="1.1"
    viewBox="0 0 2048 2048"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      transform="translate(600,655)"
      d="m0 0h301l1 2v79l-1 1-284 1-17 2-10 5-6 5-6 10-3 11v751l3 12 7 10 8 6 8 3 12 2h776l54-1 12-4 9-7 6-10 3-14v-744l-2-12-5-10-5-6-14-7-4-1-18-1-278-1-1-1v-81h301l18 3 16 5 16 8 12 8 12 10v2l3 1 9 11 9 14 8 17 4 14 2 12 1 15v744l-2 21-6 21-9 19-10 14-12 13-10 8-11 7-14 7-18 6-17 3-13 1h-824l-20-2-19-5-16-7-12-7-16-13-11-12-10-15-8-16-5-17-3-18-1-42v-658l1-61 3-18 5-16 4-9 7-13 8-11 3-4h2l2-4 13-12 16-10 15-7 18-5z"
    />
    <path
      transform="translate(1023,229)"
      d="m0 0 5 3 269 269 1 4-53 53-2 3-4-1-172-172-1 3v753l-2 3h-81l-1-2v-758l-174 174h-3l-7-8-48-48 1-5 10-9 162-162 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 8-7z"
    />
  </svg>
);
