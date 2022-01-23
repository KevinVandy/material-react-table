import '../styles/globals.css';
import type { AppProps } from 'next/app';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import { styled } from '@mui/material';
import { useState } from 'react';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'all .2s',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <div>
      <TopBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <SideBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <PageContainer
        style={{ padding: `100px 32px 600px ${navOpen ? '220px' : '32px'}` }}
      >
        <Component {...pageProps} />
      </PageContainer>
    </div>
  );
}

export default MyApp;
