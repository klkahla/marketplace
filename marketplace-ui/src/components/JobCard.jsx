import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function JobCard( {job} ) {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {job.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {job.description}
                </Typography>
                <Typography variant="body2">
                Steps: {job.requirements}
                </Typography>
                <Typography variant="body2">
                Date: {job.createdAt}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}