import styles from './styles.module.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className = '', ...other }: Props) => {
  return (
    <div className={styles.card + className} {...other}>
      {children}
    </div>
  );
};

export default Card;
