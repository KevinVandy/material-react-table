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
  styled,
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
  showTopRow?: boolean;
}

export const SourceCodeSnippet = ({
  Component,
  apiCode,
  javaScriptCode,
  legacyCode,
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
  } = useThemeContext();
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [codeTab, setCodeTab] = useState<
    'ts' | 'js' | 'legacy' | 'api' | 'sandbox'
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

  const handleDismissV2Alert = () => {
    localStorage.setItem('v2AlertDismissed', 'true');
    setShowV2Alert(false);
    plausible('dismiss-v2-alert');
  };

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
                      href={`https://stackblitz.com/github/KevinVandy/material-react-table/tree/v2/apps/material-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
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
                      href={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/v2/apps/material-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
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
                      href={`https://github.com/KevinVandy/material-react-table/tree/v2/apps/material-react-table-docs/examples/${tableId}/sandbox/src/${
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
          <Component />
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
            <AlertTitle>This example is written for MRT V2.</AlertTitle>
            If your app is still using MRT V1, either{' '}
            <Link href="/migrating-to-v2" passHref legacyBehavior>
              <MuiLink>Upgrade to MRT V2</MuiLink>
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
            instead. (useMaterialReactTable only exists in V2)
          </Alert>
        </Collapse>
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
                      plausible('toggle-to-legacy');
                    }}
                    selected={codeTab === 'legacy'}
                    sx={{ textTransform: 'none' }}
                  >
                    {isMobile ? 'Legacy' : 'Props API'}
                  </ToggleButton>
                )}
                {apiCode && (
                  <ToggleButton
                    onClick={() => {
                      setCodeTab('api');
                      plausible('toggle-to-api');
                    }}
                    value="api"
                    selected={codeTab === 'api'}
                    sx={{ textTransform: 'none' }}
                  >
                    {isMobile ? 'API' : 'Back-end API'}
                  </ToggleButton>
                )}
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
        <Collapse mountOnEnter in={codeTab === 'sandbox'}>
          <iframe
            src={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/v2/apps/material-react-table-docs/examples/${tableId}/sandbox?fontsize=14&hidenavigation=1&theme=${
              isLightTheme ? 'light' : 'dark'
            }&file=src/TS.tsx`}
            style={{
              width: '100%',
              height: '1000px',
              border: '0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
            title="codesandbox"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </Collapse>
        {codeTab !== 'sandbox' && (
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
                theme.palette.mode === 'dark'
                  ? themes.oneDark
                  : themes.jettwaveLight
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
                      fontSize: '11pt',
                      lineHeight: '1.5em',
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line, key: i })}
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
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
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
