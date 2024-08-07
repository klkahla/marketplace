import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { format } from 'date-fns';

export default function JobCard( {job} ) {
    const formatDate = (dateString, showTime) => {
        const formatString = showTime ? 'EEE, MMMM do, yyyy @ h:mma' : 'MM/dd/yyyy'
        const date = new Date(dateString);
        return format(date, formatString);
    };

    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {job.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Requirements: {job.requirements}
                </Typography>
                <Typography variant="body2">
                Job Date: {formatDate(job.jobDateTime, true)}
                </Typography>
                <Typography variant="body2">
                Created: {formatDate(job.createdAt, false)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}