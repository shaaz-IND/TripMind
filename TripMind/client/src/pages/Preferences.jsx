import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, DollarSign, Plane, Hotel, Star, CheckCircle } from 'lucide-react';
import { api } from '../utils/api';

export default function Preferences() {
  const [formData, setFormData] = useState({
    budget_per_trip: '',
    max_flight_budget: '',
    preferred_accommodation_style: 'any',
    max_hotel_price_per_night: '',
    travel_class: 'economy',
    preferred_activities: '',
    dietary_preferences: '',
    destination_preferences: ''
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    setLoading(true);
    try {
      const result = await api.getPreferences();
      if (result.status === 'success' && result.preferences) {
        setFormData(prev => ({ ...prev, ...result.preferences }));
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const cleanedPrefs = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== '')
      );
      
      await api.updatePreferences(cleanedPrefs);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🌍</div>
          <p className="text-white/60">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary-400 to-navy-400 bg-clip-text text-transparent">
              Travel Preferences
            </span>
          </h1>
          <p className="text-white/60">Customize your travel planning experience</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign size={24} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold">Budget Preferences</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Budget per Trip ($)</label>
                <input
                  type="number"
                  value={formData.budget_per_trip}
                  onChange={(e) => handleChange('budget_per_trip', e.target.value)}
                  placeholder="e.g., 1000"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Flight Budget ($)</label>
                <input
                  type="number"
                  value={formData.max_flight_budget}
                  onChange={(e) => handleChange('max_flight_budget', e.target.value)}
                  placeholder="e.g., 500"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Hotel size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold">Accommodation</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Accommodation Style</label>
                <select
                  value={formData.preferred_accommodation_style}
                  onChange={(e) => handleChange('preferred_accommodation_style', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="any">Any</option>
                  <option value="budget">Budget Friendly</option>
                  <option value="mid-range">Mid-Range</option>
                  <option value="luxury">Luxury</option>
                  <option value="boutique">Boutique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Hotel Price/Night ($)</label>
                <input
                  type="number"
                  value={formData.max_hotel_price_per_night}
                  onChange={(e) => handleChange('max_hotel_price_per_night', e.target.value)}
                  placeholder="e.g., 150"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Plane size={24} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold">Travel Style</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Travel Class</label>
                <select
                  value={formData.travel_class}
                  onChange={(e) => handleChange('travel_class', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business Class</option>
                  <option value="first">First Class</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Activities</label>
                <input
                  type="text"
                  value={formData.preferred_activities}
                  onChange={(e) => handleChange('preferred_activities', e.target.value)}
                  placeholder="e.g., hiking, museums, beaches"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Star size={24} className="text-yellow-400" />
              </div>
              <h2 className="text-2xl font-semibold">Other Preferences</h2>
            </div>

            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
                <input
                  type="text"
                  value={formData.dietary_preferences}
                  onChange={(e) => handleChange('dietary_preferences', e.target.value)}
                  placeholder="e.g., vegetarian, vegan, no restrictions"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Destination Preferences</label>
                <input
                  type="text"
                  value={formData.destination_preferences}
                  onChange={(e) => handleChange('destination_preferences', e.target.value)}
                  placeholder="e.g., beaches, mountains, cities, rural"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg transition-all ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg'
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle size={24} />
                  <span>Preferences Saved!</span>
                </>
              ) : (
                <>
                  <Save size={24} />
                  <span>Save Preferences</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
