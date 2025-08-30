import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  FileText, 
  Shield, 
  Settings, 
  LogOut,
  Leaf,
  ShoppingCart,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    if (!user) return [];

    const commonItems = [
      { to: '/profile', icon: User, label: 'Profile' },
      { to: '/public-ledger', icon: FileText, label: 'Public Ledger' },
      { to: '/about', icon: Shield, label: 'About' },
      { to: '/contact', icon: Settings, label: 'Contact' }
    ];

    switch (user.role) {
      case 'Producer':
        return [
          { to: '/producer-dashboard', icon: Home, label: 'Dashboard' },
          { to: '/producer-dashboard', icon: Leaf, label: 'My Credits' },
          ...commonItems
        ];
      case 'Buyer':
        return [
          { to: '/buyer-dashboard', icon: Home, label: 'Dashboard' },
          { to: '/buyer-dashboard', icon: ShoppingCart, label: 'Marketplace' },
          ...commonItems
        ];
      case 'Certifier':
        return [
          { to: '/certifier-dashboard', icon: Home, label: 'Dashboard' },
          { to: '/certifier-dashboard', icon: CheckCircle, label: 'Verify Requests' },
          ...commonItems
        ];
      case 'Regulator':
        return [
          { to: '/regulator-dashboard', icon: Home, label: 'Dashboard' },
          { to: '/regulator-dashboard', icon: BarChart3, label: 'Analytics' },
          ...commonItems
        ];
      default:
        return commonItems;
    }
  };

  if (!user) return null;

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">H2Credits</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {getNavItems().map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3 text-gray-600">
          <User className="w-5 h-5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;