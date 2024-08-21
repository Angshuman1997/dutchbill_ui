import React from 'react';
import { Button } from '@mui/material';

const Tab = ({ label, active, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: active ? 'white' : 'transparent',
        color: active ? 'black' : 'white',
        borderRadius: '8px',
        textTransform: 'none',
        border: active ? '1px solid black' : 'none',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
          backgroundColor: active ? '#e0e0e0' : 'transparent',
        },
      }}
    >
      {label}
    </Button>
  );
}

export default Tab;
