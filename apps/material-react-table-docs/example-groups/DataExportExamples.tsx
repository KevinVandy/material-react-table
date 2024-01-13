import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';
import CSVExport from '../examples/export-to-csv';
import PDFExport from '../examples/export-to-pdf';
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
          <Tab label="Export to CSV" value="export-csv" />
          <Tab label="Export to PDF" value="export-pdf" />
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
        {activeTab === 'export-csv' && <CSVExport />}
        {activeTab === 'export-pdf' && <PDFExport />}
      </Box>
    </>
  );
};

export default RemoteFetchingExamples;
