import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DashboardContent from './DashboardContent';
import Sidebar from './Sidebar';
import FeedbackModal from './FeedbackModal';
import EmbeddableWidget from '../WidgetComponent/EmbeddebleWidget';
import api from '../api';
import CheckToken from '../CheckToken';
import '../../App.css'


const REFRESH_INTERVAL = 5 * 60 * 1000;

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [totalStats, setTotalStats] = useState({ totalFeedbacks: 0, totalTestimonials: 0 });
  const [responsesByFilter, setResponsesByFilter] = useState({
    All: [],
    Liked: [],
    Archived: []
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [pageByFilter, setPageByFilter] = useState({
    All: 1,
    Liked: 1,
    Archived: 1
  });
  const [loading, setLoading] = useState(false);
  const [hasMoreByFilter, setHasMoreByFilter] = useState({
    All: true,
    Liked: true,
    Archived: true
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { spaceID } = useParams();
  const refreshIntervalRef = useRef(null);
  const token = localStorage.getItem('token');
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (token && spaceID) {
      const initialize = async () => {
        await fetchStats();
        await fetchResponses();
        initialLoadRef.current = false;
      };
      
      initialize();

      refreshIntervalRef.current = setInterval(() => {
        fetchStats();
        fetchResponses(true);
      }, REFRESH_INTERVAL);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [spaceID, token]);

  useEffect(() => {
    if (!initialLoadRef.current && responsesByFilter[filter].length === 0 && hasMoreByFilter[filter]) {
      fetchResponses();
    }
  }, [filter]);

  useEffect(() => {
    if (!initialLoadRef.current && pageByFilter[filter] > 1) {
      fetchResponses();
    }
  }, [pageByFilter[filter]]);

  const handleManualRefresh = async () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      try {
        await fetchStats();
        await fetchResponses(true);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

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

  const fetchResponses = async (isRefresh = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      const currentPage = isRefresh ? 1 : pageByFilter[filter];
      
      const response = await api.get(`${spaceID}/responses`, {
        params: {
          page: currentPage,
          limit: 5,
          filter
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setResponsesByFilter(prev => ({
        ...prev,
        [filter]: isRefresh || currentPage === 1 ? 
          response.data.responses : 
          [...prev[filter], ...response.data.responses]
      }));

      setHasMoreByFilter(prev => ({
        ...prev,
        [filter]: response.data.hasMore
      }));

      if (isRefresh) {
        setPageByFilter(prev => ({
          ...prev,
          [filter]: 1
        }));
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageUpdate = () => {
    if (!loading && hasMoreByFilter[filter]) {
      setPageByFilter(prev => ({
        ...prev,
        [filter]: prev[filter] + 1
      }));
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
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <CheckToken />
      
      {/* Sidebar Container */}
      <div 
        className={`
          fixed lg:static
          inset-y-0 left-0
          transform lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-200 ease-in-out
          w-72 lg:w-64 xl:w-72
          z-30
        `}
      >
        <Sidebar 
          filter={filter} 
          setFilter={setFilter} 
          spaceURL={totalStats.spaceURL} 
          spaceName={totalStats.spaceName} 
          spaceLogo={totalStats.logo} 
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
          onMobileItemClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-10 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <Menu className="h-6 w-6 text-gray-200" />
          </button>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-4 lg:px-8 ">
          {activeComponent === 'dashboard' ? (
            <DashboardContent
              spaceID={spaceID}
              totalStats={totalStats}
              responsesByFilter={responsesByFilter}
              setResponsesByFilter={setResponsesByFilter}
              filter={filter}
              loading={loading}
              hasMore={hasMoreByFilter[filter]}
              isRefreshing={isRefreshing}
              handleManualRefresh={handleManualRefresh}
              handlePageUpdate={handlePageUpdate}
              openFeedbackModal={openFeedbackModal}
            />
          ) : (
            <EmbeddableWidget spaceID={spaceID} />
          )}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && selectedFeedback && (
        <FeedbackModal feedback={selectedFeedback} onClose={closeFeedbackModal} />
      )}
    </div>
  );
};


export default Dashboard;
