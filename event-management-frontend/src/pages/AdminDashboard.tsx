import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import StatsCards from '../components/Dashboard/StatsCards';
import EventsList from '../components/Events/EventsList';
import GuestsList from '../components/Guests/GuestsList';
import LogisticsList from '../components/Logistics/LogisticsList';
import RegistrationsList from '../components/Registrations/RegistrationsList';
import { fetchEvents } from '../store/slices/eventSlice';
import { fetchGuests } from '../store/slices/guestSlice';
import { fetchRegistrations } from '../store/slices/registrationSlice';
import { fetchLogistics } from '../store/slices/logisticsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import UsersList from '../components/Users/UsersList';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);
  const { guests } = useSelector((state: RootState) => state.guests);
  const { registrations } = useSelector((state: RootState) => state.registrations);
  const { logistics } = useSelector((state: RootState) => state.logistics);
  const [chartData, setChartData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGuests());
    dispatch(fetchRegistrations());
    dispatch(fetchLogistics());
  }, [dispatch]);

  useEffect(() => {
    const eventsByMonth = events.reduce((acc: any, event) => {
      const month = new Date(event.date).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const chartDataArray = Object.entries(eventsByMonth).map(([month, count]) => ({
      month: new Date(2024, parseInt(month)).toLocaleString('default', { month: 'short' }),
      events: count,
    }));

    setChartData(chartDataArray);

    const statusCount = {
      confirmed: registrations.filter(r => r.status === 'CONFIRMED').length,
      pending: registrations.filter(r => r.status === 'PENDING').length,
      cancelled: registrations.filter(r => r.status === 'CANCELLED').length,
    };

    setStatusData([
      { name: 'Confirmées', value: statusCount.confirmed, color: '#10b981' },
      { name: 'En attente', value: statusCount.pending, color: '#f59e0b' },
      { name: 'Annulées', value: statusCount.cancelled, color: '#ef4444' },
    ]);
  }, [events, registrations]);

  const HomePage = () => (
    <div className="space-y-6">
      <StatsCards 
        eventsCount={events.length}
        guestsCount={guests.length}
        registrationsCount={registrations.length}
        logisticsCount={logistics.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Événements par mois</h3>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#3b82f6" />
          </BarChart>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Statistiques des inscriptions</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={statusData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/events" element={<EventsList />} />
  <Route path="/guests" element={<GuestsList />} />
  <Route path="/logistics" element={<LogisticsList />} />
  <Route path="/registrations" element={<RegistrationsList />} />
  <Route path="/users" element={<UsersList />} />
</Routes>
  );
};

export default AdminDashboard;