import { React, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';

import { UserContext } from './App';

const RoutesComp = () => {
  const userContext = useContext(UserContext);
  return (
    <Routes>
      {userContext.email && (
        <Route path="/" element={<>Welcome{userContext.email}</>} />
      )}
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
