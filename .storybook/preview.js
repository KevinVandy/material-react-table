import { createTheme, ThemeProvider, Typography } from '@mui/material';
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
    <ThemeProvider theme={defaultTheme} r>
      <Typography
        variant="subtitle2"
        style={{
          paddingBottom: '2rem',
          color: useDarkMode() ? '#fff' : '#666',
        }}
      >
        Toggle dark and light mode in the toolbar buttons above
      </Typography>
      <Story {...context} />
      <Typography
        variant="subtitle2"
        style={{ paddingTop: '2rem', color: useDarkMode() ? '#fff' : '#666' }}
      >
        View source code below in the story tab on Canvas or the Show Code
        Button in Docs
      </Typography>
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
