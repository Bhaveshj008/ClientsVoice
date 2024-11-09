import React, { useEffect, useState } from 'react';
import api from '../api';
import SpaceCard from './SpaceCard';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [spaces, setSpaces] = useState([]);
  const [spaceCount, setSpaceCount] = useState(0);
  const [currentPlan, setCurrentPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch spaces and other data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        if (response) {
          setSpaces(response.data.spaces || []);
          setSpaceCount(response.data.spaceCount || 0);
          setCurrentPlan(response.data.currentPlan || 'N/A');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-veryDarkPurple min-h-screen text-almostWhite">
      <div className="p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-almostWhite">ClientsVoice</h1>
          <nav className="flex space-x-6 text-lightLavender">
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
            <a href="#signin" className="hover:text-brightLavender">Sign in</a>
            <button className="bg-brightLavender text-veryDarkPurple px-4 py-2 rounded-md">Try Free</button>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-darkPurple p-4 rounded-lg text-center">
            {/* Placeholder for Pie Chart */}
            <p className="text-lightLavender">Pie Chart</p>
          </div>
          <div className="bg-darkPurple p-4 rounded-lg text-center col-span-2">
            {/* Placeholder for Bar Chart */}
            <p className="text-lightLavender">Bar Chart</p>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-almostWhite">Spaces</h2>
            <Link to="/create-space">
            <button className="bg-brightLavender text-veryDarkPurple px-4 py-2 rounded-md">
                + Create New Space
            </button>
        </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spaces.length > 0 ? (
              spaces.map((space) => (
                <SpaceCard key={space._id} space={space} />
              ))
            ) : (
              <div className="text-center text-lightLavender col-span-3">
                <p>No spaces yet.</p>
                <p>Create your first space to start collecting testimonials.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-almostWhite mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OverviewCard title="Total Spaces" value={spaceCount} />
            <OverviewCard title="Current Plan" value={currentPlan} />
          </div>
        </section>
      </div>
    </div>
  );
}



function OverviewCard({ title, value }) {
  return (
    <div className="bg-darkPurple p-4 rounded-lg text-center">
      <h3 className="text-xl font-semibold text-almostWhite">{title}</h3>
      <p className="text-lg text-brightLavender">{value}</p>
    </div>
  );
}

export default Dashboard;
