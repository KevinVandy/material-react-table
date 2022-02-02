import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { withPerformance } from 'storybook-addon-performance';
import { setConsoleOptions } from '@storybook/addon-console';
import { withConsole } from '@storybook/addon-console';
import { Typography } from '@mui/material';

setConsoleOptions({
  panelExclude: [],
});

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  darkMode: {
    current: 'light',
  },
};

const defaultTheme = createTheme();

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
        <Typography variant="subtitle2" style={{ paddingTop: '2rem' }}>
          View Source Code Below in the Story Tab on Canvas or the Show Code
          Button in Docs
        </Typography>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
