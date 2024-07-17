import { cn } from '@nextui-org/theme';
import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Section: React.FC<Props> = ({ children, className = '', ...other }) => {
  return (
    <section
      className={cn(
        'py-4',
        'px-2',
        'sm:px-4',
        'md:px-6',
        'lg:px-8',
        'xl:px-10',
        '2xl:px-12',
        className
      )}
      {...other}
    >
      {children}
    </section>
  );
};

export default Section;
