import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchActiveJobs, fetchRecentJobs } from "../api/api";
import JobCard from './JobCard';
import JobForm from './JobForm';
import { Button, Grid, Drawer, ToggleButton, ToggleButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
  const [open, setOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  useEffect(() => {
    getJobs(setJobs, jobFilter); // Fetch jobs when the component mounts or jobType changes
  }, [jobFilter]);

  const handleJobFilterChange = (event, newJobFilter) => {
    if (newJobFilter !== null) {
      setJobFilter(newJobFilter);
    }
  };

  const toggleDrawer = (isOpen) => () => {
    if (isFormDirty && !isOpen) {
      setOpenWarning(true);
    } else {
      setOpen(isOpen);
    }
  };

  const handleSave = (newJob) => {
    // TODO: Transform to API call and cause refresh of UI
    setJobs((prevJobs) => [...prevJobs, newJob]);
    setOpen(false);
    setIsFormDirty(false);
  };

  const handleWarningClose = (shouldClose) => {
    setOpenWarning(false);
    if (shouldClose) {
      setOpen(false);
      setIsFormDirty(false);
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
        <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
          Add New Job
        </Button>
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
          <JobForm
            onSave={handleSave}
            onCancel={toggleDrawer(false)}
            setIsFormDirty={setIsFormDirty}
          />
        </Drawer>
      </Grid>
    </Grid>
    <Grid container spacing={2} justifyContent="center">
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>

    <Dialog
      open={openWarning}
      onClose={() => handleWarningClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Discard changes?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have unsaved changes. Are you sure you want to discard them and close the drawer?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleWarningClose(false)} color="primary">
          No
        </Button>
        <Button onClick={() => handleWarningClose(true)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}