import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import FeedbackModal from './FeedbackModal';
import ResponseCard from './ResponseCard';
import StatsHeader from './StatsHeader';
import EmbeddableWidget from './EmbeddebleWidget'; // Import EmbeddableWidget
import api from '../api';

const Dashboard = () => {
  const [totalStats, setTotalStats] = useState({ totalFeedbacks: 0, totalTestimonials: 0 });
  const [responses, setResponses] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Add activeComponent state
  const { spaceID } = useParams();

  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  useEffect(() => {
    fetchStats();
    fetchResponses();
  }, [spaceID]);

  const fetchStats = async () => {
    try {
      const response = await api.get(`${spaceID}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchResponses = async () => {
    try {
      const response = await api.get(`${spaceID}/responses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponses(response.data || []);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  const toggleLike = async (testimonialID) => {
    try {
      await api.post(`${spaceID}/testimonial/${testimonialID}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchResponses();
    } catch (error) {
      console.error("Error liking testimonial:", error);
    }
  };

  const toggleArchive = async (testimonialID) => {
    try {
      await api.post(`${spaceID}/testimonial/${testimonialID}/archive`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchResponses();
    } catch (error) {
      console.error("Error archiving testimonial:", error);
    }
  };

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setSelectedFeedback(null);
    setIsModalOpen(false);
  };

  const filteredResponses = responses.filter(({ testimonial }) => {
    if (filter === 'Liked') return testimonial.liked;
    if (filter === 'Archived') return testimonial.archived;
    return !testimonial.archived;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <div className="flex">
        <Sidebar 
          filter={filter} 
          setFilter={setFilter} 
          spaceURL={totalStats.spaceURL} 
          setActiveComponent={setActiveComponent} // Pass setActiveComponent to Sidebar
        />
        <main className="flex-1 p-6 space-y-6">
          {activeComponent === 'dashboard' ? ( // Conditional rendering for dashboard view
            <>
              <StatsHeader totalStats={totalStats} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResponses.map(({ feedback, testimonial }, index) => (
                  <ResponseCard
                    key={index}
                    testimonial={testimonial}
                    feedback={feedback}
                    toggleLike={toggleLike}
                    toggleArchive={toggleArchive}
                    openFeedbackModal={openFeedbackModal}
                  />
                ))}
              </div>
            </>
          ) : (
            // Render EmbeddableWidget when activeComponent is set to 'wallOfLove'
            <EmbeddableWidget spaceID={spaceID} />
          )}
        </main>
      </div>
      {isModalOpen && selectedFeedback && (
        <FeedbackModal feedback={selectedFeedback} onClose={closeFeedbackModal} />
      )}
    </div>
  );
};

export default Dashboard;
