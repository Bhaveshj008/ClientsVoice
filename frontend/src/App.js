import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import loadingGif from './components/LandingPageComponent/loading.gif';

// Lazy load components to optimize performance
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const SpaceCreation = lazy(() => import('./components/spaceCreationModule/SpaceCreation'));
const Dashboard = lazy(() => import('./components/DashboardComponent/Dashboard'));
const FormPage = lazy(() => import('./components/publicForm/components/FormPage'));
const SpaceDashboard = lazy(() => import('./components/SpaceDashboardComponent/Dashboard'));
const EmbeddebleWidget = lazy(() => import('./components/SpaceDashboardComponent/EmbeddebleWidget'));
const TestimonialsPage = lazy(() => import('./components/WidgetComponent/Widget'));
const LandingPage = lazy(() => import('./components/LandingPageComponent/LandingPage'));
const EditSpace = lazy(()=> import('./components/spaceCreationModule/EditSpace'))


function App() {
    return (
        <Router>
            {/* Fallback UI during lazy loading */}
            <Suspense
                fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh' // Full viewport height for vertical centering
                    }}>
                        <img src={loadingGif} alt="Loading..." style={{ width: '100px' }} />
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/space/:mode" element={<SpaceCreation />} />
                    <Route path="/space/:mode/:spaceId" element={<EditSpace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/form/:spaceName" element={<FormPage />} />
                    <Route path="/space/dashboard/:spaceID" element={<SpaceDashboard />} />
                    <Route path="/space/:spaceURL/wall-of-love" element={<EmbeddebleWidget />} />
                    <Route path="/space/:spaceId/widget" element={<TestimonialsPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
