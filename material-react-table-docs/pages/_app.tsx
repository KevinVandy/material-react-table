import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { styled, ThemeProvider, useMediaQuery } from '@mui/material';
import { mdxComponents } from '../components/mdx/mdxComponents';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import '../styles/globals.css';

import { theme } from '../styles/MuiTheme';

const PageContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: '100vh',
  transition: 'all 200ms ease-in-out',
}));

const PageContent = styled('div')({
  maxWidth: '1200px',
  margin: 'auto',
  transition: 'all 200ms ease-in-out',
});

function App({ Component, pageProps }: AppProps) {
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1600px)');
  const [navOpen, setNavOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(
    () => setDarkTheme(localStorage.getItem('darkTheme') === 'true'),
    [],
  );

  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? '#111' : '#fff';
    localStorage.setItem('darkTheme', darkTheme.toString());
  }, [darkTheme]);

  return (
    <>
      <Head>
        <title>Material React Table</title>
        <meta
          name="description"
          content="Material React Table Docs. A fully featured Material-UI implementation of react-table, inspired by material-table and the mui DataGrid, written from the ground up in TypeScript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme(darkTheme)}>
        <TopBar
          darkTheme={darkTheme}
          navOpen={navOpen || isDesktop}
          setDarkTheme={setDarkTheme}
          setNavOpen={setNavOpen}
        />
        <SideBar navOpen={navOpen || isDesktop} setNavOpen={setNavOpen} />
        <PageContainer
          style={{
            padding: `64px 32px 800px ${
              (navOpen || isDesktop) && !isTablet ? '280px' : '32px'
            }`,
          }}
        >
          <PageContent>
            <Component components={mdxComponents} {...pageProps} />
          </PageContent>
        </PageContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
