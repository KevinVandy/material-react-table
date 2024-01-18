import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import ModalExample from '../examples/editing-crud-modal';
import InlineRowExample from '../examples/editing-crud-row';
import InlineCellExample from '../examples/editing-crud-cell';
import InlineTableExample from '../examples/editing-crud-table';
import TreeEditingExample from '../examples/editing-crud-tree';

const EditingCRUDExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'editing-crud',
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
          <Tab label="Modal" value="editing-crud" />
          <Tab label="Inline Row" value="editing-crud-inline-row" />
          <Tab label="Inline Cell" value="editing-crud-inline-cell" />
          <Tab label="Inline Table" value="editing-crud-inline-table" />
          <Tab label="Tree Editing" value="editing-crud-tree" />
          <Link href="/docs/examples/remote" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  Non TanStack Query Fetching
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
        {activeTab === 'editing-crud' && <ModalExample />}
        {activeTab === 'editing-crud-inline-row' && <InlineRowExample />}
        {activeTab === 'editing-crud-inline-cell' && <InlineCellExample />}
        {activeTab === 'editing-crud-inline-table' && <InlineTableExample />}
        {activeTab === 'editing-crud-tree' && <TreeEditingExample />}
      </Box>
    </>
  );
};

export default EditingCRUDExamples;
