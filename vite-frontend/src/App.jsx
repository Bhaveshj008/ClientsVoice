import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loadingGif from './components/LandingPageComponent/loading.gif';

// Lazy load components to optimize performance
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const SpaceCreation = lazy(() => import('./components/spaceCreationModule/SpaceCreation'));
const Dashboard = lazy(() => import('./components/DashboardComponent/Dashboard'));
const FormPage = lazy(() => import('./components/publicForm/components/FormPage'));
const SpaceDashboard = lazy(() => import('./components/SpaceDashboardComponent/Dashboard'));
const EmbeddebleWidget = lazy(() => import('./components/WidgetComponent/EmbeddebleWidget'));
const TestimonialsPage = lazy(() => import('./components/WidgetComponent/Widget'));
const LandingPage = lazy(() => import('./components/LandingPageComponent/LandingPage'));
const EditSpace = lazy(() => import('./components/spaceCreationModule/EditSpace'));

// ErrorBoundary to catch any errors in lazy-loaded components
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error in lazy-loaded component:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }

        return this.props.children;
    }
}

function App() {
    return (
        <Router
            // Opt-in to React Router v7's startTransition and relativeSplatPath feature flags
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            {/* Fallback UI during lazy loading */}
            <Suspense
                fallback={
                    <div
                        className="flex justify-center items-center h-screen"
                        style={{ backgroundColor: '#f3f4f6' }}
                    >
                        <img src={loadingGif} alt="Loading..." className="w-24" />
                    </div>
                }
            >
                <ErrorBoundary>
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
                </ErrorBoundary>
            </Suspense>
        </Router>
    );
}

export default App;
