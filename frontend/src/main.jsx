import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { createAppTheme } from './theme/createAppTheme';

function Root() {
  const { mode } = useThemeMode();
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <Root />
    </ThemeModeProvider>
  </React.StrictMode>
);
