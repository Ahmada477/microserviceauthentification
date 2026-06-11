// src/components/Events/EventsList.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { createEvent, deleteEvent } from '../../store/slices/eventSlice';
import { createRegistration } from '../../store/slices/registrationSlice';
import { FiPlus, FiTrash2, FiCalendar, FiMapPin, FiUsers, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Modal from '../UI/Modal';
import EventForm from './EventForm';

const EventsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state: RootState) => state.events);
  const { registrations } = useSelector((state: RootState) => state.registrations);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeringEventId, setRegisteringEventId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        toast.success('Événement supprimé avec succès');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleSubmit = async (eventData: any) => {
    try {
      await dispatch(createEvent(eventData)).unwrap();
      toast.success('Événement créé avec succès');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Erreur lors de la création');
    }
  };

  // USER : s'inscrit directement avec ses informations de connexion
  const handleRegister = async (eventId: number) => {
    setRegisteringEventId(eventId);
    try {
      const registrationData = {
        eventId: eventId,
        guestName: `${user?.firstName} ${user?.lastName}`.trim(),
        guestEmail: user?.email || '',
        userName: user?.username || '',
        userId: user?.id || 0
      };
      
      console.log('📝 Inscription à l\'événement:', eventId, registrationData);
      
      await dispatch(createRegistration(registrationData)).unwrap();
      toast.success('✅ Inscription réussie !');
      
      // Recharger pour mettre à jour l'affichage
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      console.error('❌ Erreur:', error);
      toast.error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setRegisteringEventId(null);
    }
  };

  // Vérifier si l'utilisateur est déjà inscrit à un événement
  const isUserRegistered = (eventId: number) => {
    return registrations.some(r => r.eventId === eventId && r.userName === user?.username);
  };

  if (loading) {
    return <div className="text-center py-8">Chargement des événements...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.role === 'USER' ? 'Événements disponibles' : 'Gestion des événements'}
        </h1>
        {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus />
            <span>Nouvel événement</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const isRegistered = isUserRegistered(event.id);
          
          return (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h3 className="text-white text-xl font-semibold">{event.title}</h3>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-gray-600">{event.description}</p>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiCalendar />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiMapPin />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiUsers />
                  <span className="text-sm">Capacité: {event.capacity} personnes</span>
                </div>
                <div className="flex justify-end space-x-2 pt-3 border-t">
                  {user?.role === 'USER' && (
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={registeringEventId === event.id || isRegistered}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isRegistered
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <FiUserPlus />
                      <span>
                        {isRegistered 
                          ? 'Déjà inscrit' 
                          : registeringEventId === event.id 
                            ? 'Inscription...' 
                            : "S'inscrire"}
                      </span>
                    </button>
                  )}
                  {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucun événement disponible pour le moment</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Créer un événement">
        <EventForm onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default EventsList;