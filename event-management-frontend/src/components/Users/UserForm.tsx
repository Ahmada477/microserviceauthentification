// src/components/Users/UserForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createUser, updateUser } from '../../store/slices/userSlice';
import { FiUser, FiMail, FiLock, FiUserCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface UserFormProps {
  onClose: () => void;
  userToEdit?: any;
}

const UserForm: React.FC<UserFormProps> = ({ onClose, userToEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: userToEdit?.username || '',
    email: userToEdit?.email || '',
    password: '',
    firstName: userToEdit?.firstName || '',
    lastName: userToEdit?.lastName || '',
    role: userToEdit?.role || 'USER',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (userToEdit) {
        // Modification
        const updateData: any = {
          username: formData.username,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await dispatch(updateUser({ id: userToEdit.id, data: updateData })).unwrap();
        toast.success('Utilisateur modifié avec succès');
      } else {
        // Création
        await dispatch(createUser(formData)).unwrap();
        toast.success('Utilisateur créé avec succès');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'opération');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom d'utilisateur *
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <FiUser className="ml-3 text-gray-400" />
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-3 py-2 focus:outline-none rounded-lg"
            required
            disabled={!!userToEdit}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <FiMail className="ml-3 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 focus:outline-none rounded-lg"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {userToEdit ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe *'}
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <FiLock className="ml-3 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 focus:outline-none rounded-lg"
            required={!userToEdit}
            minLength={6}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rôle *
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <FiUserCheck className="ml-3 text-gray-400" />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 focus:outline-none rounded-lg"
            required
          >
            <option value="USER">Utilisateur</option>
            <option value="ORGANIZER">Organisateur</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : userToEdit ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;