import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Section: React.FC<Props> = ({ children, className = '', ...other }) => {
  return (
    <section className={`p-2 ${className}`} {...other}>
      {children}
    </section>
  );
};

export default Section;
