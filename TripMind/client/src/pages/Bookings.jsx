import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, DollarSign, Plane, RefreshCw } from 'lucide-react';
import { api } from '../utils/api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const result = await api.getBookings();
      if (result.status === 'success' && result.bookings) {
        setBookings(result.bookings);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      planned: 'bg-blue-500/20 text-blue-400',
      confirmed: 'bg-green-500/20 text-green-400',
      completed: 'bg-gray-500/20 text-gray-400',
      cancelled: 'bg-red-500/20 text-red-400'
    };
    return colors[status] || colors.planned;
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary-400 to-navy-400 bg-clip-text text-transparent">
                  Your Travel History
                </span>
              </h1>
              <p className="text-white/60">View your conversation history and planned trips</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadBookings}
              className="glass-button flex items-center gap-2"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin text-6xl mb-4">🌍</div>
              <p className="text-white/60">Loading your trips...</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-semibold mb-2">No trips yet</h3>
            <p className="text-white/60 mb-6">Start planning your first adventure!</p>
            <a href="/plan">
              <button className="primary-button">Plan a Trip</button>
            </a>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Plane size={24} className="text-primary-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">
                        Trip to {booking.destination}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    {booking.description && (
                      <p className="text-white/70 mb-4">{booking.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar size={16} />
                        <span>{booking.start_date} - {booking.end_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <DollarSign size={16} />
                        <span>${booking.budget} budget</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock size={16} />
                        <span>Created {new Date(booking.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
