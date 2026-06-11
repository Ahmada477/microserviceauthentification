import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Layout from '../components/Layout/Layout';
import AdminDashboard from './AdminDashboard';
import OrganizerDashboard from './OrganizerDashboard';
import UserDashboard from './UserDashboard';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getDashboardByRole = () => {
    switch (user?.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'ORGANIZER':
        return <OrganizerDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <Layout>
      <Routes>
        <Route path="/*" element={getDashboardByRole()} />
      </Routes>
    </Layout>
  );
};

export default Dashboard;