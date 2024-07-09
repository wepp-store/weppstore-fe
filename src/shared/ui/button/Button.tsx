import React from 'react';
import styles from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  className?: string;
}

const Button = ({
  type = 'button',
  loading = false,
  children,
  className = '',
  ...other
}: Props) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${styles.button} ${className}`}
      {...other}
      data-loading={loading}
    >
      {loading ? '로딩중...' : children}
    </button>
  );
};

export default Button;
