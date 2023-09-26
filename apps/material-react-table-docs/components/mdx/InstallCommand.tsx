import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { SampleCodeSnippet } from './SampleCodeSnippet';

type Tab = 'npm' | 'pnpm' | 'yarn';

const defaultPackagesString =
  'material-react-table@alpha @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled';

export const InstallCommand = ({
  packagesString = defaultPackagesString,
  ...rest
}) => {
  const [tab, setTab] = useState<Tab>('npm');

  return (
    <>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={tab}
        onChange={(_e, newValue) => setTab(newValue)}
        {...rest}
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
