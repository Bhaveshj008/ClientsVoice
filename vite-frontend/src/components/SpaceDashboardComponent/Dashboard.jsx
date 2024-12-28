import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../Header';
import Sidebar from './Sidebar';
import FeedbackModal from './FeedbackModal';
import ResponseCard from './ResponseCard';
import StatsHeader from './StatsHeader';
import EmbeddableWidget from '../WidgetComponent/EmbeddebleWidget';
import api from '../api';
import EmptyState from './EmptyState';

const Dashboard = () => {
  const [totalStats, setTotalStats] = useState({ totalFeedbacks: 0, totalTestimonials: 0 });
  const [responses, setResponses] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const { spaceID } = useParams();

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (token && spaceID) {
      fetchStats();
      fetchResponses();
    }
  }, [spaceID, token]);  

  const fetchStats = async () => {
    try {
      const response = await api.get(`${spaceID}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
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

  // Filter the responses based on the filter state
  const filteredResponses = responses.filter(({ testimonial }) => {
    if (filter === 'Liked') return testimonial.liked;
    if (filter === 'Archived') return testimonial.archived;
    return !testimonial.archived;  // Default is to show non-archived
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar 
          filter={filter} 
          setFilter={setFilter} 
          spaceURL={totalStats.spaceURL} 
          spaceName={totalStats.spaceName} 
          spaceLogo={totalStats.logo} 
          setActiveComponent={setActiveComponent} 
        />
        <main className="flex-1 max-w-[1100px] lg:max-w-[960px] xl:max-w-screen-lg p-6 space-y-6 mx-auto">
        {activeComponent === 'dashboard' ? (
  <>
    <StatsHeader totalStats={totalStats} spaceId={spaceID}/>
    <div className="space-y-6">
      {filteredResponses.length > 0 ? (
        filteredResponses.map(({ feedback, testimonial }, index) => (
          <ResponseCard
            key={index}
            testimonial={testimonial}
            feedback={feedback}
            toggleLike={toggleLike}
            toggleArchive={toggleArchive}
            openFeedbackModal={openFeedbackModal}
          />
        ))
      ) : (
        <EmptyState spaceURL={totalStats.spaceURL} />
      )}
    </div>
  </>
) : (
  <EmbeddableWidget spaceID={spaceID} />
)}        </main>
      </div>
      {isModalOpen && selectedFeedback && (
        <FeedbackModal feedback={selectedFeedback} onClose={closeFeedbackModal} />
      )}
    </div>
  );
};

export default Dashboard;
