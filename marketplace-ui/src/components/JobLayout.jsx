import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchRecentJobs } from "../api/api";
import JobCard from './JobCard';
import Grid from '@mui/material/Grid';


const getJobs = async (setJobs) => {
  try {
    const recentJobs = await fetchRecentJobs();
    setJobs(recentJobs); // Store the fetched jobs in state
  } catch (error) {
    console.log(error);
  }
}

export default function JobLayout() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs(setJobs); // Fetch jobs when the component mounts
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
}