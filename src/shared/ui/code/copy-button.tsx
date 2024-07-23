'use client';

import { useState, useCallback, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@nextui-org/theme';

const copyToClipboard = (str: string) => {
  return navigator.clipboard.writeText(str);
};

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  code: string;
  className?: string;
}

export default function CopyButton({ code, className, ...other }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<any>(null);

  const handleCopy = useCallback(() => {
    clearTimeout(timer.current);
    copyToClipboard(code).then(() => {
      setIsCopied(true);
      timer.current = setTimeout(() => setIsCopied(false), 1500);
    });
  }, [code]);

  return (
    <button
      type="button"
      aria-label="code copy"
      className={cn(
        'absolute top-4 right-4 p-1 rounded-md bg-gray-800 text-white',
        className
      )}
      onClick={handleCopy}
      {...other}
    >
      {isCopied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
