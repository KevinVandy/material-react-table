import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import EnableColumnGroupingExample from '../examples/enable-column-grouping';
import CustomizeRemoveColumnGroupingExample from '../examples/customize-remove-column-grouping';
import AggregationAndGroupingExample from '../examples/aggregation-and-grouping';
import DetailExample from '../examples/enable-detail-panel-conditionally';
import ChartDetailPanelExample from '../examples/chart-detail-panel';
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
          <Tab label="Expanding Tree" value="expanding-tree" />
          <Tab label="Parsed Tree" value="expanding-tree-flat-parse" />
          <Link href="/docs/examples/lazy-sub-rows" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Lazy Sub-Rows
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Tab label="Column Grouping" value="column-grouping" />
          <Tab label="Customized Grouping" value="customized-grouping" />
          <Tab label="Aggregation" value="aggregation-and-grouping" />
          <Tab label="Detail Panel" value="detail-panel" />
          <Tab label="Chart Detail Panel" value="chart-detail-panel" />
          <Link href="/docs/examples/lazy-detail-panel" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Lazy Detail Panel
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
          <Link href="/docs/examples/editing-crud-tree" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Editing Sub-Rows
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
        {activeTab === 'expanding-tree' && <ExpandingTreeExample />}
        {activeTab === 'expanding-tree-flat-parse' && (
          <ExpandingParsedTreeExample />
        )}
        {activeTab === 'detail-panel' && <DetailExample />}
        {activeTab === 'chart-detail-panel' && <ChartDetailPanelExample />}
        {activeTab === 'column-grouping' && <EnableColumnGroupingExample />}
        {activeTab === 'customized-grouping' && (
          <CustomizeRemoveColumnGroupingExample />
        )}
        {activeTab === 'aggregation-and-grouping' && (
          <AggregationAndGroupingExample />
        )}
      </Box>
    </>
  );
};

export default ExpandingExamples;
