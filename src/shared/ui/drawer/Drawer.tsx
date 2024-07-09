import React from 'react';
import styles from './styles.module.scss';
import { Portal } from '@/shared/components/portal';
import { motion } from 'framer-motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Drawer = ({ direction = 'right', children, open, onClose }: Props) => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === bgRef.current) {
      drawerRef.current!.style.animation = `${styles[`${direction}Out`]} 0.2s ease forwards`;
      drawerRef.current!.onanimationend = () => onClose();
    }
  };

  const onkeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Portal selector="drawer-root">
      {open && (
        <motion.div
          ref={bgRef}
          tabIndex={0}
          role="button"
          onKeyDown={onkeyDown}
          onClick={onBackgroundClick}
          className={styles.drawerContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            ref={drawerRef}
            className={`${styles.drawerBox} ${styles[direction]}`}
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </Portal>
  );
};

export default Drawer;
