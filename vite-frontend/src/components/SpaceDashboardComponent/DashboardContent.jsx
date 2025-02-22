import React, { useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import ResponseList from './ResponseList';

import api from '../api';
import DashboardHeader from './DashboardHeader';


const DashboardContent = ({ 
  spaceID, 
  totalStats,
  responsesByFilter,
  setResponsesByFilter,
  filter,
  loading,
  hasMore,
  isRefreshing,
  handleManualRefresh,
  handlePageUpdate,
  openFeedbackModal 
}) => {
  const observer = useRef();
  const token = localStorage.getItem('token');

  const lastResponseElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        handlePageUpdate();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, handlePageUpdate]);

  const toggleLike = async (testimonialID) => {
    try {
      await api.post(`${spaceID}/testimonial/${testimonialID}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setResponsesByFilter(prev => {
        const newState = { ...prev };
        ['All', 'Liked', 'Archived'].forEach(filterKey => {
          newState[filterKey] = prev[filterKey].map(item => {
            if (item.testimonial._id === testimonialID) {
              return {
                ...item,
                testimonial: {
                  ...item.testimonial,
                  liked: !item.testimonial.liked
                }
              };
            }
            return item;
          });
        });
        return newState;
      });
    } catch (error) {
      console.error("Error liking testimonial:", error);
    }
  };

  const toggleArchive = async (testimonialID) => {
    try {
      await api.post(`${spaceID}/testimonial/${testimonialID}/archive`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setResponsesByFilter(prev => {
        const newState = { ...prev };
        ['All', 'Liked', 'Archived'].forEach(filterKey => {
          newState[filterKey] = prev[filterKey].map(item => {
            if (item.testimonial._id === testimonialID) {
              const newArchivedState = !item.testimonial.archived;
              if (
                (filterKey === 'Archived' && !newArchivedState) ||
                (filterKey === 'All' && newArchivedState)
              ) {
                return null;
              }
              return {
                ...item,
                testimonial: {
                  ...item.testimonial,
                  archived: newArchivedState
                }
              };
            }
            return item;
          }).filter(Boolean);
        });
        return newState;
      });
    } catch (error) {
      console.error("Error archiving testimonial:", error);
    }
  };

  return (
    <>
     <DashboardHeader
        totalStats={totalStats}
        spaceId={spaceID}
        isRefreshing={isRefreshing}
        handleManualRefresh={handleManualRefresh}
      />
      <ResponseList 
        responses={responsesByFilter[filter] || []}
        loading={loading}
        lastResponseElementRef={lastResponseElementRef}
        toggleLike={toggleLike}
        toggleArchive={toggleArchive}
        openFeedbackModal={openFeedbackModal}
        spaceURL={totalStats.spaceURL}
      />
    </>
  );
};

export default DashboardContent;