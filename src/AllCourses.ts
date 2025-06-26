// src/AllCourses.ts

export interface Course {
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
}

export const courses: Course[] = [
  {
    id: 0,
    name: 'Morning Flow Yoga',
    image: '/static/img/morning_yoga.webp',
    instructor: 'Dimple Poptani',
    time: '6AM',
    duration: '2 weeks',
    classTime: '60 mins',
    price: '2999',
    tags: ['Trending', 'Beginner Friendly'],
    description:
      'Awaken your body and mind with this gentle yet energizing flow designed to start your day with clarity, flexibility, and calm. Morning Flow Yoga synchronizes breath and movement to elevate your mood, improve posture, and create inner peace.',
  },
  {
    id: 1,
    name: 'Power Yoga',
    image: '/static/img/power-yoga.webp',
    instructor: 'Rahul Verma',
    time: '7AM',
    duration: '1 month',
    classTime: '75 mins',
    price: '3999',
    tags: ['Popular', 'Advanced'],
    description:
      'A dynamic, fitness-based yoga session that builds strength, endurance, and focus. Power Yoga is perfect for those seeking a more intense, sweat-inducing practice while maintaining mindfulness and control. Feel powerful, centered, and strong.',
  },
  {
    id: 2,
    name: 'Yin Yoga',
    image: '/static/img/bg-vibrations.jpg',
    instructor: 'Ananya Patel',
    time: '5PM',
    duration: '1 week',
    classTime: '45 mins',
    price: '1999',
    tags: ['On a discount', 'Relaxing'],
    description:
      'Slow down and melt into stillness with Yin Yoga, a deeply calming and meditative practice that targets connective tissues and promotes emotional release. Ideal for unwinding in the evening, this class restores both body and soul.',
  },
];
