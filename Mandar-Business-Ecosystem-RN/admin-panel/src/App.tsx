import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import VerificationsScreen from './screens/VerificationsScreen';
import UserManagementScreen from './screens/UserManagementScreen';
import ModerationScreen from './screens/ModerationScreen';
import SponsoredAdsScreen from './screens/SponsoredAdsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import EnquiriesScreen from './screens/EnquiriesScreen';
import Layout from './components/Layout';

function App() {
  const token = localStorage.getItem('adminToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <LoginScreen /> : <Navigate to="/" />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={token ? <DashboardScreen /> : <Navigate to="/login" />} />
          <Route path="/verifications" element={token ? <VerificationsScreen /> : <Navigate to="/login" />} />
          <Route path="/users" element={token ? <UserManagementScreen /> : <Navigate to="/login" />} />
          <Route path="/moderation" element={token ? <ModerationScreen /> : <Navigate to="/login" />} />
          <Route path="/ads" element={token ? <SponsoredAdsScreen /> : <Navigate to="/login" />} />
          <Route path="/enquiries" element={token ? <EnquiriesScreen /> : <Navigate to="/login" />} />
          <Route path="/feedbacks" element={token ? <FeedbackScreen /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
