import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Bookings from './pages/Bookings';
import Preferences from './pages/Preferences';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
