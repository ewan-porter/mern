import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({
    fetchError: false,
    fetchErrorMsg: '',
  });

  const handleLogout = async (event) => {
    console.log('here');

    try {
      const res = await fetch('/api/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const error = await res.json();
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
      }

      navigate(0);
      return;
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg:
          'There was a problem with our server, please try again later',
      });
    }
  };

  return (
    <>
      {' '}
      <Button
        variant="contained"
        size="large"
        onClick={handleLogout}
        sx={{
          minWidth: '70%',
        }}
      >
        Log Out
      </Button>
    </>
  );
};

export default Logout;
