import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { mdxComponents } from '../components/mdx/mdxComponents';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import BreadCrumbs from '../components/navigation/BreadCrumbs';
import MiniNav from '../components/navigation/MiniNav';
import { theme } from '../styles/MuiTheme';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const showBreadCrumbs =
    pathname !== '/' && pathname !== '/about' && pathname !== '/changelog';

  const showMiniNav =
    pathname.includes('/docs/guides/') ||
    pathname.includes('/docs/usage') ||
    pathname.includes('/docs/install');

  const isMobile = useMediaQuery('(max-width: 900px)');
  const isTablet = useMediaQuery('(min-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');

  const [navOpen, setNavOpen] = useState(pathname === '/');
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    setDarkTheme(localStorage.getItem('darkTheme') === 'true');
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? '#111' : '#fff';
    localStorage.setItem('darkTheme', darkTheme.toString());
  }, [darkTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isTablet) {
      setNavOpen(true);
    }
  }, [isTablet]);

  return (
    <>
      <Head>
        <title>Material React Table</title>
        <meta
          name="description"
          content="Material React Table, a fully featured Material UI implementation of TanStack React Table V8. Written from the ground up in TypeScript."
        />
        <link rel="icon" href="/mrt_logo.png" />
      </Head>
      <ThemeProvider theme={theme(darkTheme)}>
        <MDXProvider components={mdxComponents}>
          <TopBar
            darkTheme={darkTheme}
            navOpen={navOpen || isDesktop}
            setDarkTheme={setDarkTheme}
            setNavOpen={setNavOpen}
          />
          <SideBar navOpen={navOpen || isDesktop} setNavOpen={setNavOpen} />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              minHeight: '100vh',
              p: `64px ${showMiniNav && isXLDesktop ? '250px' : '32px'} 800px ${
                (navOpen || isDesktop) && !isMobile ? '300px' : '32px'
              }`,
              transition: 'all 200ms ease-in-out',
            })}
          >
            <Box
              sx={{
                maxWidth: '1200px',
                margin: 'auto',
                transition: 'all 200ms ease-in-out',
                width: '100%',
              }}
            >
              {showBreadCrumbs && <BreadCrumbs />}
              {showMiniNav && !isXLDesktop && <MiniNav />}
              <Component {...pageProps} />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Button
                  color="secondary"
                  startIcon={<GitHub />}
                  href={`https://github.com/KevinVandy/material-react-table/tree/main/material-react-table-docs/pages${pathname}${
                    ['/'].includes(pathname)
                      ? 'index.tsx'
                      : [
                          '/docs',
                          '/docs/api',
                          '/docs/examples',
                          '/docs/guides',
                        ].includes(pathname)
                      ? '/index.mdx'
                      : '.mdx'
                  }`}
                  rel="noreferrer"
                  target="_blank"
                  sx={{
                    height: '3rem',
                    m: '3rem auto',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  variant="outlined"
                >
                  Edit this page on GitHub
                </Button>
                <Typography
                  sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignContent: 'center',
                  }}
                  variant="subtitle2"
                >
                  You can make these docs better!{' '}
                  <a
                    href="http://makeapullrequest.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <img
                      alt=""
                      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
                    />
                  </a>
                </Typography>
              </Box>
            </Box>
            {showMiniNav && isXLDesktop && <MiniNav />}
          </Box>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
