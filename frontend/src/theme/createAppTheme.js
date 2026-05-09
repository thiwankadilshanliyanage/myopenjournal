import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#F7C6D9'
      },
      background:
        mode === 'light'
          ? {
              default: '#FFFFFF',
              paper: '#FFFFFF'
            }
          : {
              default: '#121212',
              paper: '#1D1D1D'
            },
      text:
        mode === 'light'
          ? {
              primary: '#111111',
              secondary: '#666666'
            }
          : {
              primary: '#F5F5F5',
              secondary: '#BDBDBD'
            }
    },
    shape: {
      borderRadius: 18
    },
    typography: {
      fontFamily:
        '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", "Segoe UI", sans-serif',
      h1: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.2 },
      h2: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.25 },
      h3: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3 },
      body1: { lineHeight: 1.85 },
      body2: { lineHeight: 1.7 }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: mode === 'light'
              ? '0 12px 30px rgba(17,17,17,0.06)'
              : '0 10px 24px rgba(0,0,0,0.35)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 600
          }
        }
      }
    }
  });
