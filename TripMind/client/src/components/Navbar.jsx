import { Link, useLocation } from 'react-router-dom';
import { Plane, Home, Calendar, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/plan', icon: Plane, label: 'Plan Trip' },
    { path: '/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/preferences', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-4xl">🌍</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-navy-400 bg-clip-text text-transparent">
                TripMind
              </h1>
              <p className="text-xs text-white/60">Your Autonomous Travel Agent</p>
            </div>
          </Link>

          <div className="hidden md:flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <button
                    className={`p-3 rounded-lg transition-all ${
                      isActive ? 'bg-primary-500 text-white' : 'hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
