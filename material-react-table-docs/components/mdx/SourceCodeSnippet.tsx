import React, { FC, useState, useEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/github';
import {
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  styled,
  IconButton,
  Tooltip,
  Divider,
  useMediaQuery,
  Box,
  Button,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { LinkHeading } from './LinkHeading';

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
  Component?: FC;
  showCodeSandboxLink?: boolean;
  javaScriptCode?: string;
  tableId: string;
  typeScriptCode: string;
}

export const SourceCodeSnippet: FC<Props> = ({
  Component,
  javaScriptCode,
  tableId,
  typeScriptCode,
  showCodeSandboxLink = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 720px)');
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
      isTypeScript ? typeScriptCode : javaScriptCode ?? '',
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        m: '2rem auto',
      }}
    >
      <Divider />
      {Component && (
        <>
          <Box sx={{ display: 'flex' }}>
            <LinkHeading tableId={tableId} variant="h4">
              Demo
            </LinkHeading>
            {showCodeSandboxLink && (
              <Button
                href={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/main/material-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
                rel="noreferrer"
                target="_blank"
                sx={{ height: '3rem', ml: '1rem' }}
                variant="outlined"
              >
                Open Code Sandbox
              </Button>
            )}
            {showCodeSandboxLink && (
              <Button
                href={`https://github.com/KevinVandy/material-react-table/tree/main/material-react-table-docs/examples/${tableId}/sandbox/src/${
                  isTypeScript ? 'TS.tsx' : 'JS.js'
                }`}
                rel="noreferrer"
                target="_blank"
                sx={{ height: '3rem', ml: '1rem' }}
                variant="outlined"
              >
                Open on GitHub
              </Button>
            )}
          </Box>
          <Component />
        </>
      )}
      <div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <LinkHeading tableId={tableId} variant="h4">
            Source Code
          </LinkHeading>
          <ToggleButtonGroup>
            <ToggleButton
              onClick={() => setIsTypeScript(true)}
              value="ts"
              selected={isTypeScript}
            >
              TS
            </ToggleButton>
            {javaScriptCode && (
              <ToggleButton
                onClick={() => setIsTypeScript(false)}
                value="js"
                selected={!isTypeScript}
              >
                JS
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </div>
        <Highlight
          {...defaultProps}
          code={isTypeScript ? typeScriptCode : javaScriptCode ?? ''}
          language={isTypeScript ? 'tsx' : 'jsx'}
          theme={theme.palette.mode === 'dark' ? vsDark : vsLight}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div
              style={{
                position: 'relative',
                fontSize: isMobile ? '1em' : '1.2em',
              }}
            >
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
                  padding: isMobile
                    ? '3rem 0.5rem 1rem 0.5rem'
                    : '0.5rem 0.25rem',
                  overflowX: 'auto',
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
                    {!isMobile && (
                      <span
                        style={{
                          paddingRight: '2ch',
                          paddingLeft: `${4 - String(i + 1).length}ch`,
                          color: theme.palette.text.secondary,
                          userSelect: 'none',
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
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
      <Divider />
    </Box>
  );
};
