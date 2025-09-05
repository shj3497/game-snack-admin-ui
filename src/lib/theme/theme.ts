'use client';

import {createTheme} from '@mui/material';

const fontFamily = ['var(--font-roboto)'].join(', ');

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0046FF',
      50: '#e9eaff',
      100: '#c7c9ff',
      200: '#9fa6ff',
      300: '#7182ff',
      400: '#4964ff',
      500: '#0044ff',
      600: '#003bf3',
      700: '#002ee6',
      800: '#001fdb',
      900: '#0000cc',
    },
    secondary: {
      main: '#00AF68',
      50: '#e5f5ec',
      100: '#c0e6d0',
      200: '#96d6b3',
      300: '#69c795',
      400: '#43bb7f',
      500: '#00af69',
      600: '#00a05f',
      700: '#008e52',
      800: '#007d46',
      900: '#005d31',
    },
    error: {
      main: '#ef3346',
      50: '#ffecf0',
      100: '#ffced7',
      200: '#f29ba3',
      300: '#ea747f',
      400: '#f7515f',
      500: '#fe3c47',
      600: '#ef3346',
      700: '#dc293f',
      800: '#cf2137',
      900: '#c1102b',
    },
    success: {
      main: '#22c55e',
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
  },
  typography: {
    fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        html: {},
        body: {
          margin: 0,
          padding: 0,
        },
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      }),
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9fafb',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
