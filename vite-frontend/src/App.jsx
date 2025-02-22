import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import loadingGif from '/loading.gif';

// Import components directly
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import SpaceCreation from './components/spaceCreationModule/SpaceCreation';
import Dashboard from './components/DashboardComponent/Dashboard';
import FormPage from './components/publicForm/components/Form/FormPage';
import SpaceDashboard from './components/SpaceDashboardComponent/Dashboard';
import LandingPage from './components/LandingPageComponent/LandingPage';
import EditSpace from './components/spaceCreationModule/EditSpace';
import Header from './components/Header';
import AdminPannel from './AdminPannel';

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form/:spaceName" element={<FormPage />} />
        <Route path="/clientsvoice/admin/*" element={<AdminPannel />} />
        <Route element={<DashboardLayout />}>
          <Route path="/space/:mode" element={<SpaceCreation />} />
          <Route path="/space/:mode/:spaceId" element={<EditSpace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/space/dashboard/:spaceID" element={<SpaceDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
