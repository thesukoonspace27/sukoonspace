import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Chip,
    Box,
    Stack
} from '@mui/material';

const YogaCourseCard = ({ course }) => {
    return (
        <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            },
            borderRadius: '12px'
        }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    By {course.instructor}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Typography variant="body2">
                        ⏰ {course.time}
                    </Typography>
                    <Typography variant="body2">
                        ⏳ {course.duration}
                    </Typography>
                    <Typography variant="body2">
                        🕒 {course.classTime}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {course.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" color="secondary" />
                    ))}
                </Stack>
                <Typography variant="h6" color="primary" gutterBottom>
                    ₹{course.price}
                </Typography>
            </CardContent>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    sx={{ 
                        width: 200,
                        height: 200,
                        objectFit: 'cover'
                    }}
                    image={course.image}
                    alt={course.name}
                />
                <Button 
                    variant="contained"
                    sx={{ 
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        backgroundImage: 'linear-gradient(to right, primary.main, #1976d2)',
                        '&:hover': {
                            backgroundImage: 'linear-gradient(to right, primary.dark, #1565c0)'
                        }
                    }}
                >
                    Join
                </Button>
            </Box>
        </Card>
    );
};

export default YogaCourseCard;
