import { React, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Logout from './components/Logout';

import { UserContext } from './App';
import Dashboard from './components/Dashboard';
const RoutesComp = () => {
  const userContext = useContext(UserContext);
  return (
    <Routes>
      {userContext.email && <Route path="/" element={<Dashboard />} />}
      {!userContext.email && (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesComp;
