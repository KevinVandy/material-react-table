import { createTheme, darken } from '@mui/material';

export const theme = ({
  isLightTheme,
  primaryColor,
  secondaryColor,
}: {
  isLightTheme: boolean;
  primaryColor?: string;
  secondaryColor: string;
}) =>
  createTheme({
    palette: {
      mode: isLightTheme ? 'light' : 'dark',
      ...(primaryColor ? { primary: { main: primaryColor } } : {}),
      secondary: {
        main: isLightTheme ? darken(secondaryColor, 0.1) : secondaryColor,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.8rem',
        lineHeight: '3rem',
        paddingLeft: '1rem',
      },
      h2: {
        fontSize: '2rem',
        lineHeight: '3.5rem',
        fontWeight: 'bold',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
      },
      h3: {
        fontSize: '1.5rem',
        lineHeight: '3rem',
        marginBottom: '1rem',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: '2rem',
        fontWeight: 'bold',
      },
      h5: {
        fontSize: '1.1rem',
        lineHeight: '3rem',
        fontWeight: 'bold',
      },
      h6: {
        fontSize: '1rem',
        lineHeight: '3rem',
        fontWeight: 'bold',
      },
      subtitle1: {
        marginBottom: '1rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: '2rem',
        marginBottom: '0.5rem',
      },
    },
  });
