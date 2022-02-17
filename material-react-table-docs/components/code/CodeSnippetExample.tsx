import React, { FC } from 'react';
import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/vsDark';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

export interface Props {
  typeScriptCode: string;
  javaScriptCode: string;
  Component: FC;
}

export const CodeSnippetExample: FC<Props> = ({
  typeScriptCode,
  javaScriptCode,
  Component,
}) => {
  const [isTypeScript, setIsTypeScript] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Component />
      <div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="h4">Source Code</Typography>
          <ToggleButtonGroup>
            <ToggleButton
              onClick={() => setIsTypeScript(true)}
              value="ts"
              selected={isTypeScript}
            >
              TS
            </ToggleButton>
            <ToggleButton
              onClick={() => setIsTypeScript(false)}
              value="js"
              selected={!isTypeScript}
            >
              JS
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Highlight
          {...defaultProps}
          code={isTypeScript ? typeScriptCode : javaScriptCode}
          language={isTypeScript ? 'tsx' : 'jsx'}
          theme={github}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                padding: '0.5rem',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} style={style}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
