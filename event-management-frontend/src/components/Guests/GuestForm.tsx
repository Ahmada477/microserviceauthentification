// src/components/Guests/GuestForm.tsx (version complète avec props)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { createGuest, fetchGuests } from '../../store/slices/guestSlice';
import { FiUser, FiMail, FiPhone, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Event } from '../../types';

interface GuestFormProps {
  onSubmit?: (guestData: any) => void;
  onCancel?: () => void;
  events?: Event[];
}

const GuestForm: React.FC<GuestFormProps> = ({ onSubmit, onCancel, events = [] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventId: '',
  });
  const [loading, setLoading] = useState(false);

  const isAdminOrOrganizer = user?.role === 'ADMIN' || user?.role === 'ORGANIZER';
  const isUser = user?.role === 'USER';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Si des props onSubmit sont fournies (pour ADMIN/ORGANIZER dans GuestsList)
      if (onSubmit) {
        // Utiliser le onSubmit passé en props
        onSubmit(formData);
        setLoading(false);
        return;
      }
      
      // Sinon, comportement normal (pour USER seul)
      const guestData: any = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };
      
      // Si ADMIN ou ORGANIZER et eventId sélectionné
      if (isAdminOrOrganizer && formData.eventId) {
        guestData.eventId = parseInt(formData.eventId);
      }
      
      console.log('📝 Envoi données:', guestData);
      await dispatch(createGuest(guestData)).unwrap();
      await dispatch(fetchGuests());
      toast.success(isUser ? 'Profil créé avec succès !' : 'Invité ajouté avec succès !');
      
      if (isUser) {
        navigate('/user/events');
      }
      
    } catch (error: any) {
      console.error('❌ Erreur:', error);
      toast.error(error.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Si USER, formulaire simplifié
  if (isUser && !onSubmit) {
    return (
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/user')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <FiArrowLeft />
          <span>Retour</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Créer votre profil invité</h2>
          <p className="text-gray-600 mb-6">
            Pour vous inscrire aux événements, vous devez d'abord créer votre profil.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FiUser className="ml-3 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 focus:outline-none rounded-lg"
                  required
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FiMail className="ml-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 focus:outline-none rounded-lg"
                  required
                  placeholder="jean@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FiPhone className="ml-3 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 focus:outline-none rounded-lg"
                  placeholder="77 123 45 67"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Création...' : 'Créer mon profil'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pour ADMIN et ORGANIZER (dans GuestsList)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Événement</label>
        <select
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sélectionner un événement</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default GuestForm;