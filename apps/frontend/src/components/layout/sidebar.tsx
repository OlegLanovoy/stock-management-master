'use client';

import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { axiosInstance } from '../../services';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();

  const logout = async (): Promise<boolean> => {
    try {
      console.log('lalalalala');
      navigate('/auth');
      await axiosInstance.post('/auth/logout'); // или get, если у тебя так
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio</h2>
        <div className="space-y-3">
          <Button
            variant="contained"
            fullWidth
            className="!bg-slate-600 hover:!bg-slate-700 !text-white !normal-case !py-3 !rounded-lg !shadow-sm"
            // onClick={() => onNavigate("portfolio")
          >
            Your Stocks
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className="!border-gray-300 !text-gray-700 hover:!bg-gray-50 !normal-case !py-3 !rounded-lg"
          >
            Watchlist
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className="!border-gray-300 !text-gray-700 hover:!bg-gray-50 !normal-case !py-3 !rounded-lg"
          >
            Analytics
          </Button>
        </div>
      </div>

      <div className="mt-auto p-6">
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Logout />}
          onClick={() => logout()}
          sx={{
            borderColor: '#ef4444',
            color: '#ef4444',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#fef2f2',
              borderColor: '#dc2626',
              color: '#dc2626',
            },
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
