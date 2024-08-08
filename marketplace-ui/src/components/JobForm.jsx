import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Grid, TextField, Button, FormHelperText } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function JobForm({ onSave, onCancel, setIsFormDirty }) {
  const [formState, setFormState] = useState({ 
    description: '', 
    requirements: '', 
    jobDateTime: dayjs(), 
    createdAt: '' 
  });
  const [errors, setErrors] = useState({ 
    description: '', 
    requirements: '', 
    jobDateTime: '' 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setIsFormDirty(true);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error on change
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({ 
      ...prevState, 
      jobDateTime: date 
    }));
    setIsFormDirty(true);
    setErrors((prevErrors) => ({ ...prevErrors, jobDateTime: '' })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.description) newErrors.description = 'Description is required';
    if (!formState.requirements) newErrors.requirements = 'Requirements are required';
    if (!formState.jobDateTime || !formState.jobDateTime.isValid()) newErrors.jobDateTime = 'Date and time are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = () => {
    if (validateForm()) {
        const formattedJob = {
            ...formState,
            jobDateTime: formState.jobDateTime.format('YYYY-MM-DDTHH:mm:ss'), // Format to match backend expectation
            createdAt: new Date().toISOString().replace('Z', '') // Remove 'Z' for LocalDateTime
        };
        onSave(formattedJob);
    }
  };

  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Requirements"
            name="requirements"
            multiline
            value={formState.requirements}
            onChange={handleInputChange}
            fullWidth
            rows={4}
            error={!!errors.requirements}
            helperText={errors.requirements}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date and Time"
              name="jobDateTime"
              value={formState.jobDateTime}
              onChange={handleDateChange}
              renderInput={(params) => (
                <>
                  <TextField {...params} error={!!errors.jobDateTime} />
                  {errors.jobDateTime && <FormHelperText error>{errors.jobDateTime}</FormHelperText>}
                </>
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
