import React from 'react';
import styles from './styles.module.scss';
import { bindClassNames } from '@/shared/utils';
import { AnimatePresence, motion } from 'framer-motion';

const cx = bindClassNames(styles);

interface PopoverProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}

const Popover = ({ open, onClose, children, className = '' }: PopoverProps) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={popoverRef}
          className={`${cx('popover-content')} ${className}`}
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popover;
