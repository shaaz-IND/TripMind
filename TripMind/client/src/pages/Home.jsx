import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Brain, Clock, DollarSign, 
  MapPin, Star, Plane, Shield 
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Planning',
      description: 'Intelligent assistant that understands your travel needs and preferences'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Plan complex trips in minutes, not hours'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Compare rates from multiple providers automatically'
    },
    {
      icon: MapPin,
      title: 'Complete Itineraries',
      description: 'Day-by-day plans with activities, hotels, and transport'
    },
    {
      icon: Star,
      title: 'Personalized',
      description: 'Learns your preferences and improves over time'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is safe and bookings are confirmed'
    }
  ];

  const examples = [
    { emoji: '🏖️', title: 'Beach Vacation', desc: '5-day Goa trip under $500' },
    { emoji: '🗼', title: 'Family Trip', desc: '7-day Paris with culture & food' },
    { emoji: '⛰️', title: 'Adventure', desc: 'Weekend trekking in Manali' }
  ];

  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-32"
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="text-8xl mb-4">🌍</div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 via-navy-300 to-primary-500 bg-clip-text text-transparent">
              TripMind
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/80 mb-4 font-light">
            Plan smarter. Travel faster. Book automatically.
          </p>
          
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            Your autonomous AI travel assistant that understands, plans, and books your perfect trip
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/plan">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="primary-button flex items-center gap-2"
              >
                <Sparkles size={20} />
                <span>Plan My Trip</span>
              </motion.button>
            </Link>
            
            <a href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button"
              >
                Learn More
              </motion.button>
            </a>
          </div>
        </div>

        <div id="features" className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-primary-400">TripMind</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="bg-primary-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={28} className="text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">
            <Plane className="inline mr-2 mb-2" size={36} />
            Quick Examples
          </h2>
          <p className="text-center text-white/60 mb-12">Try these popular travel plans</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 cursor-pointer text-center"
              >
                <div className="text-5xl mb-3">{example.emoji}</div>
                <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                <p className="text-sm text-white/60">{example.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Just tell me where you'd like to go, your budget, and any preferences - I'll handle the rest autonomously!
          </p>
          <Link to="/plan">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button text-lg"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <footer className="glass-card mx-4 mb-4 p-8 text-center">
        <p className="text-white/60 mb-4">© 2025 TripMind - Your Autonomous Travel Agent</p>
        <div className="flex gap-6 justify-center text-sm text-white/50">
          <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-primary-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
