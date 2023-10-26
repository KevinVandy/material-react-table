import { useRouter } from 'next/router';
import { Box, Tab, Tabs } from '@mui/material';

interface Props {
  links: {
    value: string;
    label: string;
  }[];
}

const OptionsSwitcher = ({ links }: Props) => {
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
          {links.map(({ value, label }) => (
            <Tab key={value} label={<Box>{label}</Box>} value={value} />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default OptionsSwitcher;
