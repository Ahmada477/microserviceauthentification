// src/pages/OrganizerDashboard.tsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import EventsList from '../components/Events/EventsList';
import GuestsList from '../components/Guests/GuestsList';
import LogisticsList from '../components/Logistics/LogisticsList';
import RegistrationsList from '../components/Registrations/RegistrationsList';
import StatsCards from '../components/Dashboard/StatsCards';
import { fetchEvents } from '../store/slices/eventSlice';
import { fetchGuests } from '../store/slices/guestSlice';
import { fetchRegistrations } from '../store/slices/registrationSlice';
import { fetchLogistics } from '../store/slices/logisticsSlice';
import { FiCalendar, FiUsers, FiTruck, FiUserCheck, FiTrendingUp } from 'react-icons/fi';


const OrganizerDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);
  const { guests } = useSelector((state: RootState) => state.guests);
  const { registrations } = useSelector((state: RootState) => state.registrations);
  const { logistics } = useSelector((state: RootState) => state.logistics);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGuests());
    dispatch(fetchRegistrations());
    dispatch(fetchLogistics());
  }, [dispatch]);

  // Filtrer les données de l'organisateur
  const myEvents = events.filter(event => event.createdBy === user?.username);
  const myGuests = guests.filter(guest => guest.createdByUsername === user?.username);
  const myRegistrations = registrations.filter(reg => myEvents.some(event => event.id === reg.eventId));
  const myLogistics = logistics.filter(log => myEvents.some(event => event.id === log.eventId));

  const HomePage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Tableau de bord Organisateur</h1>
        <p className="text-blue-100 mt-2">
          Bienvenue {user?.firstName} {user?.lastName} ! Gérez vos événements et suivez vos statistiques.
        </p>
      </div>

      <StatsCards 
        eventsCount={myEvents.length}
        guestsCount={myGuests.length}
        registrationsCount={myRegistrations.length}
        logisticsCount={myLogistics.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Mes derniers événements</h3>
            <FiCalendar className="text-blue-500 text-xl" />
          </div>
          <div className="space-y-3">
            {myEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {registrations.filter(r => r.eventId === event.id).length} inscriptions
                </span>
              </div>
            ))}
            {myEvents.length === 0 && (
              <p className="text-gray-500 text-center py-4">Aucun événement créé</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Statistiques rapides</h3>
            <FiTrendingUp className="text-green-500 text-xl" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Taux d'occupation moyen</span>
                <span className="font-medium">
                  {myEvents.length > 0 
                    ? Math.round((myRegistrations.length / myEvents.reduce((acc, e) => acc + e.capacity, 0)) * 100) 
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${myEvents.length > 0 
                    ? (myRegistrations.length / myEvents.reduce((acc, e) => acc + e.capacity, 0)) * 100 
                    : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <FiUsers className="text-blue-500 text-xl mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{myGuests.length}</p>
                <p className="text-xs text-gray-600">Invités</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <FiUserCheck className="text-purple-500 text-xl mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{myRegistrations.length}</p>
                <p className="text-xs text-gray-600">Inscriptions</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <FiTruck className="text-orange-500 text-xl mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{myLogistics.length}</p>
                <p className="text-xs text-gray-600">Ressources</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <FiCalendar className="text-green-500 text-xl mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{myEvents.length}</p>
                <p className="text-xs text-gray-600">Événements</p>
              </div>
            </div>
          </div>
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
</Routes>
  );
};

export default OrganizerDashboard;