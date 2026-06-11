// src/components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IconWrapper } from '../Icons/IconWrapper';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMenuItems = () => {
    if (user?.role === 'ADMIN') {
      return [
        { path: '/admin', icon: 'FiHome', label: 'Tableau de bord' },
        { path: '/admin/events', icon: 'FiCalendar', label: 'Événements' },
        { path: '/admin/guests', icon: 'FiUsers', label: 'Invités' },
        { path: '/admin/logistics', icon: 'FiTruck', label: 'Logistique' },
        { path: '/admin/registrations', icon: 'FiUserCheck', label: 'Inscriptions' },
      ];
    }
    
    if (user?.role === 'ORGANIZER') {
      return [
        { path: '/organizer', icon: 'FiHome', label: 'Tableau de bord' },
        { path: '/organizer/events', icon: 'FiCalendar', label: 'Mes événements' },
        { path: '/organizer/guests', icon: 'FiUsers', label: 'Mes invités' },
        { path: '/organizer/logistics', icon: 'FiTruck', label: 'Ma logistique' },
        { path: '/organizer/registrations', icon: 'FiUserCheck', label: 'Mes inscriptions' },
      ];
    }
    
    // USER
    return [
      { path: '/user', icon: 'FiHome', label: 'Tableau de bord' },
      { path: '/user/events', icon: 'FiCalendar', label: 'Événements' },
      { path: '/user/my-registrations', icon: 'FiUserCheck', label: 'Mes inscriptions' },
    ];
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = getMenuItems();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <IconWrapper name="FiMap" className="text-3xl text-blue-400" />
          <span className="text-xl font-bold">EventPro</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">{user?.role}</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-6 py-3 transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <IconWrapper name={item.icon as any} className="text-xl" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-6 py-3 w-full text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 mt-auto absolute bottom-0"
        >
          <IconWrapper name="FiLogOut" className="text-xl" />
          <span>Déconnexion</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;