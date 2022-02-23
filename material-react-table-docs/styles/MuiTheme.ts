import { createTheme } from '@mui/material';

export const theme = (darkTheme: boolean) =>
  createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
      secondary: {
        main: 'rgb(255,65,84)',
      },
    },
    typography: {
      h1: {
        fontSize: '2rem',
        lineHeight: '3rem',
        paddingLeft: '1.5rem',
      },
      h2: {
        fontSize: '2.5rem',
        lineHeight: '5rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.25rem',
        lineHeight: '2rem',
        marginBottom: '1rem',
      },
      h4: {
        fontSize: '1.75rem',
        lineHeight: '3rem',
      },
      h5: {
        fontSize: '1.5rem',
        lineHeight: '3rem',
      },
      h6: {
        fontSize: '1.25rem',
        lineHeight: '3rem',
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
