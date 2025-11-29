import { createTheme } from '@mui/material/styles';

const adminTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0077',
      light: '#ff3399',
      dark: '#d60065',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7700ff',
      light: '#9933ff',
      dark: '#5500cc',
      contrastText: '#fff',
    },
    background: {
      default: '#0f0f0f',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    error: {
      main: '#ff3b30',
    },
    success: {
      main: '#4caf50',
    },
    divider: '#2a2a2a',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 0, 119, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ff0077, #7700ff)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ff3399, #9933ff)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a1a1a',
          border: '2px solid #2a2a2a',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(255, 0, 119, 0.3)',
            boxShadow: '0 8px 24px rgba(255, 0, 119, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          borderRight: '2px solid #2a2a2a',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#0f0f0f',
        },
      },
    },
  },
});

export default adminTheme;
