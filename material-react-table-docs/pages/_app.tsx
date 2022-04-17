import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import { styled, ThemeProvider, useMediaQuery } from '@mui/material';
import { mdxComponents } from '../components/mdx/mdxComponents';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import { theme } from '../styles/MuiTheme';
import '../styles/globals.css';

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
          content="Material React Table Docs. A fully featured Material UI implementation of react-table, inspired by material-table and the MUI X DataGrid, written from the ground up in TypeScript."
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
          <PageContainer
            sx={{
              p: `64px 32px 800px ${
                (navOpen || isDesktop) && !isTablet ? '280px' : '32px'
              }`,
            }}
          >
            <PageContent>
              <Component {...pageProps} />
            </PageContent>
          </PageContainer>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
