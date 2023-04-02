import { createTheme, Link, ThemeProvider, Typography } from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  backgrounds: {
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'lightgrey',
        value: '#fafeff',
      },
      {
        name: 'darkgrey',
        value: '#333',
      },
      {
        name: 'black',
        value: '#000',
      },
    ],
  },
  controls: { expanded: true, sort: 'requiredFirst' },
};

const withThemeProvider = (Story, context) => {
  const defaultTheme = createTheme({
    palette: { mode: useDarkMode() ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography
        sx={{
          pb: '0.5rem',
          color: useDarkMode() ? '#fff' : '#666',
        }}
        variant="subtitle2"
      >
        Looking for the main docs site? Click{' '}
        <Link
          href="https://www.material-react-table.com"
          target="_blank"
          rel="noopener"
        >
          here.
        </Link>
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          pb: '1rem',
          color: useDarkMode() ? '#fff' : '#666',
        }}
      >
        View Source code for these examples (until storybook bugs get fixed){' '}
        <Link
          href="https://github.com/KevinVandy/material-react-table/tree/main/apps/material-react-table-storybook/stories/features"
          target="_blank"
        >
          here
        </Link>
      </Typography>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
