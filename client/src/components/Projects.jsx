import React, { useState, useEffect, createContext } from 'react';

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/showproject');
        if (!res.ok) return setLoading(false);
        setProjectData(await res.json());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('There was an error fetching projects', error);
        return;
      }
    };
    fetchProjects();
  }, []);

  
  return <>
  {projectData.map((index) => (
    <div><h1>{index.projectName}</h1>
    <h1>{index.projectDescription}</h1></div>
    
  ))}
  </>;
};

export default Projects;
