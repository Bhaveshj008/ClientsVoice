// AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { FiUsers, FiActivity, FiSearch, FiRefreshCw , FiLogOut} from 'react-icons/fi';
import { BiWorld } from 'react-icons/bi';
import "react-datepicker/dist/react-datepicker.css";

import { useDebounce } from './hooks/useDebounce';
import { TableSkeleton, StatsSkeleton } from './components/dashboard/LoadingSkeletons';
import { GrowthChart, ResponseDistributionChart, UserActivityChart, SpaceUtilizationChart, SpaceUtilizationPieChart } from './components/dashboard/Charts';
import { AdvancedFilters } from './components/dashboard/Filters';
import api from '../components/api';

import StatsCard from './components/dashboard/StatsCard';
import {EnhancedClientRow, EnhancedPagination, EnhancedTableHeader} from './components/dashboard/TableComponents'
import EnhancedClientDetailsModal from './components/dashboard/EnhancedClientDetailsModal'

import { useAuth } from './hooks/useAuth';
import { useNavigate } from 'react-router-dom';




const AdminDashboard = () => {
  // Enhanced State Management
  const [dashboardData, setDashboardData] = useState({
    clients: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Add logout handler
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  const [overallStats, setOverallStats] = useState({
    totalClients: 0,
    totalSpaces: 0,
    totalResponses: 0,
    activeSpaces: 0,
    googleUsers: 0,
    localUsers: 0,
    lastMonthGrowth: 0,
    revenueStats: {
      current: 0,
      previous: 0,
      growth: 0
    },
    activityMetrics: []
  });

  const [analyticsData, setAnalyticsData] = useState({
    dailyGrowth: [],
    userActivity: [],
    responseDistribution: [],
    spaceUtilization: []
  });

  const [loading, setLoading] = useState({
    stats: true,
    clients: true,
    analytics: true
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d'); // '7d', '30d', '90d'
  const [filters, setFilters] = useState({
    search: '',
    authProvider: '',
    dateFrom: null,
    dateTo: null,
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Debounced search
  const debouncedSearch = useDebounce((value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setCurrentPage(1);
  }, 500);

  // Fetch functions
  const fetchOverallStats = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const response = await api.get('/admin/dashboard/stats');
      setOverallStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(prev => ({ ...prev, analytics: true }));
      const response = await api.get(`/admin/dashboard/analytics?timeRange=${selectedTimeRange}`);
      setAnalyticsData(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(prev => ({ ...prev, analytics: false }));
    }
  };

  const fetchClientData = async () => {
    try {
      setLoading(prev => ({ ...prev, clients: true }));
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        search: filters.search,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.authProvider && { authProvider: filters.authProvider }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom.toISOString() }),
        ...(filters.dateTo && { dateTo: filters.dateTo.toISOString() }),
        ...(filters.status !== 'all' && { status: filters.status })
      });

      const response = await api.get(`/admin/dashboard/clients?${queryParams}`);
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(prev => ({ ...prev, clients: false }));
    }
  };

  // Effects
  useEffect(() => {
    fetchOverallStats();
    fetchAnalytics();
  }, [selectedTimeRange]);

  useEffect(() => {
    fetchClientData();
  }, [currentPage, filters]);

  // Handlers
  const handleRefresh = () => {
    fetchOverallStats();
    fetchClientData();
    fetchAnalytics();
  };

  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  // Memoized values
  const growthTrend = useMemo(() => {
    if (!analyticsData.dailyGrowth.length) return 0;
    const latest = analyticsData.dailyGrowth[analyticsData.dailyGrowth.length - 1].value;
    const previous = analyticsData.dailyGrowth[0].value;
    return previous === 0 ? 100 : ((latest - previous) / previous) * 100;
  }, [analyticsData.dailyGrowth]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome to the ClientsVoice admin dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={handleRefresh}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiRefreshCw className="mr-2" /> Refresh
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {loading.stats ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Clients"
              value={overallStats.totalClients}
              trend={overallStats.lastMonthGrowth}
              icon={<FiUsers className="w-6 h-6" />}
              color="bg-blue-500"
            />
            <StatsCard
              title="Active Spaces"
              value={overallStats.activeSpaces}
              subtitle={`${overallStats.totalSpaces} Total Spaces`}
              icon={<BiWorld className="w-6 h-6" />}
              color="bg-green-500"
            />
            <StatsCard
              title="Total Responses"
              value={overallStats.totalResponses}
              trend={growthTrend}
              icon={<FiActivity className="w-6 h-6" />}
              color="bg-purple-500"
            />
            <StatsCard
              title="User Distribution"
              value={`${Math.round((overallStats.googleUsers / overallStats.totalClients) * 100)}%`}
              subtitle={`${overallStats.googleUsers} Google Users`}
              icon={<FiUsers className="w-6 h-6" />}
              color="bg-orange-500"
            />
          </div>
        )}

        {/* Analytics Charts */}
        {showAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GrowthChart data={analyticsData.dailyGrowth} />
            <ResponseDistributionChart data={analyticsData.responseDistribution} />
            <UserActivityChart data={analyticsData.userActivity} />
            <SpaceUtilizationChart data={analyticsData.spaceUtilization} />
            <SpaceUtilizationPieChart data={analyticsData.spaceUtilization} />
          </div>
        )}

        {/* Enhanced Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AdvancedFilters filters={filters} onFilterChange={setFilters} />
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
              >
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading.clients ? (
            <TableSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <EnhancedTableHeader onSort={handleSort} sortConfig={filters} />
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.clients.map((client) => (
                    <EnhancedClientRow
                      key={client._id}
                      client={client}
                      onViewDetails={() => setSelectedClient(client)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        <EnhancedPagination
          currentPage={currentPage}
          totalPages={dashboardData.pagination.totalPages}
          onPageChange={setCurrentPage}
          totalItems={dashboardData.pagination.totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Enhanced Modal */}
      {selectedClient && (
        <EnhancedClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};


export default AdminDashboard;