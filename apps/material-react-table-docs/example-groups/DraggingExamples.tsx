import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import ColumnOrdering from '../examples/enable-column-ordering';
import RowOrdering from '../examples/enable-row-ordering';
import RowDragging from '../examples/enable-row-dragging';
import { useState } from 'react';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const RemoteFetchingExamples = ({ isPage = false }) => {
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
          <Tab label="Column Ordering" value="column-ordering" />
          <Tab label="Row Ordering" value="row-ordering" />
          <Tab label="Row Dragging" value="row-dragging" />
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
        {activeTab === 'column-ordering' && <ColumnOrdering />}
        {activeTab === 'row-ordering' && <RowOrdering />}
        {activeTab === 'row-dragging' && <RowDragging />}
      </Box>
    </>
  );
};

export default RemoteFetchingExamples;
