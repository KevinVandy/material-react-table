import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';

const InstanceAPIsSwitcher = () => {
  const { pathname, push } = useRouter();

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          scrollButtons="auto"
          variant="scrollable"
          value={pathname.split('/').pop()}
          onChange={(_e, newPath) => push(newPath as string)}
        >
          <Tab
            label={<Box>Table Instance APIs</Box>}
            value="table-instance-apis"
          />
          <Tab
            label={<Box>Column Instance APIs</Box>}
            value="column-instance-apis"
          />
          <Tab label={<Box>Row Instance APIs</Box>} value="row-instance-apis" />
          <Tab
            label={<Box>Cell Instance APIs</Box>}
            value="cell-instance-apis"
          />
        </Tabs>
      </Box>
    </>
  );
};

export default InstanceAPIsSwitcher;
