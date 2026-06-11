import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store, RootState } from './store/store';
import LandingPage from './pages/LandingPage';  // ← AJOUTER
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import UserDashboard from './pages/UserDashboard';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster position="top-right" />
        <AppContent />
      </Router>
    </Provider>
  );
}

const AppContent: React.FC = () => {
  const { user, token, loading } = useSelector((state: RootState) => state.auth);

  // Afficher un chargement pendant la vérification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Vérification sécurisée de l'authentification
  const isAuthenticated = token && user && user.role;
  
  // Si NON authentifié, afficher les pages publiques
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />           {/* ← PAGE D'ACCUEIL */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />       {/* ← Redirige vers accueil */}
      </Routes>
    );
  }

  // Si authentifié, routes selon le rôle
  console.log('Utilisateur authentifié:', user);
  console.log('Rôle:', user.role);

  // Routes selon le rôle
  if (user.role === 'ADMIN') {
    return (
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    );
  }

  if (user.role === 'ORGANIZER') {
    return (
      <Routes>
        <Route
          path="/organizer/*"
          element={
            <Layout>
              <OrganizerDashboard />
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/organizer" />} />
        <Route path="*" element={<Navigate to="/organizer" />} />
      </Routes>
    );
  }

  // Par défaut pour USER
  return (
    <Routes>
      <Route
        path="/user/*"
        element={
          <Layout>
            <UserDashboard />
          </Layout>
        }
      />
      <Route path="/" element={<Navigate to="/user" />} />
      <Route path="*" element={<Navigate to="/user" />} />
    </Routes>
  );
};

export default App;