import { createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addons } from '@storybook/preview-api';
import { Preview } from '@storybook/react';
import { useEffect, useState } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import ThemeProvider from '../src/theme';

const channel = addons.getChannel();

const lightTheme = createTheme({
  palette: { mode: 'light' },
});

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [isDark, setDark] = useState(false);
      const theme = isDark ? darkTheme : lightTheme;

      useEffect(() => {
        const sbRoot = document.getElementsByClassName(
          'sb-show-main',
        )[0] as HTMLElement;
        channel.on(DARK_MODE_EVENT_NAME, setDark);
        if (sbRoot) {
          sbRoot.style.backgroundColor = theme.palette.background.default;
          sbRoot.style.height = '100%';
          sbRoot.style.padding = '0';
        }
        return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
      }, [theme]);

      useEffect(() => {
        if (process.env.NODE_ENV === 'development') return;
        const script = document.createElement('script');
        script.src = 'https://plausible.io/js/script.js';
        script.setAttribute('data-domain', 'material-react-table.dev');
        script.defer = true;

        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);

      return (
        <ThemeProvider mode={isDark ? 'dark' : 'light'}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <Typography
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
              View Source code for these examples in the code tab below or{' '}
              <Link
                href="https://github.com/KevinVandy/material-react-table/tree/v3/packages/material-react-table/stories/features"
                target="_blank"
              >
                here on GitHub.
              </Link>
            </Typography> */}
            <Story {...context} />
          </LocalizationProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
