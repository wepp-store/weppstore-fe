import React from 'react';
import styles from './styles.module.scss';
import { bindClassNames } from '@/utils/styles';

type Props = React.HTMLAttributes<HTMLDivElement>;

const cx = bindClassNames(styles);

const Section: React.FC<Props> = ({ children, className = '', ...other }) => {
  return (
    <section className={`${cx('section')} ${className}`} {...other}>
      {children}
    </section>
  );
};

export default Section;
