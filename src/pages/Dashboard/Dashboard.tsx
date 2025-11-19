import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import HomeownerDashboard from './HomeownerDashboard';
import DesignerDashboard from './DesignerDashboard';
import FreelancerDashboard from './FreelancerDashboard';

export default function Dashboard() {
  const { role } = useSelector((state: RootState) => state.user);

  if (role === 'designer') {
    return <DesignerDashboard />;
  }

  if (role === 'freelancer') {
    return <FreelancerDashboard />;
  }

  return <HomeownerDashboard />;
}
