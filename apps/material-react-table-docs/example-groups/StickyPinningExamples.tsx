import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import StickyHeaderExample from '../examples/enable-sticky-header';
import ColumnPinningExample from '../examples/enable-column-pinning';
import RowPinningStickyExample from '../examples/enable-row-pinning-sticky';
import RowPinningStaticExample from '../examples/enable-row-pinning-static';
import StickySelectExample from '../examples/enable-row-pinning-select';
import { useState } from 'react';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const StickyPinningExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'export-csv',
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          textColor="secondary"
          indicatorColor="secondary"
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(_e, newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
        >
          <Tab label="Sticky Header" value="sticky-header" />
          <Tab label="Column Pinning" value="column-pinning" />
          <Tab label="Row Pinning (Sticky)" value="sticky-row-pinning" />
          <Tab label="Row Pinning (Static)" value="static-row-pinning" />
          <Tab label="Sticky Row Selection" value="sticky-row-selection" />
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
        {activeTab === 'sticky-header' && <StickyHeaderExample />}
        {activeTab === 'column-pinning' && <ColumnPinningExample />}
        {activeTab === 'sticky-row-pinning' && <RowPinningStickyExample />}
        {activeTab === 'static-row-pinning' && <RowPinningStaticExample />}
        {activeTab === 'sticky-row-selection' && <StickySelectExample />}
      </Box>
    </>
  );
};

export default StickyPinningExamples;
