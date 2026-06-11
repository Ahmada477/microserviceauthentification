import React from 'react';
import { FiCalendar, FiUsers, FiUserCheck, FiTruck } from 'react-icons/fi';

interface StatsCardsProps {
  eventsCount: number;
  guestsCount: number;
  registrationsCount: number;
  logisticsCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  eventsCount,
  guestsCount,
  registrationsCount,
  logisticsCount
}) => {
  const stats = [
    {
      title: 'Événements',
      value: eventsCount,
      icon: FiCalendar,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Invités',
      value: guestsCount,
      icon: FiUsers,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Inscriptions',
      value: registrationsCount,
      icon: FiUserCheck,
      color: 'bg-purple-500',
      change: '+24%'
    },
    {
      title: 'Logistique',
      value: logisticsCount,
      icon: FiTruck,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const IconComponent = ({ icon: Icon, className }: { icon: any; className?: string }) => {
    return <Icon className={className} />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-green-500 mt-2">{stat.change} vs mois dernier</p>
            </div>
            <div className={`${stat.color} p-3 rounded-full text-white`}>
              <IconComponent icon={stat.icon} className="text-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;