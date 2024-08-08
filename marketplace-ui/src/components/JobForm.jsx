import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Grid, TextField, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function JobForm({ onSave, onCancel, setIsFormDirty }) {
  const [formState, setFormState] = useState({ description: '', requirements: '', jobDateTime: dayjs(), createdAt: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setIsFormDirty(true);
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({ 
      ...prevState, 
      jobDateTime: date 
    }));
    setIsFormDirty(true);
  };

  const handleSave = () => {
    onSave({ ...formState, createdAt: new Date().toISOString() });
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
          />
        </Grid>
        <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date and Time"
                    name="jobDateTime"
                    value={formState.jobDateTime}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
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
