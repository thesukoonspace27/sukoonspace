import React, { useState } from 'react'; // Added useState
import { useNavigate } from 'react-router-dom';
// import FeatureCard from './FeatureCard'; // Removed as MUI Card is used directly
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Paper,
    Button, // Added Button
    keyframes // Added keyframes for animation
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
// Removed AddCircleOutlineIcon as it's replaced by Button
import SpaIcon from '@mui/icons-material/Spa';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PsychologyIcon from '@mui/icons-material/Psychology'; // Example Icon for Tarot
import YogaCourseCard from '../LandingPageComponents/YogaCourseCard';

// Define a theme suitable for Yoga/Tarot (calm, spiritual, intuitive)
// Define a theme based on user-provided palette
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9B72AA', // Mystic Lavender
            dark: '#7A598A', // Darker shade for hover (approximated)
        },
        secondary: {
            main: '#A8B5A2', // Sage Green
            dark: '#8A9A84', // Darker shade for hover (approximated)
        },
        background: {
            default: '#F5F0E6', // Lighter Pale Beige
            paper: '#FFFFFF', // White cards for contrast
        },
        text: {
            primary: '#333333', // Standard Dark Grey
            secondary: '#555555', // Standard Medium Grey
        },
        // Add other provided colors if needed for specific elements later
        accent: {
            duskyRose: '#D9A5B3',
            warmSand: '#D4B996',
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Keep Roboto
        h1: {
            fontSize: '2.8rem',
            fontWeight: 500,
            color: '#ffffff', // White text on hero
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)', // Even softer shadow
        },
        h5: {
            fontWeight: 500,
            color: '#333333', // Standard Dark Grey for card titles
        },
        body1: {
            color: '#555555', // Standard Medium Grey for body text
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                    borderRadius: '12px', // Softer corners
                },
            },
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                    color: '#9B72AA', // Mystic Lavender for icons
                    fontSize: '3rem',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    textAlign: 'center',
                },
            },
        },
    },
});

// Sample curated mixes data (replace with actual data loading if needed)
const curatedMixesData = [
    { id: 'sleep', name: 'Sleep', img: 'static/img/sleep.jpg' },
    { id: 'relaxation', name: 'Relaxation', img: 'static/img/relaxation.jpg' },
    { id: 'focus', name: 'Focus', img: 'static/img/focus.jpg' },
    { id: 'meditation', name: 'Meditation', img: 'static/img/meditation.jpg' },
    { id: 'creativity', name: 'Creativity', img: 'static/img/creativity.jpg' },
];

