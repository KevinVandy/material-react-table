import React, { FC, useState } from 'react';
import { styled } from '@mui/material';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'all .2s',
});

export const Layout: FC = ({ children }) => {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <>
      <TopBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <SideBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <PageContainer
        style={{ padding: `100px 32px 600px ${navOpen ? '220px' : '32px'}` }}
      >
        {children}
      </PageContainer>
    </>
  );
};
