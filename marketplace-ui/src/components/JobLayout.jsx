import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchActiveJobs, fetchRecentJobs } from "../api/api";
import JobCard from './JobCard';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';


const getJobs = async (setJobs, jobFiltering) => {
  try {
    const jobs = jobFiltering === 'recent' ? await fetchRecentJobs() : await fetchActiveJobs();
    setJobs(jobs); // Store the fetched jobs in state
  } catch (error) {
    console.log(error);
  }
}

export default function JobLayout() {
  const [jobs, setJobs] = useState([]);
  const [jobFilter, setJobFilter] = useState('recent');

  useEffect(() => {
    getJobs(setJobs, jobFilter); // Fetch jobs when the component mounts or jobType changes
  }, [jobFilter]);

  const handleJobFilterChange = (event, newJobFilter) => {
    if (newJobFilter !== null) {
      setJobFilter(newJobFilter);
    }
  };

  return (
    <>
    <Grid container spacing={2} alignItems="center" style={{ marginBottom: 20 }}>
      <Grid item xs={12} sm={3}></Grid>
      <Grid item xs={12} sm={6} container justifyContent="center">
        <ToggleButtonGroup
          value={jobFilter}
          exclusive
          onChange={handleJobFilterChange}
          aria-label="choose between seeing recent jobs or all active jobs"
        >
          <ToggleButton value="recent" aria-label="recently posted jobs">Recent Jobs</ToggleButton>
          <ToggleButton value="active" aria-label="all active jobs">Active Jobs</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} sm={3} container justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Add New Job
        </Button>
      </Grid>
    </Grid>
    <Grid container spacing={2} justifyContent="center">
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
    </>
  );
}