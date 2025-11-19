import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

export interface Designer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  completedProjects: number;
  hourlyRate: string;
  location: string;
  bio: string;
  verified: boolean;
  portfolio: PortfolioImage[];
}

export interface Freelancer {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  reviews: number;
  completedJobs: number;
  hourlyRate: string;
  location: string;
  bio: string;
  verified: boolean;
  aadhaarVerified: boolean;
}

interface PortfoliosState {
  designers: Designer[];
  freelancers: Freelancer[];
}

const initialState: PortfoliosState = {
  designers: [
    {
      id: 'designer_1',
      name: 'Priya Sharma',
      specialty: 'Modern & Contemporary',
      rating: 4.9,
      reviews: 47,
      completedProjects: 32,
      hourlyRate: '$80/hr',
      location: 'Mumbai, India',
      bio: 'Award-winning interior designer specializing in modern residential spaces with over 8 years of experience.',
      verified: true,
      portfolio: [
        {
          id: 'p1',
          url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
          title: 'Modern Living Space',
          description: 'Contemporary apartment design',
        },
        {
          id: 'p2',
          url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
          title: 'Minimalist Kitchen',
          description: 'Clean and functional kitchen design',
        },
      ],
    },
    {
      id: 'designer_2',
      name: 'Arjun Patel',
      specialty: 'Scandinavian & Minimalist',
      rating: 4.8,
      reviews: 38,
      completedProjects: 28,
      hourlyRate: '$70/hr',
      location: 'Bangalore, India',
      bio: 'Passionate about creating serene, minimalist spaces that blend functionality with beauty.',
      verified: true,
      portfolio: [
        {
          id: 'p3',
          url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          title: 'Scandinavian Bedroom',
          description: 'Peaceful and minimal bedroom design',
        },
      ],
    },
    {
      id: 'designer_3',
      name: 'Neha Kapoor',
      specialty: 'Traditional & Fusion',
      rating: 4.7,
      reviews: 52,
      completedProjects: 41,
      hourlyRate: '$75/hr',
      location: 'Delhi, India',
      bio: 'Specializing in blending traditional Indian aesthetics with contemporary design elements.',
      verified: true,
      portfolio: [
        {
          id: 'p4',
          url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
          title: 'Fusion Living Room',
          description: 'Traditional meets modern',
        },
      ],
    },
  ],
  freelancers: [
    {
      id: 'freelancer_1',
      name: 'Rahul Verma',
      skills: ['Carpentry', 'Furniture Making', 'Installation'],
      rating: 4.9,
      reviews: 63,
      completedJobs: 89,
      hourlyRate: '$35/hr',
      location: 'Mumbai, India',
      bio: 'Expert carpenter with 10+ years experience in custom furniture and installations.',
      verified: true,
      aadhaarVerified: true,
    },
    {
      id: 'freelancer_2',
      name: 'Amit Singh',
      skills: ['Painting', 'Wall Finishing', 'Texture Work'],
      rating: 4.8,
      reviews: 51,
      completedJobs: 74,
      hourlyRate: '$30/hr',
      location: 'Delhi, India',
      bio: 'Professional painter specializing in modern finishes and decorative techniques.',
      verified: true,
      aadhaarVerified: true,
    },
    {
      id: 'freelancer_3',
      name: 'Vikram Reddy',
      skills: ['Electrical', 'Lighting Installation', 'Smart Home'],
      rating: 4.9,
      reviews: 45,
      completedJobs: 67,
      hourlyRate: '$40/hr',
      location: 'Bangalore, India',
      bio: 'Licensed electrician with expertise in modern lighting design and smart home systems.',
      verified: true,
      aadhaarVerified: true,
    },
  ],
};

const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    addDesigner: (state, action: PayloadAction<Designer>) => {
      state.designers.push(action.payload);
    },
    addFreelancer: (state, action: PayloadAction<Freelancer>) => {
      state.freelancers.push(action.payload);
    },
  },
});

export const { addDesigner, addFreelancer } = portfoliosSlice.actions;
export default portfoliosSlice.reducer;
