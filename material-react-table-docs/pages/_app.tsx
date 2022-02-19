import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { createTheme, styled, ThemeProvider } from '@mui/material';
import { mdxComponents } from '../components/mdx/mdxComponents';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import '../styles/globals.css';
import Head from 'next/head';

const PageContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: '100vh',
  transition: 'all 200ms ease-in-out',
}));

function App({ Component, pageProps }: AppProps) {
  const [navOpen, setNavOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(
    () => setDarkTheme(localStorage.getItem('darkTheme') === 'true'),
    [],
  );

  useEffect(
    () => localStorage.setItem('darkTheme', darkTheme.toString()),
    [darkTheme],
  );

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
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: darkTheme ? 'dark' : 'light',
          },
          typography: {
            h1: {
              fontSize: '2rem',
              lineHeight: '3rem',
              paddingLeft: '1.5rem',
            },
            h2: {
              fontSize: '2.5rem',
              lineHeight: '5rem',
              fontWeight: 'bold',
            },
            h3: {
              fontSize: '2rem',
              lineHeight: '4rem',
            },
            h4: {
              fontSize: '1.75rem',
              lineHeight: '3rem',
            },
            h5: {
              fontSize: '1.5rem',
              lineHeight: '3rem',
            },
            h6: {
              fontSize: '1.25rem',
              lineHeight: '3rem',
            },
            subtitle1: {
              marginBottom: '1rem',
            },
            body1: {
              fontSize: '1rem',
              lineHeight: '2rem',
              marginBottom: '0.5rem',
            },
          },
        })}
      >
        <TopBar
          darkTheme={darkTheme}
          navOpen={navOpen}
          setDarkTheme={setDarkTheme}
          setNavOpen={setNavOpen}
        />
        <SideBar navOpen={navOpen} setNavOpen={setNavOpen} />
        <PageContainer
          style={{ padding: `64px 32px 800px ${navOpen ? '260px' : '32px'}` }}
        >
          <Component components={mdxComponents} {...pageProps} />
        </PageContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
