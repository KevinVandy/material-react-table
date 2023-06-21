import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
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
  Select,
  MenuItem,
  TextField,
  rgbToHex,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';
import { useThemeContext } from '../../styles/ThemeContext';
import { EthicalAd } from './EthicalAd';

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
  Component?: any;
  apiCode?: string;
  javaScriptCode?: string;
  legacyCode?: string;
  tableId: string;
  typeScriptCode: string;
}

export const SourceCodeSnippet = ({
  Component,
  apiCode,
  javaScriptCode,
  legacyCode,
  tableId,
  typeScriptCode,
}: Props) => {
  const plausible = usePlausible();
  const theme = useTheme();
  const {
    isLightTheme,
    setIsLightTheme,
    secondaryColor,
    setSecondaryColor,
    primaryColor,
    setPrimaryColor,
  } = useThemeContext();
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [codeTab, setCodeTab] = useState<'ts' | 'js' | 'legacy' | 'api'>('ts');
  const [isCopied, setIsCopied] = useState(false);
  const [isFullCode, setIsFullCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      (codeTab === 'ts'
        ? typeScriptCode
        : codeTab === 'js'
        ? javaScriptCode
        : codeTab === 'legacy'
        ? legacyCode
        : apiCode) ?? '',
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  let skipCodeLine = false;

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
              alignItems: 'center',
            }}
          >
            <LinkHeading
              tableId={tableId}
              variant="h4"
              textTransform="capitalize"
            >
              Demo
            </LinkHeading>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexGrow: 1,
                flexWrap: 'wrap',
                gap: '2rem',
              }}
            >
              <Box
                sx={{
                  display: { xs: 'grid', sm: 'flex' },
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  width: { xs: '100%', lg: 'auto' },
                }}
              >
                <Button
                  color="success"
                  endIcon={<LaunchIcon />}
                  href={`https://stackblitz.com/github/KevinVandy/material-react-table/tree/main/apps/material-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
                  onClick={() => plausible('open-stackblitz')}
                  rel="noopener"
                  startIcon={<ElectricBoltIcon />}
                  sx={{ cursor: 'pointer' }}
                  target="_blank"
                  variant="outlined"
                >
                  Open Stackblitz
                </Button>
                <Button
                  color="warning"
                  endIcon={<LaunchIcon />}
                  href={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/main/apps/material-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
                  onClick={() => plausible('open-code-sandbox')}
                  rel="noopener"
                  startIcon={<CodeIcon />}
                  sx={{ cursor: 'pointer' }}
                  target="_blank"
                  variant="outlined"
                >
                  Open Code Sandbox
                </Button>
                <Button
                  color="info"
                  endIcon={<LaunchIcon />}
                  href={`https://github.com/KevinVandy/material-react-table/tree/main/apps/material-react-table-docs/examples/${tableId}/sandbox/src/${
                    codeTab === 'ts'
                      ? 'TS.tsx'
                      : codeTab === 'js'
                      ? 'JS.js'
                      : codeTab === 'legacy'
                      ? 'Props.tsx'
                      : 'API.ts'
                  }`}
                  onClick={() => plausible('open-on-github')}
                  rel="noopener"
                  startIcon={<GitHubIcon />}
                  sx={{ cursor: 'pointer' }}
                  target="_blank"
                  variant="outlined"
                >
                  Open on GitHub
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: 'auto',
                  gap: '1rem',
                  justifyContent: { xs: 'center', xl: 'flex-end' },
                  flexGrow: 1,
                }}
              >
                <TextField
                  label="Primary"
                  type="color"
                  value={rgbToHex(primaryColor ?? '#4dabf5')}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  onClick={() => plausible('change-primary-color')}
                  sx={{ minWidth: '60px' }}
                  variant="standard"
                />
                <TextField
                  label="Secondary"
                  type="color"
                  value={rgbToHex(secondaryColor)}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  onClick={() => plausible('change-secondary-color')}
                  sx={{ minWidth: '60px' }}
                  variant="standard"
                />
                <Select
                  value={isLightTheme ? 'light' : 'dark'}
                  onChange={(e) => {
                    setIsLightTheme(e.target.value === 'light');
                    plausible(
                      `toggle-theme-${
                        e.target.value === 'light' ? 'light' : 'dark'
                      }-mode`,
                    );
                  }}
                  variant="standard"
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Component />
        </>
      )}
      <div>
        <Box
          sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}
        >
          <LinkHeading
            tableId={tableId}
            textTransform="capitalize"
            variant="h4"
          >
            Source Code
          </LinkHeading>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              gap: '1rem',
              justifyContent: 'space-between',
              flexWrap: {
                xs: 'wrap',
                md: 'nowrap',
              },
            }}
          >
            <span>
              <ToggleButtonGroup>
                <ToggleButton
                  onClick={() => {
                    setCodeTab('ts');
                    plausible('toggle-to-typescript');
                  }}
                  selected={codeTab === 'ts'}
                  sx={{ textTransform: 'none' }}
                  value="ts"
                >
                  {isMobile ? 'TS' : 'TypeScript'}
                </ToggleButton>
                {javaScriptCode && (
                  <ToggleButton
                    onClick={() => {
                      setCodeTab('js');
                      plausible('toggle-to-javascript');
                    }}
                    selected={codeTab === 'js'}
                    sx={{ textTransform: 'none' }}
                    value="js"
                  >
                    {isMobile ? 'JS' : 'JavaScript'}
                  </ToggleButton>
                )}
                {legacyCode && (
                  <ToggleButton
                    value="js"
                    onClick={() => {
                      setCodeTab('legacy');
                    }}
                    selected={codeTab === 'legacy'}
                    sx={{ textTransform: 'none' }}
                  >
                    {isMobile ? 'Legacy' : 'Legacy Props API'}
                  </ToggleButton>
                )}
                {apiCode && (
                  <ToggleButton
                    onClick={() => {
                      setCodeTab('api');
                    }}
                    value="js"
                    selected={codeTab === 'api'}
                  >
                    {isMobile ? 'API' : 'Back-end API'}
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            </span>
            {!isMobile && <EthicalAd id="demo" compact text />}
          </Box>
        </Box>
        <Paper elevation={3}>
          <Highlight
            code={
              (codeTab === 'ts'
                ? typeScriptCode
                : codeTab === 'js'
                ? javaScriptCode
                : codeTab === 'legacy'
                ? legacyCode
                : apiCode) ?? ''
            }
            language={codeTab !== 'js' ? 'tsx' : 'jsx'}
            theme={
              theme.palette.mode === 'dark' ? themes.nightOwl : themes.github
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
        </Paper>
      </div>
      <Divider />
    </Box>
  );
};
