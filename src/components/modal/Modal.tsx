import React from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

const modalRoot = document.getElementById('modal-root')!;
interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
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
const Modal = ({
  open,
  onClose,
  children,
  className = '',
  ...other
}: ModalProps) => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const [innerOpenState, setInnerOpenState] = React.useState(false);

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

  React.useEffect(() => {
    if (open) {
      setInnerOpenState(open);
    } else {
      if (!modalRef.current) return;
      modalRef.current.style.animation = `${styles.fadeOut} 0.2s ease forwards`;
      modalRef.current.onanimationend = () => {
        setInnerOpenState(false);
        modalRef.current!.onanimationend = null;
      };
    }
  }, [open]);

  if (!innerOpenState) return null;

  return createPortal(
    <div
      ref={bgRef}
      tabIndex={0}
      role="button"
      onKeyDown={onkeyDown}
      onClick={onBackgroundClick}
      className={styles.modalContainer}
    >
      <div
        ref={modalRef}
        className={`${styles.modalBox} ${className}`}
        {...other}
      >
        {children}
      </div>
    </div>,
    modalRoot
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

const ModalAction = ({
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
Modal.Action = ModalAction;
Modal.Content = ModalContent;

export default Modal;
