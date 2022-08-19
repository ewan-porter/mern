import React from 'react';
import Logout from './Logout';
import ProjectForm from './ProjectForm';
import Projects from './Projects';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Logout />
      <ProjectForm/>
      <Projects/>
    </>
  );
};

export default Dashboard;
