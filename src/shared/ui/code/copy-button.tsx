'use client';

import { useState, useCallback, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

const copyToClipboard = (str: string) => {
  return navigator.clipboard.writeText(str);
};

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  code: string;
}

export default function CopyButton({ code, ...other }: Props) {
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
      className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-white"
      onClick={handleCopy}
      {...other}
    >
      {isCopied ? <Check /> : <Copy />}
    </button>
  );
}
