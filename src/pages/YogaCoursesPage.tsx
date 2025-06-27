import React from 'react';
import YogaCoursesAccordion, { Course } from '@/components/YogaCoursesAccordion';
import { courses } from '../AllCourses';
import { Typography, Box, useTheme, useMediaQuery } from '@mui/material';

const YogaCoursesPage = () => {
  const [expandedPanel, setExpandedPanel] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>

      <div className="m-7">
         <Typography
        variant={isMobile ? 'h6' : 'h5'}
        component="h2"
        sx={{ fontWeight: 'bold' }}
      >
        Explore Yoga Courses
      </Typography>
        {courses.map((course: Course) => (
          <Box key={course.id}>
            <YogaCoursesAccordion
              course={course}
              expanded={expandedPanel === `panel-${course.id}`}
              onChange={handleChange}
            />
          </Box>
        ))}
      </div>
    </>
  );
};

export default YogaCoursesPage;
