import React from 'react';
import { Button } from '@mui/material';

const Tab = ({ label, active, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: 'transparent',
        color: 'white',
        borderRadius: '8px',
        textTransform: 'none',
        border: active ? '1px solid white' : 'none',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
          backgroundColor: active ? '#6b6b6b' : 'transparent',
        },
      }}
    >
      {label}
    </Button>
  );
}

export default Tab;
