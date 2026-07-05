import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DriverDashboard from './pages/DriverDashboard';
import PendingTripsPage from './pages/PendingTripsPage';
import DriverTripDetail from './pages/DriverTripDetail';
import DriverHistory from './pages/DriverHistory';

const DriverRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DriverDashboard />} />
      <Route path="/pending" element={<PendingTripsPage />} />
      <Route path="/history" element={<DriverHistory />} />
      <Route path="/trip/:id" element={<DriverTripDetail />} />
    </Routes>
  );
};

export default DriverRoutes;