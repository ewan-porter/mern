import { Box, Tab } from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab';
import React, { useState } from 'react';
import Logout from './Logout';
import ProjectForm from './ProjectForm';
import Projects from './Projects';

const Dashboard = () => {
  const [value, setValue] = useState('1');

  const handleChange = (e, v) => {
    setValue(v);
  }
  return (
    <>
      <h1>Dashboard</h1> 
      <Logout />
      <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabs" centered>
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
           
          </TabList>
        </Box>
        <TabPanel value="1"><ProjectForm/></TabPanel>
        <TabPanel value="2"><Projects/></TabPanel>
    
      </TabContext>
      </Box>
     
  
      
      
    </>
  );
};

export default Dashboard;
