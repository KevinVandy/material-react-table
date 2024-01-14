import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import ReactQueryExample from '../examples/react-query';
import LazyDetailPanelExample from '../examples/lazy-detail-panel';
import LazySubRowsExample from '../examples/lazy-sub-rows';
import DynamicColumns from '../examples/dynamic-columns';
import RemoteExample from '../examples/remote';
import { useState } from 'react';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const RemoteFetchingExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'react-query',
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
          <Tab label="React Query" value="react-query" />
          <Tab label="useEffect" value="remote" />
          <Tab label="Dynamic Columns" value="dynamic-columns" />
          <Tab label="Lazy Detail Panel" value="lazy-detail-panel" />
          <Tab label="Lazy Sub-Rows" value="lazy-sub-rows" />
          <Tab
            label={
              <Box>
                Infinite Scrolling
                <LaunchIcon sx={{ fontSize: '1rem' }} />
              </Box>
            }
            value="infinite-scrolling"
          />
          <Link href="/docs/examples/editing-crud" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  CRUD Examples
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
        {activeTab === 'react-query' && <ReactQueryExample />}
        {activeTab === 'remote' && <RemoteExample />}
        {activeTab === 'dynamic-columns' && <DynamicColumns />}
        {activeTab === 'lazy-detail-panel' && <LazyDetailPanelExample />}
        {activeTab === 'lazy-sub-rows' && <LazySubRowsExample />}
      </Box>
    </>
  );
};

export default RemoteFetchingExamples;
