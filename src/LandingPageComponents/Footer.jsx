import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? '#555' : theme.palette.grey[700], // Slightly paler background
                color: 'white',
                py: 3, // Vertical padding
                mt: 'auto', // Push footer to bottom if content is short
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    {/* Copyright */}
                    <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2" align="center" sx={{ mb: { xs: 2, sm: 0 } }}>
                            &copy; {new Date().getFullYear()} The Sukoon Space
                        </Typography>
                    </Grid>

                    {/* Navigation Links */}
                    <Grid item xs={12} sm={4} md={6} sx={{ textAlign: 'center' }}>
                        <Link href="#" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            About Us
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Contact Us
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Sign Up as a Teacher
                        </Link>
                    </Grid>

                    {/* Social Media Links */}
                    <Grid item xs={12} sm={4} md={3} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        <Link href="#" color="inherit" sx={{ mx: 1, '&:hover': { color: 'grey.400' } }}>
                            {/* Placeholder for Facebook Icon */} FB
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1, '&:hover': { color: 'grey.400' } }}>
                            {/* Placeholder for Twitter Icon */} TW
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1, '&:hover': { color: 'grey.400' } }}>
                            {/* Placeholder for Instagram Icon */} IG
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
