import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'indigo', subtitle }) => {
  const colorClasses = {
    indigo: {
      bg: 'from-indigo-500 to-indigo-600',
      icon: 'bg-indigo-700',
      text: 'text-indigo-600'
    },
    green: {
      bg: 'from-green-500 to-emerald-600',
      icon: 'bg-green-700',
      text: 'text-green-600'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      icon: 'bg-purple-700',
      text: 'text-purple-600'
    },
    red: {
      bg: 'from-red-500 to-pink-600',
      icon: 'bg-red-700',
      text: 'text-red-600'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      icon: 'bg-orange-700',
      text: 'text-orange-600'
    },
    blue: {
      bg: 'from-blue-500 to-blue-600',
      icon: 'bg-blue-700',
      text: 'text-blue-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="card hover-lift bg-white border-2 border-transparent hover:border-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-br ${colors.bg} p-4 rounded-2xl box-glow`}>
          <Icon className="text-3xl text-white" />
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <FaArrowUp className="text-sm" /> : <FaArrowDown className="text-sm" />}
            <span className="text-sm font-bold">{trendValue}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className={`text-4xl font-extrabold ${colors.text} mb-1`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
