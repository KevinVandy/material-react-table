import React, { FC, useState } from 'react';
import { styled } from '@mui/material';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';

const PageContainer = styled('div')({
  transition: 'all .3s ease',
});

export const Layout: FC = ({ children }) => {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <>
      <TopBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <SideBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <PageContainer style={{ padding: `80px 32px 800px ${navOpen ? '260px' : '32px'}` }}>
        {children}
      </PageContainer>
    </>
  );
};
