import '../styles/globals.css';
import { useState } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { Box, useMediaQuery } from '@mui/material';
import { ThemeContextProvider } from '../styles/ThemeContext';
import { mdxComponents } from '../components/mdx/mdxComponents';
import { TopBar } from '../components/navigation/TopBar';
import { SideBar } from '../components/navigation/Sidebar';
import { BreadCrumbs } from '../components/navigation/BreadCrumbs';
import { MiniNav } from '../components/navigation/MiniNav';
import { Footer } from '../components/navigation/Footer';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const showBreadCrumbs = pathname !== '/';
  const showMiniNav =
    pathname.includes('/docs/getting-started') ||
    pathname.includes('/docs/api/mrt') ||
    pathname.includes('/docs/guides/') ||
    pathname.includes('/migrating') ||
    pathname === '/about' ||
    pathname === '/changelog' ||
    pathname === '/roadmap';

  const isMobile = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');

  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Material React Table V2</title>
        <meta
          name="description"
          content="Material React Table, a fully featured Material UI V5 implementation of TanStack React Table V8. Written from the ground up in TypeScript."
        />
        <link
          rel="canonical"
          href={`https://www.material-react-table.com${pathname}`}
        />
        <link rel="icon" href="/mrt_logo.png" />
        <meta property="og:image" content="/mrt_logo.png" />
        <meta
          property="og:url"
          content={`https://www.material-react-table.com${pathname}`}
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <link
              rel="preconnect"
              href="https://1W9SWN5ZAH-dsn.algolia.net"
              crossOrigin="anonymous"
            />
            <script
              async
              src="https://media.ethicalads.io/media/client/ethicalads.min.js"
            />
          </>
        )}
      </Head>
      <PlausibleProvider
        domain="material-react-table.com"
        enabled={process.env.NODE_ENV === 'production'}
      >
        <ThemeContextProvider>
          <MDXProvider components={mdxComponents}>
            <TopBar navOpen={navOpen || isDesktop} setNavOpen={setNavOpen} />
            <SideBar navOpen={navOpen || isDesktop} setNavOpen={setNavOpen} />
            <Box
              component="main"
              sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                minHeight: '100vh',
                p: `64px ${showMiniNav && isXLDesktop ? '250px' : '32px'} 0 ${
                  (navOpen || isDesktop) && !isMobile ? '320px' : '32px'
                }`,
                transition: 'all 100ms ease-in-out',
              })}
            >
              <Box
                sx={{
                  maxWidth: '1200px',
                  margin: 'auto',
                  transition: 'all 100ms ease-in-out',
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
        </ThemeContextProvider>
      </PlausibleProvider>
    </>
  );
}

export default App;
