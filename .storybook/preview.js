import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { withPerformance } from 'storybook-addon-performance';
import { setConsoleOptions } from '@storybook/addon-console';
import { withConsole } from '@storybook/addon-console';
import { Typography } from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';

setConsoleOptions({
  panelExclude: [],
});

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
  paddings: {
    values: [
      { name: 'Small', value: '4px' },
      { name: 'Medium', value: '16px' },
      { name: 'Large', value: '64px' },
    ],
    default: 'Medium',
  },
  status: {
    statuses: {
      alpha: {
        background: 'red',
        color: '#ffffff',
        description: 'This feature has some functionality but is not complete',
      },
      beta: {
        background: 'orange',
        color: '#ffffff',
        description: 'This feature is getting close to stable',
      },
      stable: {
        background: 'green',
        color: '#ffffff',
        description: 'Should fully work',
      },
    },
  },
};

const withThemeProvider = (Story, context) => {
  const defaultTheme = createTheme({
    palette: { mode: useDarkMode() ? 'dark' : 'light' },
  });

  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Typography
          variant="subtitle2"
          style={{
            paddingBottom: '2rem',
            color: useDarkMode() ? '#aaa' : '#666',
          }}
        >
          Toggle Dark and Light Mode in the toolbar buttons above
        </Typography>
        <Story {...context} />
        <Typography
          variant="subtitle2"
          style={{ paddingTop: '2rem', color: useDarkMode() ? '#aaa' : '#666' }}
        >
          View Source Code Below in the Story Tab on Canvas or the Show Code
          Button in Docs
        </Typography>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
