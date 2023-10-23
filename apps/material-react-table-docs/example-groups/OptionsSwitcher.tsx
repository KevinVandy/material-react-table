import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';

const OptionsSwitcher = () => {
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
          <Tab label={<Box>Table Options</Box>} value="table-options" />
          <Tab label={<Box>Column Options</Box>} value="column-options" />
          <Tab label={<Box>State Options</Box>} value="state-options" />
        </Tabs>
      </Box>
    </>
  );
};

export default OptionsSwitcher;
