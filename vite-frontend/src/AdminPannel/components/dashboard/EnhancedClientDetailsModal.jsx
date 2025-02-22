import { useEffect, useState } from "react";
import { FiPlus, FiX, FiLogIn, FiMessageSquare } from "react-icons/fi";
import { calculateResponseStats, calculateSpaceResponseRate } from "../../utils/calculateResponseStats";
import { formatDistanceToNow, format } from 'date-fns';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import api from "../../../components/api";
import { Switch } from '@headlessui/react';



const EnhancedClientDetailsModal = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [detailedStats, setDetailedStats] = useState(null);

  useEffect(() => {
    fetchDetailedStats();
  }, [client._id]);

  const fetchDetailedStats = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/dashboard/client/${client._id}/stats`);
      setDetailedStats(response.data.data);
    } catch (error) {
      console.error('Error fetching detailed stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'spaces', label: 'Spaces' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {client.profilePicture ? (
                <img
                  src={client.profilePicture}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium text-lg">
                  {client.name.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'overview' && (
            <ClientOverviewTab client={client} detailedStats={detailedStats} loading={loading} />
          )}
          {activeTab === 'spaces' && (
            <ClientSpacesTab spaces={client.spaceDetails} />
          )}
          {activeTab === 'activity' && (
            <ClientActivityTab clientId={client._id} />
          )}
          {activeTab === 'settings' && (
            <ClientSettingsTab client={client} />
          )}
        </div>
      </div>
    </div>
  );
};
const ClientOverviewTab = ({ client, detailedStats, loading }) => {
  // Calculate total responses
  const totalResponses = client.spaceDetails?.reduce((sum, space) => 
    sum + (space.responsesCount || 0), 0
  ) || 0;

  // Calculate active spaces
  const activeSpaces = client.spaceDetails?.filter(space => {
    return space.responsesCount > 0 && 
           new Date(space.lastResponseAt || space.updatedAt) > 
           new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  }).length || 0;

  // Calculate response rates and statistics
  const responseStats = calculateResponseStats(client.spaceDetails);

  return (
    <div className="p-6 space-y-6">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <QuickStatCard
              title="Total Responses"
              value={totalResponses}
              trend={detailedStats?.responseTrend}
            />
            <QuickStatCard
              title="Active Spaces"
              value={activeSpaces}
              total={client.spaceDetails?.length || 0}
            />
            <QuickStatCard
              title="Response Rate"
              value={`${responseStats.averageResponseRate}%`}
              subtitle={`${responseStats.avgResponsesPerSpace} per space`}
              trend={responseStats.responseRateTrend}
            />
            <QuickStatCard
              title="Last Active"
              value={formatDistanceToNow(new Date(client.lastLogin || client.createdAt), { addSuffix: true })}
            />
          </div>

          {/* Response Distribution */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Response Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Response Stats */}
              <div className="space-y-4">
                <ResponseStatItem
                  label="Highest Responses"
                  value={responseStats.highestResponses}
                  spaceName={responseStats.highestResponseSpace}
                />
                <ResponseStatItem
                  label="Average Responses"
                  value={responseStats.avgResponsesPerSpace}
                  subtitle="per space"
                />
                <ResponseStatItem
                  label="Active Rate"
                  value={`${Math.round((activeSpaces / (client.spaceDetails?.length || 1)) * 100)}%`}
                  subtitle="of spaces are active"
                />
              </div>
              
              {/* Response Chart */}
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responseStats.distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="responses" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Client Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Registration Date" value={format(new Date(client.registrationDate), 'PPP')} />
              <InfoItem label="Auth Provider" value={client.authProvider} />
              <InfoItem label="Subscription Plan" value={client.subscriptionPlan || 'None'} />
              <InfoItem label="Status" value={client.status} />
            </div>
          </div>

          {/* Space Status Breakdown */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Space Status</h3>
            <div className="space-y-4">
              {client.spaceDetails?.map(space => (
                <SpaceStatusItem
                  key={space._id}
                  space={space}
                  isActive={isSpaceActive(space)}
                  responseRate={calculateSpaceResponseRate(space)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ResponseStatItem = ({ label, value, spaceName, subtitle }) => (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        {spaceName && <p className="text-xs text-gray-500">{spaceName}</p>}
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  );

  const QuickStatCard = ({ title, value, trend, total }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
      {trend !== undefined && (
        <p className={`text-sm mt-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </p>
      )}
      {total !== undefined && (
        <p className="text-sm text-gray-500 mt-1">out of {total} total</p>
      )}
    </div>
  );
  const InfoItem = ({ label, value }) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium capitalize">{value}</p>
    </div>
  );

  const SpaceStatusItem = ({ space, isActive, responseRate }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        {space.logo ? (
          <img src={space.logo} alt="" className="h-8 w-8 rounded" />
        ) : (
          <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
            <FiGrid className="text-gray-400" />
          </div>
        )}
        <div>
          <p className="font-medium text-sm">{space.spaceName}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{space.responsesCount || 0} responses</span>
            <span>•</span>
            <span>{responseRate} responses/day</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-sm font-medium">
            {calculateSpaceResponseRate(space)} responses/day
          </p>
          <p className="text-xs text-gray-500">
            Last response: {formatDistanceToNow(new Date(space.lastResponseAt || space.updatedAt), { addSuffix: true })}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );

  const isSpaceActive = (space) => {
    if (!space) return false;
    
    // Consider a space active if:
    // 1. It has responses
    // 2. The last response was within the last 30 days
    const hasResponses = space.responsesCount > 0;
    const lastActivity = new Date(space.lastResponseAt || space.updatedAt);
    const isRecent = lastActivity > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    return hasResponses && isRecent;
  };

  const ClientSpacesTab = ({ spaces }) => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spaces?.map(space => (
          <SpaceCard key={space._id} space={space} />
        ))}
      </div>
    </div>
  );
  

  const SpaceCard = ({ space }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-3">
        {space.logo ? (
          <img src={space.logo} alt="" className="h-8 w-8 rounded" />
        ) : (
          <div className="h-8 w-8 rounded bg-gray-200 flex items-center justify-center">
            <FiGrid className="text-gray-400" />
          </div>
        )}
        <h4 className="font-medium">{space.spaceName}</h4>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <InfoItem label="Organization" value={space.organizationName} />
        <InfoItem label="Category" value={space.businessCategory} />
        <InfoItem label="Responses" value={space.responsesCount || 0} />
        <InfoItem label="Status" value={space.status || 'active'} />
      </div>
    </div>
  );

  const ClientActivityTab = ({ clientId }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchActivities();
    }, [clientId]);
  
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/admin/dashboard/client/${clientId}/activities`);
        setActivities(response.data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return <ActivitySkeleton />;
    }
  
    return (
      <div className="p-6">
        {activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <FiActivity className="mx-auto h-12 w-12 mb-4" />
            <p>No recent activities found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem key={activity._id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const ActivitySkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="animate-pulse flex items-center space-x-3 py-3">
          <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );

  
  const ActivityItem = ({ activity }) => {
    const getFormattedTime = (timestamp) => {
      try {
        if (!timestamp) return 'No date';
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return 'Invalid date';
        return formatDistanceToNow(date, { addSuffix: true });
      } catch (error) {
        return 'Invalid date';
      }
    };
  
    const getActivityIcon = () => {
      switch (activity.type) {
        case 'login':
          return <FiLogIn className="text-green-500" />;
        case 'space_created':
          return <FiPlus className="text-blue-500" />;
        case 'response_received':
          return <FiMessageSquare className="text-purple-500" />;
        default:
          return <FiActivity className="text-gray-500" />;
      }
    };
  
    return (
      <div className="flex items-center space-x-3 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex items-center justify-center w-8 h-8">
          {getActivityIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{activity.description}</p>
          {activity.metadata && (
            <p className="text-xs text-gray-400 mt-1">
              {Object.entries(activity.metadata)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' • ')}
            </p>
          )}
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {getFormattedTime(activity.timestamp)}
        </span>
      </div>
    );
  };


  const ClientSettingsTab = ({ client }) => {
    // Initialize state with client data
    const [settings, setSettings] = useState({
      status: client?.status || 'active',
      notifications: true,
      emailUpdates: true,
      twoFactorAuth: false,
      subscription: client?.subscriptionPlan || 'free'
    });
  
    const handleSettingChange = (setting, value) => {
      setSettings(prev => ({ ...prev, [setting]: value }));
    };
  
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
            
            <div className="mt-6 space-y-6">
              <SettingToggle
                label="Account Status"
                value={settings.status}
                onChange={(value) => handleSettingChange('status', value)}
                type="select"
                options={['active', 'inactive', 'suspended']}
              />
  
              <SettingToggle
                label="Email Notifications"
                value={settings.notifications}
                onChange={(value) => handleSettingChange('notifications', value)}
                type="switch"
              />
  
              <SettingToggle
                label="Marketing Updates"
                value={settings.emailUpdates}
                onChange={(value) => handleSettingChange('emailUpdates', value)}
                type="switch"
              />
  
              <SettingToggle
                label="Two-Factor Authentication"
                value={settings.twoFactorAuth}
                onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                type="switch"
              />
  
              <SettingToggle
                label="Subscription Plan"
                value={settings.subscription}
                onChange={(value) => handleSettingChange('subscription', value)}
                type="select"
                options={['free', 'basic', 'premium', 'enterprise']}
              />
            </div>
  
            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => console.log('Settings saved:', settings)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
  
        {/* Additional Settings Sections */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
            <div className="mt-4 text-sm text-gray-500">
              <p>Last login: {new Date(client?.lastLogin).toLocaleDateString()}</p>
              <p>Auth Provider: {client?.authProvider}</p>
            </div>
          </div>
        </div>
  
        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-4 space-y-2">
              {/* Add activity items here */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SettingToggle = ({ label, value, onChange, type = 'select', options }) => {
    if (type === 'switch') {
      return (
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-700">{label}</span>
          <Switch
            checked={value}
            onChange={onChange}
            className={`${
              value ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span className="sr-only">{label}</span>
            <span
              className={`${
                value ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      );
    }
  
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-700">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-1/3 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
export default EnhancedClientDetailsModal;