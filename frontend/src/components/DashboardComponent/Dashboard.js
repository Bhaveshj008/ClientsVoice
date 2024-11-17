import React, { useEffect, useState } from 'react';
import api from '../api';
import SpaceCard from './SpaceCard';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';

function Dashboard() {
  const [spaces, setSpaces] = useState([]);
  const [spaceCount, setSpaceCount] = useState(0);
  const [currentPlan, setCurrentPlan] = useState('N/A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
          setSpaces(response.data.spaces || []);
          setSpaceCount(response.data.spaceCount || 0);
          setCurrentPlan(response.data.currentPlan || 'N/A');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/'); // Redirect to login
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleEditSpace = (spaceId) => {
    navigate(`/space/edit/${spaceId}`);
  };

  const handleDeleteSpace = (spaceId) => {
    setSpaces((prevSpaces) => prevSpaces.filter((space) => space._id !== spaceId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header />
      <div className="container mx-auto p-4 md:p-8">

        <div className="container mx-auto max-w-screen-xl">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <DashboardCard title="Overview" type="pie" />
          <DashboardCard title="Performance" type="bar" className="lg:col-span-2" />
        </section>

        {/* Spaces Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Spaces</h2>
            <Link to="/space/create">
              <button className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 border border-purple-500 transition-all">
                <b>+ Create New Space</b>
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.length > 0 ? (
              spaces.map((space) => (
                <SpaceCard
                  key={space._id}
                  space={space}
                  onEdit={handleEditSpace}
                  onDelete={handleDeleteSpace}
                />
              ))
            ) : (
              <div className="col-span-full">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all">
                <p className="text-gray-400 text-center text-lg">
                  No spaces yet. 
                  <span className="block mt-2 text-purple-400 font-semibold">
                    Create your first space to start collecting testimonials and feedbacks.
                  </span>
                </p>
                <div className="flex justify-center mt-4">
                  <Link to="/space/create">
                    <button className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 border border-purple-500 transition-all">
                      <b>+ Create New Space</b>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>

        {/* Overview Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <OverviewCard title="Total Spaces" value={spaceCount} />
            <OverviewCard title="Current Plan" value={currentPlan} />
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}

function DashboardCard({ title, type, className }) {
  return (
    <div
      className={`bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-gray-700 hover:shadow-xl hover:border-purple-500 hover:text-purple-300 transition-all ${className}`}
    >
      <p className="text-lg font-semibold">{title}</p>
      <div className="mt-2 text-gray-400">{type === 'pie' ? 'Pie Chart' : 'Bar Chart'}</div>
    </div>
  );
}

function OverviewCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-gray-700 hover:shadow-xl hover:border-purple-500 hover:text-purple-300 transition-all">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-lg text-gray-400">{value}</p>
    </div>
  );
}

export default Dashboard;
