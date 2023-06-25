import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { SampleCodeSnippet } from './SampleCodeSnippet';

type Tab = 'npm' | 'pnpm' | 'yarn';

const defaultPackagesString =
  'material-react-table @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled';

export const InstallCommand = ({ packagesString = defaultPackagesString }) => {
  const [tab, setTab] = useState<Tab>('npm');

  return (
    <>
      <Tabs
        sx={{ m: 0 }}
        value={tab}
        onChange={(_e, newValue) => setTab(newValue)}
      >
        <Tab label="NPM" value="npm" />
        <Tab label="PNPM" value="pnpm" />
        <Tab label="Yarn" value="yarn" sx={{ textTransform: 'none' }} />
      </Tabs>
      <SampleCodeSnippet
        className="language-bash"
        margin="0"
        style={{ overflowX: 'hidden' }}
      >
        {tab === 'npm'
          ? `npm i ${packagesString}`
          : tab === 'pnpm'
          ? `pnpm add ${packagesString}`
          : `yarn add ${packagesString}`}
      </SampleCodeSnippet>
    </>
  );
};
