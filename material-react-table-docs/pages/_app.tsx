import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { Box, ThemeProvider, useMediaQuery } from '@mui/material';
import { mdxComponents } from '../components/mdx/mdxComponents';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import BreadCrumbs from '../components/navigation/BreadCrumbs';
import MiniNav from '../components/navigation/MiniNav';
import Footer from '../components/navigation/Footer';
import { theme } from '../styles/MuiTheme';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const showBreadCrumbs = pathname !== '/';

  const showMiniNav =
    pathname.includes('/docs/guides/') ||
    pathname.includes('/docs/usage') ||
    pathname.includes('/docs/install');

  const isMobile = useMediaQuery('(max-width: 900px)');
  const isTablet = useMediaQuery('(min-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');

  const [navOpen, setNavOpen] = useState(pathname === '/');
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLightTheme(localStorage.getItem('isLightTheme') === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = isLightTheme ? '#fff' : '#111';
      localStorage.setItem('isLightTheme', isLightTheme.toString());
    }
  }, [isLightTheme]);

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
        <link
          rel="preconnect"
          href="https://1W9SWN5ZAH-dsn.algolia.net"
          crossOrigin="true"
        />
      </Head>
      <ThemeProvider theme={theme(isLightTheme)}>
        <MDXProvider components={mdxComponents}>
          <TopBar
            isLightTheme={isLightTheme}
            navOpen={navOpen || isDesktop}
            setIsLightTheme={setIsLightTheme}
            setNavOpen={setNavOpen}
          />
          <SideBar navOpen={navOpen || isDesktop} setNavOpen={setNavOpen} />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              minHeight: '100vh',
              p: `64px ${showMiniNav && isXLDesktop ? '250px' : '32px'} 0 ${
                (navOpen || isDesktop) && !isMobile ? '300px' : '32px'
              }`,
              transition: 'all 200ms ease-in-out',
            })}
          >
            <Box
              component="main"
              sx={{
                maxWidth: '1200px',
                margin: 'auto',
                transition: 'all 200ms ease-in-out',
                width: '100%',
              }}
            >
              {showBreadCrumbs && <BreadCrumbs />}
              {showMiniNav && !isXLDesktop && <MiniNav />}
              {pathname === '/' ? (
                <Component {...pageProps} />
              ) : (
                <article>
                  <Component {...pageProps} />
                </article>
              )}
              <Footer />
            </Box>
            {showMiniNav && isXLDesktop && <MiniNav />}
          </Box>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
