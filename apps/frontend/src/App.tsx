import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { MainLayout } from './components/layout/main-layout';
import { PortfolioOverview } from './components/sections/portfolio-overview';
import { AuthPage } from './components/sections/auth-page';
import { Route, Routes } from 'react-router-dom';
import { StockDetails } from './components/sections/stock-details';

const modernTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    primary: {
      main: '#64748b',
    },
    secondary: {
      main: '#ef4444',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'lowercase',
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow:
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <Routes>
        <Route path="auth" element={<AuthPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PortfolioOverview />} />
          <Route path="stock/:symbol" element={<StockDetails />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
