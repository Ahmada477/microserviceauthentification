import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchLogistics, createLogistics, updateLogisticsStatus, deleteLogistics } from '../../store/slices/logisticsSlice';
import { fetchEvents } from '../../store/slices/eventSlice';
import { FiPlus, FiTrash2, FiMapPin, FiPackage, FiUsers, FiEdit2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Modal from '../UI/Modal';
import LogisticsForm from './LogisticsForm';

const LogisticsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { logistics, loading } = useSelector((state: RootState) => state.logistics);
  const { events } = useSelector((state: RootState) => state.events);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLogistics());
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await dispatch(updateLogisticsStatus({ id, status })).unwrap();
      toast.success('Statut mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource logistique ?')) {
      try {
        await dispatch(deleteLogistics(id)).unwrap();
        toast.success('Ressource supprimée');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PLANNED: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion logistique</h1>
        {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus />
            <span>Ajouter une ressource</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {logistics.map((item) => {
          const event = events.find(e => e.id === item.eventId);
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event?.title || `Événement #${item.eventId}`}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiMapPin />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiPackage />
                    <span className="text-sm">Équipement: {item.equipment}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiUsers />
                    <span className="text-sm">Capacité: {item.capacity} personnes</span>
                  </div>
                </div>

                {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                    >
                      <option value="PLANNED">Planifié</option>
                      <option value="IN_PROGRESS">En cours</option>
                      <option value="COMPLETED">Terminé</option>
                      <option value="CANCELLED">Annulé</option>
                    </select>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter une ressource logistique">
        <LogisticsForm onSubmit={(data) => {
          dispatch(createLogistics(data));
          setIsModalOpen(false);
        }} onCancel={() => setIsModalOpen(false)} events={events} />
      </Modal>
    </div>
  );
};

export default LogisticsList;