import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import Portfolio from './pages/Dashboard/Portfolio';
import PostProject from './pages/Dashboard/PostProject';
import Chat from './pages/Dashboard/Chat';
// Homeowner pages
import PostRequirement from './pages/Dashboard/Homeowner/PostRequirement';
import BrowseDesigners from './pages/Dashboard/Homeowner/BrowseDesigners';
import MyRequirements from './pages/Dashboard/Homeowner/MyRequirements';
import DesignerProfile from './pages/Dashboard/Homeowner/DesignerProfile';
// Designer pages
import BrowseRequirements from './pages/Dashboard/Designer/BrowseRequirements';
import MyProposals from './pages/Dashboard/Designer/MyProposals';
// Freelancer pages
import BrowseJobs from './pages/Dashboard/Freelancer/BrowseJobs';
import MyApplications from './pages/Dashboard/Freelancer/MyApplications';

import AuthInitializer from './components/AuthInitializer';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="post-project" element={<PostProject />} />
            <Route path="chat" element={<Chat />} />
            {/* Homeowner Routes */}
            <Route path="post-requirement" element={<PostRequirement />} />
            <Route path="browse-designers" element={<BrowseDesigners />} />
            <Route path="my-requirements" element={<MyRequirements />} />
            <Route path="designer/:designerId" element={<DesignerProfile />} />
            {/* Designer Routes */}
            <Route path="browse-requirements" element={<BrowseRequirements />} />
            <Route path="my-proposals" element={<MyProposals />} />
            {/* Freelancer Routes */}
            <Route path="browse-jobs" element={<BrowseJobs />} />
            <Route path="my-applications" element={<MyApplications />} />
            {/* Legacy routes */}
            <Route path="projects" element={<Dashboard />} />
            <Route path="designers" element={<Dashboard />} />
            <Route path="freelancers" element={<Dashboard />} />
            <Route path="jobs" element={<Dashboard />} />
            <Route path="applications" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
