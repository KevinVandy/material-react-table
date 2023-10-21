import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import BasicExample from '../examples/basic';
import MinimalExample from '../examples/minimal';
import AdvancedExample from '../examples/advanced';
import CustomHeadlessExample from '../examples/custom-headless';
import { useState } from 'react';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const BasicExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'basic',
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(_e, newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
        >
          <Tab label="Basic" value="basic" />
          <Tab label="Minimal" value="minimal" />
          <Tab label="Advanced" value="advanced" />
          <Tab label="Custom Headless" value="custom-headless" />
          <Link href="/docs/examples/export-csv" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Data Export
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/column-ordering" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  DnD
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/editing-crud" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Editing
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/filter-variants" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Filtering
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/react-query" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Fetching
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/sticky-header" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Pinning
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/virtualized" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Virtualization
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  More Examples
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
        </Tabs>
      </Box>
      <Box>
        {activeTab === 'basic' && <BasicExample showTopRow={isPage} />}
        {activeTab === 'minimal' && <MinimalExample showTopRow={isPage} />}
        {activeTab === 'advanced' && <AdvancedExample showTopRow={isPage} />}
        {activeTab === 'custom-headless' && (
          <CustomHeadlessExample showTopRow={isPage} />
        )}
      </Box>
    </>
  );
};

export default BasicExamples;
