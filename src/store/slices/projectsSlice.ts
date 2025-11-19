import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  status: 'open' | 'in-progress' | 'completed';
  homeownerId: string;
  homeownerName: string;
  designerId?: string;
  createdAt: string;
  proposals: number;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [
    {
      id: '1',
      title: 'Modern Living Room Redesign',
      description: 'Looking for a designer to transform my 300 sq ft living room into a modern minimalist space.',
      budget: '$5,000 - $8,000',
      status: 'open',
      homeownerId: 'user_1',
      homeownerName: 'Sarah Johnson',
      createdAt: '2024-01-15',
      proposals: 5,
    },
    {
      id: '2',
      title: 'Kitchen Renovation',
      description: 'Complete kitchen makeover needed with focus on functionality and aesthetics.',
      budget: '$15,000 - $20,000',
      status: 'in-progress',
      homeownerId: 'user_2',
      homeownerName: 'Michael Chen',
      designerId: 'designer_1',
      createdAt: '2024-01-10',
      proposals: 8,
    },
    {
      id: '3',
      title: 'Home Office Setup',
      description: 'Need professional help designing an inspiring home office space.',
      budget: '$3,000 - $5,000',
      status: 'open',
      homeownerId: 'user_3',
      homeownerName: 'Emily Rodriguez',
      createdAt: '2024-01-18',
      proposals: 3,
    },
  ],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
  },
});

export const { addProject, updateProject } = projectsSlice.actions;
export default projectsSlice.reducer;
