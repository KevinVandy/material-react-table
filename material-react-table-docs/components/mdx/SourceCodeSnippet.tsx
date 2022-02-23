import React, { FC, useState, useEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/github';
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  styled,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

const CopyButton = styled(IconButton)({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
});

const ToggleFullCodeButton = styled(IconButton)({
  position: 'absolute',
  top: '0.5rem',
  right: '3.5rem',
});

export interface Props {
  typeScriptCode: string;
  javaScriptCode: string;
  Component: FC;
}

export const SourceCodeSnippet: FC<Props> = ({
  typeScriptCode,
  javaScriptCode,
  Component,
}) => {
  const theme = useTheme();
  const [isTypeScript, setIsTypeScript] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullCode, setIsFullCode] = useState(false);

  let skipCodeLine = false;

  useEffect(
    () => setIsTypeScript(localStorage.getItem('isTypeScript') === 'true'),
    [],
  );

  useEffect(
    () => localStorage.setItem('isTypeScript', isTypeScript.toString()),
    [isTypeScript],
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(
      isTypeScript ? typeScriptCode : javaScriptCode,
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '1rem auto',
      }}
    >
      <Divider />
      <Typography variant="h4">Demo</Typography>
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
          theme={theme.palette.mode === 'dark' ? vsDark : vsLight}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div style={{ position: 'relative' }}>
              <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Code'}>
                <CopyButton onClick={handleCopy}>
                  {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                </CopyButton>
              </Tooltip>
              <Tooltip
                arrow
                title={
                  isFullCode
                    ? 'Hide columns and data definitions'
                    : 'Show columns and data definitions'
                }
              >
                <ToggleFullCodeButton
                  onClick={() => setIsFullCode(!isFullCode)}
                >
                  {isFullCode ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                </ToggleFullCodeButton>
              </Tooltip>
              <pre
                className={className}
                style={{
                  ...style,
                  padding: '0.5rem',
                }}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    style={{
                      ...style,
                      display: !isFullCode && skipCodeLine ? 'none' : 'block',
                    }}
                  >
                    <span
                      style={{
                        padding: '0 12px',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {i + 1}
                    </span>
                    {line.map((token, key) => {
                      if (
                        token.content === '//column definitions...' ||
                        token.content === '//data definitions...'
                      ) {
                        skipCodeLine = true;
                        if (isFullCode) {
                          return null;
                        }
                      } else if (token.content === '//end') {
                        skipCodeLine = false;
                        return null;
                      }
                      return (
                        <span key={key} {...getTokenProps({ token, key })} />
                      );
                    })}
                  </div>
                ))}
              </pre>
            </div>
          )}
        </Highlight>
      </div>
    </div>
  );
};
