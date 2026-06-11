// src/components/Registrations/RegistrationsList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchRegistrations } from '../../store/slices/registrationSlice';
import { FiCalendar, FiUser, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const RegistrationsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { registrations, loading } = useSelector((state: RootState) => state.registrations);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  // Filtrer les inscriptions selon le rôle
  const filteredRegistrations = user?.role === 'ADMIN' 
    ? registrations 
    : registrations.filter(reg => reg.userName === user?.username);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {user?.role === 'USER' ? 'Mes inscriptions' : 'Gestion des inscriptions'}
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscrit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Événement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegistrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reg.guestName}</div>
                      <div className="text-xs text-gray-500">Par: {reg.userName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{reg.eventTitle}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-2" />
                    {new Date(reg.registrationDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reg.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    reg.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredRegistrations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune inscription trouvée</p>
            {user?.role === 'USER' && (
              <button 
                onClick={() => window.location.href = '/user/events'}
                className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                Découvrir les événements →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationsList;