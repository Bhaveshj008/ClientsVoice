// src/AdminPannel/index.jsx
import { Routes, Route } from 'react-router-dom';  // Remove BrowserRouter
import { AuthProvider } from './hooks/useAuth';
import LoginPage from './AdminLogin';
import AdminDashboard from './AdminPannel';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminInitialize from './AdminInitialize';

const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<AdminInitialize />} />
        <Route
          path="dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Admin;