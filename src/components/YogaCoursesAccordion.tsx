import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Chip,
  Avatar
} from '@mui/material';
import { Button } from "./ui/button";
import { Navigate } from 'react-router-dom';

export type Course = {
  id: number;
  name: string;
  image: string;
  instructor: string;
  time: string;
  duration: string;
  classTime: string;
  price: string;
  tags: string[];
  description: string;
};

type Props = {
  course: Course;
  expanded: boolean;
  onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
};


const YogaCoursesAccordion: React.FC<Props> = ({ course, expanded, onChange }) => {
  const {
    id,
    name,
    image,
    instructor,
    time,
    duration,
    classTime,
    price,
    tags,
    description,
  } = course;

  return (
    <div className="m-2">
      <Accordion expanded={expanded} onChange={onChange(`panel-${id}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${id}-content`}
          id={`panel-${id}-header`}
        >
          <Typography sx={{ width: "33%", flexShrink: 0  }}>{name}</Typography>
          <Typography sx={{ color: "text.secondary", display:'flex', alignItems:'center' }}>
            <Avatar sx={{ width: 32, height: 32, fontSize: 14, mr: 1 }}>
              {instructor.slice(0, 2).toUpperCase()}
            </Avatar>
            {instructor}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Card
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
            elevation={0}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", sm: 200 },
                height: 140,
                objectFit: "cover",
              }}
              image={image}
              alt={name}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }} mt={1}>
                  <Typography variant="body2">🧘 Time: {time}</Typography>
                  <Typography variant="body2" ml={1}>
                    ⏳ Duration: {duration}
                  </Typography>
                  <Typography variant="body2" ml={1}>
                    🕒 Class Time: {classTime}
                  </Typography>
                  <Typography variant="body2" ml={1}>
                    💰 Price: ₹{price}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                  {tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                    />
                  ))}
                </Stack>
              </CardContent>
            </Box>

            <Box>
              {/* Slot Timing Accordion */}
              <Accordion sx={{ mt: 2 }} elevation={1}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`slot-panel-${id}-content`}
                  id={`slot-panel-${id}-header`}
                >
                  <Typography color="secondary" bgcolor={"secondary"}>
                    🗓️ Slot Timings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", flex: 1 }}>
                  <Box>
                    <Typography variant="caption" gutterBottom sx={{ display: 'block' }} mr={2} >
                      Morning Slot: 6 AM – 7 AM
                      <br />
                      Evening Slot: 6 PM – 7 PM
                    </Typography>
                  </Box>
                  <Button className=" bg-[#9B72AA] hover:bg-[#7E69AB] text-white font-medium py-2 px-3 shadow-lg shadow-purple-200 transition-all hover:scale-[1.02]">
                    Join
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Card>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default YogaCoursesAccordion;
