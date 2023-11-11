import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import AggregationAndGroupingExample from '../examples/aggregation-and-grouping';
import DetailExample from '../examples/enable-detail-panel';
import ExpandingTreeExample from '../examples/expanding-tree-expanded';
import ExpandingParsedTreeExample from '../examples/expanding-tree-flat-parse';
import { useState } from 'react';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const ExpandingExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'detail-panel',
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(_e, newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
        >
          <Tab
            label="Aggregation and Grouping"
            value="aggregation-and-grouping"
          />
          <Tab label="Detail Panel" value="detail-panel" />
          <Tab label="Expanding Tree" value="expanding-tree" />
          <Tab
            label="Expanding Parsed Tree"
            value="expanding-tree-flat-parse"
          />
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
        {activeTab === 'aggregation-and-grouping' && (
          <AggregationAndGroupingExample />
        )}
        {activeTab === 'detail-panel' && <DetailExample />}
        {activeTab === 'expanding-tree' && <ExpandingTreeExample />}
        {activeTab === 'expanding-tree-flat-parse' && (
          <ExpandingParsedTreeExample />
        )}
      </Box>
    </>
  );
};

export default ExpandingExamples;
