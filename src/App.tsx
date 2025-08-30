import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProducerDashboard from './pages/ProducerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CertifierDashboard from './pages/CertifierDashboard';
import RegulatorDashboard from './pages/RegulatorDashboard';
import PublicLedgerPage from './pages/PublicLedgerPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/public-ledger" element={<PublicLedgerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Routes */}
            <Route 
              path="/producer-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['Producer']}>
                  <ProducerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/buyer-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['Buyer']}>
                  <BuyerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/certifier-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['Certifier']}>
                  <CertifierDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/regulator-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['Regulator']}>
                  <RegulatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;