import { Box, Container, Paper, TextField, Button } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

const ProjectForm = () => {
  const [values, setValues] = useState({
    projectName: '',
    projectDescription: '',
  });

  const [errors, setErrors] = useState({
    fetchError: false,
    fetchErrorMsg: '',
  });

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/addproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: values.projectName,
          projectDescription: values.projectDescription,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
      }
      const data = await res.json();
      console.log(data);

      setValues({
        projectName: '',
        projectDescription: '',
      });
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
        <Paper elevation={6}>
          <Container
            maxWidth="sm"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}
          >
            <h2>Submit a potential lab project</h2>
          </Container>
          <Stack
            onSubmit={handleSubmit}
            component="form"
            spacing={6}
            sx={{ bgcolor: '#f5f5f6', padding: '40px' }}
          >
            <TextField
              variant="filled"
              type="text"
              label="Project Name"
              value={values.projectName}
              onChange={handleChange('projectName')}
            />
            <TextField
              variant="filled"
              type="text"
              label="Project Description"
              value={values.projectDescription}
              multiline
              rows={6}
              onChange={handleChange('projectDescription')}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  minWidth: '70%',
                }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProjectForm;
