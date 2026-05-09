import { createContext, useContext, useMemo, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    severity: 'success',
    message: ''
  });

  const showSnackbar = (message, severity = 'success') => {
    setState({
      open: true,
      message,
      severity
    });
  };

  const value = useMemo(() => ({ showSnackbar }), []);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={3000}
        onClose={() => setState((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={state.severity}
          variant="filled"
          onClose={() => setState((prev) => ({ ...prev, open: false }))}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => useContext(SnackbarContext);
