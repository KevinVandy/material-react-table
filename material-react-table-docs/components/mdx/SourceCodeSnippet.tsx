import React, { FC, useState, useEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import darkCodeTheme from 'prism-react-renderer/themes/vsDark';
import lightCodeTheme from 'prism-react-renderer/themes/vsLight';
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
  Paper,
} from '@mui/material';
import {
  Code,
  GitHub,
  ContentCopy,
  LibraryAddCheck,
  UnfoldMore,
  UnfoldLess,
} from '@mui/icons-material';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';

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
  apiCode?: string;
  javaScriptCode?: string;
  showCodeSandboxLink?: boolean;
  tableId: string;
  typeScriptCode: string;
}

export const SourceCodeSnippet: FC<Props> = ({
  Component,
  apiCode,
  javaScriptCode,
  showCodeSandboxLink = true,
  tableId,
  typeScriptCode,
}) => {
  const plausible = usePlausible();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [isTypeScript, setIsTypeScript] = useState(true);
  const [showApiCode, setShowApiCode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullCode, setIsFullCode] = useState(false);

  let skipCodeLine = false;

  useEffect(
    () =>
      setIsTypeScript(
        localStorage.getItem('isTypeScript') === 'true' || !javaScriptCode,
      ),
    [javaScriptCode],
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
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <LinkHeading
              tableId={tableId}
              variant="h4"
              textTransform="capitalize"
            >
              Demo
            </LinkHeading>
            {showCodeSandboxLink && (
              <Box
                sx={{
                  display: { xs: 'grid', sm: 'flex' },
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                <Button
                  startIcon={<Code />}
                  href={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/main/material-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
                  onClick={() => plausible('open-code-sandbox')}
                  rel="noreferrer"
                  target="_blank"
                  sx={{ cursor: 'pointer' }}
                  variant="outlined"
                >
                  Open Code Sandbox
                </Button>
                <Button
                  startIcon={<GitHub />}
                  href={`https://github.com/KevinVandy/material-react-table/tree/main/material-react-table-docs/examples/${tableId}/sandbox/src/${
                    isTypeScript ? 'TS.tsx' : 'JS.js'
                  }`}
                  onClick={() => plausible('open-on-github')}
                  rel="noreferrer"
                  target="_blank"
                  sx={{ cursor: 'pointer' }}
                  variant="outlined"
                >
                  Open on GitHub
                </Button>
              </Box>
            )}
          </Box>
          <Component />
        </>
      )}
      <div>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <LinkHeading
            tableId={tableId}
            textTransform="capitalize"
            variant="h4"
          >
            Source Code
          </LinkHeading>
          <ToggleButtonGroup>
            <ToggleButton
              onClick={() => {
                setIsTypeScript(true);
                setShowApiCode(false);
                plausible('toggle-to-typescript');
              }}
              selected={isTypeScript && !showApiCode}
              sx={{ textTransform: 'none' }}
              value="ts"
            >
              {isMobile ? 'TS' : 'TypeScript'}
            </ToggleButton>
            {javaScriptCode && (
              <ToggleButton
                onClick={() => {
                  setIsTypeScript(false);
                  setShowApiCode(false);
                  plausible('toggle-to-javascript');
                }}
                selected={!isTypeScript && !showApiCode}
                sx={{ textTransform: 'none' }}
                value="js"
              >
                {isMobile ? 'JS' : 'JavaScript'}
              </ToggleButton>
            )}
            {apiCode && (
              <ToggleButton
                onClick={() => {
                  setShowApiCode(true);
                }}
                value="js"
                selected={showApiCode}
              >
                API
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </Box>
        <Paper>
          <Highlight
            {...defaultProps}
            code={
              showApiCode
                ? apiCode ?? ''
                : isTypeScript
                ? typeScriptCode
                : javaScriptCode ?? ''
            }
            language={showApiCode || isTypeScript ? 'tsx' : 'jsx'}
            theme={
              theme.palette.mode === 'dark' ? darkCodeTheme : lightCodeTheme
            }
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
                    {isCopied ? <LibraryAddCheck /> : <ContentCopy />}
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
                    {isFullCode ? <UnfoldLess /> : <UnfoldMore />}
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
        </Paper>
      </div>
      <Divider />
    </Box>
  );
};
