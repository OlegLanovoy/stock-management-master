import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Container, Snackbar, Alert } from '@mui/material';
import { LoginForm } from '../forms/login-form';
import { RegisterForm } from '../forms/register-form';
import {
  ILoginDto,
  IRegisterDto,
  login,
  register,
  getMe,
} from '../../services/auth.service';

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getMe()
      .then((user) => {
        if (user) navigate('/');
      })
      .catch(() => {});
  }, [navigate]);

  const handleLogin = async (data: ILoginDto) => {
    setIsLoading(true);
    try {
      const success = await login(data);
      if (success) navigate('/');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: IRegisterDto) => {
    setIsLoading(true);
    try {
      const success = await register(data);
      if (success) navigate('/');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Registration failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        className="min-h-screen w-full bg-white flex items-center justify-center"
      >
        <Paper
          elevation={10}
          sx={{
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            backgroundImage: 'none',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          }}
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'login'
                ? 'Welcome to StockPortfolio'
                : 'Join StockPortfolio'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login'
                ? 'Sign in to access your stock portfolio'
                : 'Create an account to start tracking your investments'}
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            {mode === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                onSwitchToRegister={() => setMode('register')}
                isLoading={isLoading}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                onSwitchToLogin={() => setMode('login')}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </Paper>
      </Container>

      {/* Snackbar error */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
