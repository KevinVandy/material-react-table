import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
// import { muiTheme } from 'storybook-addon-material-ui';

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

export const decorators = [withThemeProvider];
