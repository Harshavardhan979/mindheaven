import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardRouter from './pages/DashboardRouter';
import TherapistDirectory from './pages/TherapistDirectory';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/therapists" element={<TherapistDirectory />} />
          <Route path="/dashboard/*" element={<DashboardRouter />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
