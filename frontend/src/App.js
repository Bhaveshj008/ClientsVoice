import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import SpaceCreation from './components/spaceCreationModule/SpaceCreation';
import Dashboard from './components/DashboardComponent/Dashboard';
import FormPage from './components/publicForm/components/FormPage';
import SpaceDashboard from './components/SpaceDashboardComponent/Dashboard';

import EmbeddebleWidget from './components/SpaceDashboardComponent/EmbeddebleWidget';
import TestimonialsPage from './components/WidgetComponent/Widget';
import LandingPage from './components/LandingPageComponent/LandingPage'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path='/create-space' element={<SpaceCreation/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path="/form/:spaceName" element={<FormPage />} />
                <Route path="/space/dashboard/:spaceID" element={<SpaceDashboard />} />
                <Route path="/space/:spaceURL/wall-of-love" element={<EmbeddebleWidget />} />
                <Route path="/space/:spaceId/widget" element={<TestimonialsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
