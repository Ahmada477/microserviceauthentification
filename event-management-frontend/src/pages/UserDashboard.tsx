// src/pages/UserDashboard.tsx
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import EventsList from '../components/Events/EventsList';
import RegistrationsList from '../components/Registrations/RegistrationsList';
import { fetchEvents } from '../store/slices/eventSlice';
import { fetchRegistrations } from '../store/slices/registrationSlice';
import { FiCalendar, FiUserCheck, FiStar, FiTrendingUp, FiClock } from 'react-icons/fi';

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { events } = useSelector((state: RootState) => state.events);
  const { registrations } = useSelector((state: RootState) => state.registrations);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchRegistrations());
  }, [dispatch]);

  // Mes inscriptions
  const myRegistrations = registrations.filter(reg => reg.userName === user?.username);
  
  // Événements à venir (non passés et non inscrits)
  const upcomingEvents = events.filter(event => 
    new Date(event.date) > new Date() && 
    !myRegistrations.some(reg => reg.eventId === event.id)
  );
  
  // Événements auxquels je suis inscrit
  const myUpcomingEvents = events.filter(event => 
    myRegistrations.some(reg => reg.eventId === event.id) && 
    new Date(event.date) > new Date()
  );

  const HomePage = () => (
    <div className="space-y-6">
      {/* En-tête avec bienvenue */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Tableau de bord Utilisateur</h1>
        <p className="text-green-100 mt-2">
          Bonjour {user?.firstName} {user?.lastName} ! Découvrez les événements et gérez vos inscriptions.
        </p>
      </div>

      {/* Cartes de statistiques personnelles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mes inscriptions</p>
              <p className="text-2xl font-bold text-gray-800">{myRegistrations.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiUserCheck className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Événements à venir</p>
              <p className="text-2xl font-bold text-gray-800">{upcomingEvents.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiCalendar className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mes prochains événements</p>
              <p className="text-2xl font-bold text-gray-800">{myUpcomingEvents.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiStar className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Mes prochains événements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Mes prochains événements</h3>
          <FiClock className="text-blue-500 text-xl" />
        </div>
        <div className="space-y-3">
          {myUpcomingEvents.length > 0 ? (
            myUpcomingEvents.map((event) => {
              const registration = myRegistrations.find(r => r.eventId === event.id);
              return (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <FiCalendar className="mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  {registration && (
                    <div className="text-right">
                      {registration.checkedIn ? (
                        <span className="text-green-600 text-sm">✓ Check-in effectué</span>
                      ) : (
                        <span className="text-orange-500 text-sm">En attente de check-in</span>
                      )}
                      {registration.qrCode && (
                        <button 
                          onClick={() => navigate('/user/my-registrations')}
                          className="block text-xs text-blue-600 mt-1 hover:underline"
                        >
                          Voir QR Code
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Vous n'êtes inscrit à aucun événement pour le moment</p>
              <button 
                onClick={() => navigate('/user/events')}
                className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                Découvrir les événements →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Événements recommandés */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Événements recommandés</h3>
          <FiTrendingUp className="text-green-500 text-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.slice(0, 4).map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800">{event.title}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <FiCalendar className="inline mr-1" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <button 
                  onClick={() => navigate('/user/events')}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  S'inscrire
                </button>
              </div>
            </div>
          ))}
        </div>
        {upcomingEvents.length === 0 && (
          <p className="text-gray-500 text-center py-4">Aucun événement à venir pour le moment</p>
        )}
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/user/events')}
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
          >
            <FiCalendar className="text-blue-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Voir les événements</p>
          </button>
          <button 
            onClick={() => navigate('/user/my-registrations')}
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
          >
            <FiUserCheck className="text-purple-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Mes inscriptions</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/events" element={<EventsList />} />
  <Route path="/my-registrations" element={<RegistrationsList />} />
</Routes>
  );
};

export default UserDashboard;