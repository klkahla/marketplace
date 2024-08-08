import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchActiveJobs, fetchRecentJobs, createJob } from "../api/api";
import JobCard from './JobCard';
import JobForm from './JobForm';
import { 
  Button, 
  Grid, 
  Drawer, 
  ToggleButton, 
  ToggleButtonGroup, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  CircularProgress 
} from '@mui/material';
import { delayHideSpinner } from '../utils/utils';

const getJobs = async (setJobs, jobFiltering, setLoading) => {
  setLoading(true);
  try {
    const jobs = jobFiltering === 'recent' ? await fetchRecentJobs() : await fetchActiveJobs();
    setJobs(jobs); // Store the fetched jobs in state
  } catch (error) {
    console.log(error);
  } finally {
    delayHideSpinner(() => setLoading(false));
  }
}

const LoadingView = () => (
  <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
      <CircularProgress />
  </Grid>
);

const JobView = ( {jobs} ) => (
<Grid container spacing={2} justifyContent="center" style={{paddingLeft: 16, paddingRight: 16}}>
  {jobs.map((job) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
      <JobCard job={job} />
    </Grid>
  ))}
</Grid>
);

export default function JobLayout() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobFilter, setJobFilter] = useState('recent');
  const [open, setOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  useEffect(() => {
    getJobs(setJobs, jobFilter, setLoading); // Fetch jobs when the component mounts or jobType changes
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

  const handleSave = async (newJob) => {
    setLoading(true);
    try {
      console.log("newJob: ", newJob);
      await createJob(newJob);
      await getJobs(setJobs, jobFilter, setLoading);
      setOpen(false);
      setIsFormDirty(false);
    } catch (error) {
      console.error("Error saving job: ", error);
    } finally {
      delayHideSpinner(() => setLoading(false));
    }
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
    <Grid container spacing={2} alignItems="center" style={{ marginBottom: 20, padding: 16 }}>
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
    {loading ?
      <LoadingView /> : <JobView jobs={jobs} />
    }

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