// Define animation keyframes (adjusted for new palette - using Sage Green)
const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 181, 162, 0.7); } /* Sage Green base */
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(168, 181, 162, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 181, 162, 0); }
`;


const LandingPage = () => {
    const navigate = useNavigate();
    const [playingMixId, setPlayingMixId] = useState(null); // State to track playing mix

    const handleFeatureClick = (feature) => {
       
        if (feature === 'Vibrations') {
            navigate('/vibrations');
        }
        // Add navigation for other features when ready
    };

    const handlePlayPauseMix = (mixId) => {
        // NOTE: This only toggles the icon state. Actual audio playback is not implemented here.
        setPlayingMixId(currentPlayingId => (currentPlayingId === mixId ? null : mixId));
        //console.log(`Play/Pause toggled for mix: ${mixId}. Currently playing: ${playingMixId === mixId ? 'None' : mixId}`);
        // Add actual audio play/pause logic here if feasible later
    };

    const handleExploreMore = () => {
        navigate('/vibrations');
    };


    const features = [
        {
            title: 'Vibrations',
            description: 'Calming soundscapes, Personalized for you',
            icon: <SpaIcon fontSize="inherit" />,
            onClick: () => handleFeatureClick('Vibrations'),
            comingSoon: false,
        },
        {
            title: 'Yoga',
            description: 'Book Yoga Sessions with top instructors.',
            icon: <SelfImprovementIcon fontSize="inherit" />,
            onClick: () => {}, // No action yet
            comingSoon: true,
        },
        {
            title: 'Tarot Card',
            description: 'Book Tarot Card Sessions with top readers.',
            icon: <PsychologyIcon fontSize="inherit" />,
            onClick: () => {}, // No action yet
            comingSoon: true,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Ensures consistent baseline styles */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        height: '50vh', // Increased height
                        width: '100%',
                        backgroundImage: 'url(static/img/bg.webp)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::before': { // Overlay for text readability
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker overlay
                        },
                    }}
                >
                    <Typography variant="h1" sx={{ position: 'relative', zIndex: 1, fontWeight: 'bold' }}> {/* Added fontWeight */}
                        Welcome to The Sukoon Space
                    </Typography>
                </Box>

                {/* Features Section */}
                <Container maxWidth="lg" sx={{ py: 6, mt: -10, position: 'relative', zIndex: 2 }}>
                    {/* Negative margin to overlap hero */}
                    <Grid container spacing={4} justifyContent="center">
                        {features.map((feature) => (
                            <Grid item xs={12} sm={6} md={4} key={feature.title}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardActionArea
                                        onClick={feature.onClick}
                                        disabled={feature.comingSoon}
                                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative' }} // Added position: relative
                                    >
                                        {/* Conditionally render Free button for Vibrations card */}
                                        {feature.title === 'Vibrations' && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    fontSize: '0.7rem',
                                                    padding: '2px 6px',
                                                    minWidth: 'auto',
                                                    animation: `${pulseAnimation} 2s infinite`,
                                                    backgroundColor: theme.palette.secondary.main, // Sage Green
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.secondary.dark, // Darker Sage Green
                                                    }
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent CardActionArea click
                                                    handleFeatureClick('Vibrations'); // Still navigate if button is clicked
                                                }}
                                            >
                                                Free
                                            </Button>
                                        )}
                                        <CardMedia sx={{ pt: 3, pb: 1 }}> {/* Adjusted padding */}
                                            {feature.icon}
                                        </CardMedia>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {feature.description}
                                                {feature.comingSoon && (
                                                    <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic' }}>
                                                        (Coming Soon)
                                                    </Typography>
                                                )}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Yoga Courses Section */}
                <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                            Explore Yoga Courses
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                animation: `${pulseAnimation} 2s infinite`,
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                }
                            }}
                        >
                            Show All
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: 2,
                            pb: 2,
                            '&::-webkit-scrollbar': { height: 8 },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.light, borderRadius: 4 },
                        }}
                    >
                        {[
                            {
                                name: 'Morning Flow Yoga',
                                image: 'static/img/bg.webp',
                                instructor: 'Dimple Poptani',
                                time: '6AM',
                                duration: '2 weeks',
                                classTime: '60 mins',
                                price: '2999',
                                tags: ['Trending', 'Beginner Friendly']
                            },
                            {
                                name: 'Power Yoga',
                                image: 'static/img/bg2.webp',
                                instructor: 'Rahul Verma',
                                time: '7AM',
                                duration: '1 month',
                                classTime: '75 mins',
                                price: '3999',
                                tags: ['Popular', 'Advanced']
                            },
                            {
                                name: 'Yin Yoga',
                                image: 'static/img/bg.webp',
                                instructor: 'Ananya Patel',
                                time: '5PM',
                                duration: '1 week',
                                classTime: '45 mins',
                                price: '1999',
                                tags: ['On a discount', 'Relaxing']
                            }
                        ].map((course, index) => (
                            <Box key={index} sx={{ minWidth: 300 }}>
                                <YogaCourseCard course={course} />
                            </Box>
                        ))}
                    </Box>
                </Container>

                {/* Curated Vibrations Section */}
                <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}> {/* Added fontWeight and corrected text */}
                            Curated Vibrations
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleExploreMore}
                            sx={{
                                animation: `${pulseAnimation} 2s infinite`,
                                backgroundColor: theme.palette.primary.main, // Mystic Lavender
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark, // Darker Mystic Lavender
                                }
                            }}
                        >
                            Explore More (Free)
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: 2,
                            pb: 2, // Padding at bottom for scrollbar space
                            '&::-webkit-scrollbar': { height: 8 },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.light, borderRadius: 4 },
                        }}
                    >
                        {curatedMixesData.map((mix) => (
                            <Paper
                                key={mix.id}
                                elevation={2}
                                sx={{
                                    minWidth: 160, // Card width
                                    p: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    backgroundColor: theme.palette.background.paper,
                                    overflow: 'hidden'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={mix.img}
                                    alt={mix.name}
                                    sx={{ 
                                        width: '100%',
                                        height: 100,
                                        objectFit: 'cover'
                                    }}
                                />
                                <Box sx={{ p: 2, width: '100%' }}>
                                    <Typography variant="body2" sx={{ flexGrow: 1, mb: 1, fontWeight: 'medium', color: theme.palette.text.primary }}>
                                        {mix.name}
                                    </Typography>
                                    <IconButton 
                                        onClick={() => handlePlayPauseMix(mix.id)} 
                                        size="small" 
                                        sx={{ 
                                            color: theme.palette.primary.main,
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.9)'
                                            }
                                        }}
                                    >
                                        {playingMixId === mix.id ? <PauseIcon /> : <PlayArrowIcon />}
                                    </IconButton>
                                </Box>
                            </Paper>
                        ))}
                        {/* Explore More Card Removed */}
                    </Box>
                </Container>

                {/* WhatsApp Contact Section */}
                <Container maxWidth="md" sx={{ py: 4, mt: 4, textAlign: 'center' }}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ color: theme.palette.text.primary, mb: 3 }}>
                        Connect With Us
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                        Have questions or need assistance? Chat with us on WhatsApp!
                    </Typography>
                    <Button
                        variant="contained"
                        href="https://wa.me/919538729110"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            backgroundColor: '#25D366', // WhatsApp green
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#128C7E', // Darker WhatsApp green
                            },
                            px: 4,
                            py: 2,
                            fontSize: '1.1rem',
                            borderRadius: '8px'
                        }}
                        startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 24, height: 24 }} />}
                    >
                        Chat on WhatsApp
                    </Button>
                </Container>

                {/* SEO Content Section (Renamed Title) */}
                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: theme.palette.text.primary, mb: 3 }}>
                        Discover Our Features
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}> {/* Mystic Lavender */}
                                Calming Soundscapes (Vibrations)
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}> {/* Uses updated theme secondary text color */}
                                Immerse yourself in tranquility with our Vibrations feature. Explore calming meditative soundscapes, mix ambient sounds, and create personalized audio environments perfect for relaxation, focus, or sleep. Craft your unique sonic retreat today.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}> {/* Mystic Lavender */}
                                Rejuvenating Yoga Sessions
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}> {/* Uses updated theme secondary text color */}
                                Discover the transformative power of yoga with The Sukoon Space. We will soon offer online yoga classes and sessions suitable for all levels, from beginners to advanced practitioners. Find balance, increase flexibility, and calm your mind. Stay tuned to book your rejuvenating yoga sessions.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}> {/* Mystic Lavender */}
                                Insightful Tarot Card Readings
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}> {/* Uses updated theme secondary text color */}
                                Gain clarity and intuitive guidance through Tarot Card readings. Our experienced readers will soon be available to help you explore life's questions, understand challenges, and uncover potential paths forward. Prepare to book insightful Tarot Card sessions for personal growth and self-discovery.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                {/* FAQ Section */}
                <Container maxWidth="md" sx={{ py: 4, mt: 2 }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: theme.palette.text.primary, mb: 3 }}>
                        Frequently Asked Questions
                    </Typography>
                    <div>
                        {/* Vibrations FAQ */}
                        <Accordion sx={{ mb: 1, '&:before': { display: 'none' }, boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>What are Vibrations (Calming Soundscapes)?</Typography> {/* Uses updated theme primary text color */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: theme.palette.text.secondary }}> {/* Uses updated theme secondary text color */}
                                    Our Vibrations feature allows you to create personalized calming soundscapes by mixing various ambient sounds like rain, birds, or chimes. These meditative soundscapes can help with relaxation, focus, meditation, or improving sleep quality.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        {/* Yoga FAQ */}
                        <Accordion sx={{ mb: 1, '&:before': { display: 'none' }, boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>What kind of Yoga sessions will be offered?</Typography> {/* Uses updated theme primary text color */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: theme.palette.text.secondary }}> {/* Uses updated theme secondary text color */}
                                    We plan to offer online yoga classes catering to various levels, from gentle beginner sessions to more dynamic flows. Our goal is to provide accessible and rejuvenating yoga experiences guided by experienced instructors. Booking details will be available soon.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        {/* Tarot FAQ */}
                        <Accordion sx={{ mb: 1, '&:before': { display: 'none' }, boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>How can Tarot Card readings help?</Typography> {/* Uses updated theme primary text color */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: theme.palette.text.secondary }}> {/* Uses updated theme secondary text color */}
                                    Tarot Card readings offer intuitive guidance and perspective on life situations. They can help you explore challenges, understand underlying patterns, and consider potential outcomes or paths forward, fostering self-reflection and personal growth. Our insightful Tarot Card sessions will be available for booking soon.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default LandingPage;
