'use client';

import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import CopyButton from './copy-button';
import { cn } from '@nextui-org/theme';

interface Props {
  code: string;
  language?: 'tsx' | 'jsx' | 'javascript' | 'typescript' | 'bash';
}

export default function CodeView({ code, language = 'tsx' }: Props) {
  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          translate="no"
          className={cn(
            'relative rounded-lg p-6 text-sm bg-gray-800 text-white overflow-x-auto',
            className
          )}
          style={style}
        >
          <CopyButton code={code} style={{ padding: '2px' }} />
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
