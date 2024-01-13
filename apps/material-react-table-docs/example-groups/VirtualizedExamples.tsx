import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import FullyVirtualizedExample from '../examples/virtualized';
import RowVirtualization from '../examples/enable-row-virtualization';
import ColumnVirtualization from '../examples/enable-column-virtualization';
import InfiniteScrolling from '../examples/infinite-scrolling';
import { useState } from 'react';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const VirtualizedExamples = ({ isPage = false }) => {
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
          <Tab label="Fully Virtualized" value="virtualized" />
          <Tab label="Row Virtualization" value="row-virtualization" />
          <Tab label="Column Virtualization" value="column-virtualization" />
          <Tab label="Infinite Scrolling" value="infinite-scrolling" />
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
        {activeTab === 'virtualized' && <FullyVirtualizedExample />}
        {activeTab === 'row-virtualization' && <RowVirtualization />}
        {activeTab === 'column-virtualization' && <ColumnVirtualization />}
        {activeTab === 'infinite-scrolling' && <InfiniteScrolling />}
      </Box>
    </>
  );
};

export default VirtualizedExamples;
