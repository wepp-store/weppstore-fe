import React from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { Portal } from '../portal';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * @example
 * <Modal open={open} onClose={onClose}>
 *   <Modal.Title>Test</Modal.Title>
 *   <Modal.Content>Hi!</Modal.Content>
 *   <Modal.Action>
 *     <Button onClick={() => setOpen(false)}>Close</Button>
 *   </Modal.Action>
 * </Modal>
 */
const Modal = ({ open, onClose, children, className = '' }: ModalProps) => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const onBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!onClose) return;
    if (e.target === bgRef.current) {
      onClose();
    }
  };

  const onkeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClose) return;
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Portal selector="modal-root">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={bgRef}
            tabIndex={0}
            role="button"
            onKeyDown={onkeyDown}
            onClick={onBackgroundClick}
            className={styles.modalContainer}
            // framer-motion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              ref={modalRef}
              className={`${styles.modalBox} ${className}`}
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

// ----------------------------------------------------------------------

interface ModalTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalTitle = ({ children, className = '' }: ModalTitleProps) => {
  return <div className={`${styles.modalTitle} ${className}`}>{children}</div>;
};

// ----------------------------------------------------------------------

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalContent = ({ children, className = '' }: ModalContentProps) => {
  return (
    <div className={`${styles.modalContent} ${className}`}>{children}</div>
  );
};

// ----------------------------------------------------------------------

interface ModalActionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalActions = ({
  children,
  className = '',
  ...other
}: ModalActionProps) => {
  return (
    <div className={`${styles.modalAction} ${className}`} {...other}>
      {children}
    </div>
  );
};

// ----------------------------------------------------------------------

Modal.Title = ModalTitle;
Modal.Actions = ModalActions;
Modal.Content = ModalContent;

export default Modal;
