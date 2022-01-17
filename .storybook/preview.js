import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { withPerformance } from 'storybook-addon-performance';
import { setConsoleOptions } from '@storybook/addon-console';
import { withConsole } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: [],
});

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
};

const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
