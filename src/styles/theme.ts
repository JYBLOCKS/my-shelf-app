import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#8f8f8f',
    },
    secondary: {
      main: '#71e7e7',
    },
    warning: {
      main: '#f8da64',
    },
    info: {
      main: '#345a83',
    },
    error: {
      main: '#e07266',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#8f8f8f',
    },
    secondary: {
      main: '#71e7e7',
    },
    warning: {
      main: '#f8da64',
    },
    info: {
      main: '#345a83',
    },
    error: {
      main: '#e07266',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export { darkTheme, lightTheme };

