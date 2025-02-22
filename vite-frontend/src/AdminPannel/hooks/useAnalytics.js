import { useState, useEffect } from 'react';
import api from '../api';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    dailyGrowth: [],
    responseRate: [],
    userActivity: [],
    spaceDistribution: []
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/admin/dashboard/analytics');
      setAnalyticsData(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { analyticsData, loading, refetch: fetchAnalytics };
};