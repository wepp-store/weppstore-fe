import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: Props) => {
  const ref = React.useRef<Element | null>(null);

  React.useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return ref.current ? createPortal(children, ref.current) : null;
};

export default Portal;
