import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Link as MuiLink,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  rgbToHex,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';
import { useThemeContext } from '../../styles/ThemeContext';
import { EthicalAd } from './EthicalAd';

export interface Props {
  Component?: any;
  tableId: string;
  typeScriptCode: string;
  showTopRow?: boolean;
}

export const SourceCodeSnippet = ({
  Component,
  tableId,
  typeScriptCode,
  showTopRow = true,
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
    setIsSandboxOpen,
  } = useThemeContext();
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [codeTab, setCodeTab] = useState<
    'ts' | 'api' | 'stackblitz' | 'sandbox'
  >('ts');
  const [isCopied, setIsCopied] = useState(false);
  const [isFullCode, setIsFullCode] = useState(false);
  const [showV2Alert, setShowV2Alert] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const v2AlertDismissed = localStorage.getItem('v2AlertDismissed');
    if (!v2AlertDismissed) {
      setShowV2Alert(true);
    }
  }, []);

  useEffect(() => {
    setIsSandboxOpen(['stackblitz', 'sandbox'].includes(codeTab));
    return () => {
      setIsSandboxOpen(false);
    };
  }, [codeTab]);

  const handleDismissV2Alert = () => {
    localStorage.setItem('v2AlertDismissed', 'true');
    setShowV2Alert(false);
    plausible('dismiss-v2-alert');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(typeScriptCode ?? '');
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
      {Component && (
        <>
          {showTopRow && (
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
                sx={{ textTransform: 'capitalize' }}
                variant="h4"
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      href={`https://stackblitz.com/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
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
                      href={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
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
                      href={`https://github.com/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox/src/${
                        codeTab === 'ts' ? 'TS.tsx' : 'API.ts'
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
                    MenuProps={{ disableScrollLock: true }}
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
          )}
          <Collapse in={!['stackblitz', 'sandbox'].includes(codeTab)}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Component />
            </LocalizationProvider>
          </Collapse>
        </>
      )}
      <div>
        <Collapse in={showV2Alert}>
          <Alert
            onClose={handleDismissV2Alert}
            sx={{ mb: '1rem' }}
            severity="info"
            variant="outlined"
            closeText="Don't show again"
          >
            <AlertTitle>This example is written for MRT V3.</AlertTitle>
            If your app is still using MRT V1, either{' '}
            <Link href="/migrating-to-v2" passHref legacyBehavior>
              <MuiLink>Upgrade to MRT V3</MuiLink>
            </Link>{' '}
            or use the{' '}
            <MuiLink
              href="https://v1.material-react-table.com"
              rel="noopener"
              target="_blank"
              onClick={() => plausible('version-select')}
            >
              V1 Docs
            </MuiLink>{' '}
            instead. (useMaterialReactTable only exists in V2 and V3)
          </Alert>
        </Collapse>
        <Box
          sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}
        >
          <LinkHeading
            tableId={tableId}
            sx={{ textTransform: 'capitalize' }}
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
                <ToggleButton
                  onClick={() => {
                    setCodeTab('stackblitz');
                    plausible('toggle-to-stackblitz');
                  }}
                  value="stackblitz"
                  selected={codeTab === 'stackblitz'}
                  sx={{ textTransform: 'none' }}
                >
                  Stackblitz
                </ToggleButton>
                <ToggleButton
                  onClick={() => {
                    setCodeTab('sandbox');
                    plausible('toggle-to-sandbox');
                  }}
                  value="sandbox"
                  selected={codeTab === 'sandbox'}
                  sx={{ textTransform: 'none' }}
                >
                  Sandbox
                </ToggleButton>
              </ToggleButtonGroup>
            </span>
            {!isMobile && <EthicalAd id="demo" compact text />}
          </Box>
        </Box>
        <Collapse mountOnEnter in={codeTab === 'stackblitz'}>
          <iframe
            src={`https://stackblitz.com/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
            style={{
              width: '100%',
              height: '1000px',
              border: '0',
              borderRadius: '4px',
              overflow: 'hidden',
              padding: '1rem 0',
            }}
            title="stackblitz"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </Collapse>
        <Collapse mountOnEnter in={codeTab === 'sandbox'}>
          <iframe
            src={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?fontsize=14&hidenavigation=1&theme=${
              isLightTheme ? 'light' : 'dark'
            }&file=src/TS.tsx`}
            style={{
              width: '100%',
              height: '1000px',
              border: '0',
              borderRadius: '4px',
              overflow: 'hidden',
              padding: '1rem 0',
            }}
            title="codesandbox"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </Collapse>
        {['ts', 'api'].includes(codeTab) && (
          <Paper elevation={3}>
            <Highlight
              code={typeScriptCode ?? ''}
              language={'tsx'}
              theme={
                theme.palette.mode === 'dark'
                  ? themes.oceanicNext
                  : themes.nightOwlLight
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
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                      }}
                      onClick={handleCopy}
                    >
                      {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title={
                      isFullCode
                        ? 'Hide columns and data definitions'
                        : 'Show columns and data definitions'
                    }
                  >
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '3.5rem',
                      }}
                      onClick={() => setIsFullCode(!isFullCode)}
                    >
                      {isFullCode ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                    </IconButton>
                  </Tooltip>
                  <pre
                    className={className}
                    style={{
                      ...style,
                      padding: isMobile
                        ? '3rem 0.5rem 1rem 0.5rem'
                        : '0.5rem 0.25rem',
                      overflowX: 'auto',
                      fontSize: '11pt',
                      lineHeight: '1.5em',
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line })}
                        style={{
                          ...style,
                          display:
                            !isFullCode && skipCodeLine ? 'none' : 'block',
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
                            token.content === '//data definitions...' ||
                            token.content === '//demo...'
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
                            <span key={key} {...getTokenProps({ token })} />
                          );
                        })}
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </Highlight>
          </Paper>
        )}
      </div>
      <Divider />
    </Box>
  );
};
