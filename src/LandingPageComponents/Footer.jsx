import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    Grid,
    Stack,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.mode === 'light' ? '#555' : theme.palette.grey[600],
                color: 'white',
                py: 3,
                px: 2,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={isSmallScreen ? 2 : 3}
                    justifyContent="center"
                    alignItems="center"
                    direction={isSmallScreen ? 'column' : 'row'}
                    textAlign="center"
                >
                    {/* Column 1: Copyright */}
                    <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2">
                            &copy; {new Date().getFullYear()} The Sukoon Space
                        </Typography>
                    </Grid>

                    {/* Column 2: Navigation Links */}
                    <Grid item xs={12} sm={4} md={6}>
                        <Stack
                            direction={isSmallScreen ? 'column' : 'row'}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Link href="#" color="inherit" underline="hover">
                                About Us
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Contact Us
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Column 3: Social Icons */}
                    <Grid item xs={12} sm={4} md={3}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton
                                component="a"
                                href="https://www.facebook.com/yourpage"
                                target="_blank"
                                rel="noopener"
                                sx={{ color: 'inherit' }}
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="https://twitter.com/yourhandle"
                                target="_blank"
                                rel="noopener"
                                sx={{ color: 'inherit' }}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="https://www.instagram.com/yourprofile"
                                target="_blank"
                                rel="noopener"
                                sx={{ color: 'inherit' }}
                            >
                                <InstagramIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
