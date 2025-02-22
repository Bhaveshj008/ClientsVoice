// adminDashboardController.js
const Client = require('../models/ClientModel');
const Space = require('../models/spaceModel');
const mongoose = require('mongoose');

const adminDashboardController = {
    // Get overall dashboard stats (for the top stats cards)
    async getOverallStats(req, res) {
        try {
            // Get all stats in parallel for better performance
            const [
                totalClients,
                spaceStats,
                authProviderCounts,
                activeClientsCount
            ] = await Promise.all([
                // Total clients count
                Client.countDocuments(),

                // Aggregate space statistics
                Space.aggregate([
                    {
                        $group: {
                            _id: null,
                            totalSpaces: { $sum: 1 },
                            totalResponses: { $sum: '$responsesCount' }
                        }
                    }
                ]),

                // Count of clients by auth provider
                Client.aggregate([
                    {
                        $group: {
                            _id: '$authProvider',
                            count: { $sum: 1 }
                        }
                    }
                ]),

                // Active clients in last 30 days
                Client.countDocuments({
                    lastLogin: {
                        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    }
                })
            ]);

            const stats = {
                totalClients,
                totalSpaces: spaceStats[0]?.totalSpaces || 0,
                totalResponses: spaceStats[0]?.totalResponses || 0,
                activeClients: activeClientsCount,
                authProviders: {
                    google: authProviderCounts.find(p => p._id === 'google')?.count || 0,
                    local: authProviderCounts.find(p => p._id === 'local')?.count || 0
                }
            };

            res.status(200).json({
                success: true,
                data: stats
            });

        } catch (error) {
            console.error('Error fetching overall stats:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch overall statistics'
            });
        }
    },

    // Get paginated clients with their spaces
    async getClientsWithSpaces(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const authProvider = req.query.authProvider;

            // Build filter conditions
            let filterConditions = {};

            // Search filter
            if (search) {
                filterConditions.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ];
            }

            // Auth provider filter
            if (authProvider) {
                filterConditions.authProvider = authProvider;
            }

            // Get clients with their spaces using aggregation
            const clients = await Client.aggregate([
                { $match: filterConditions },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'spaces',
                        localField: 'spaces',
                        foreignField: '_id',
                        as: 'spaceDetails'
                    }
                }
            ]);

            // Get total count for pagination
            const totalClients = await Client.countDocuments(filterConditions);
            const totalPages = Math.ceil(totalClients / limit);

            res.status(200).json({
                success: true,
                data: {
                    clients,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems: totalClients,
                        hasNextPage: page < totalPages,
                        hasPrevPage: page > 1
                    }
                }
            });

        } catch (error) {
            console.error('Error fetching clients:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch clients data'
            });
        }
    },

    // Get single client details
    async getClientDetails(req, res) {
        try {
            const { clientId } = req.params;

            const client = await Client.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(clientId)
                    }
                },
                {
                    $lookup: {
                        from: 'spaces',
                        localField: 'spaces',
                        foreignField: '_id',
                        as: 'spaceDetails'
                    }
                }
            ]);

            if (!client.length) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found'
                });
            }

            res.status(200).json({
                success: true,
                data: client[0]
            });

        } catch (error) {
            console.error('Error fetching client details:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch client details'
            });
        }
    },

    async getDashboardAnalytics(req, res) {
        try {
            const { timeRange = '7d' } = req.query;
            
            // Calculate date range
            const endDate = new Date();
            const startDate = new Date();
            switch (timeRange) {
                case '30d':
                    startDate.setDate(startDate.getDate() - 30);
                    break;
                case '90d':
                    startDate.setDate(startDate.getDate() - 90);
                    break;
                default: // 7d
                    startDate.setDate(startDate.getDate() - 7);
            }

            // Get all required analytics in parallel
            const [
                dailyGrowth,
                userActivity,
                responseDistribution,
                spaceUtilization
            ] = await Promise.all([
                // Daily growth (new clients/spaces)
                Client.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $sort: { "_id": 1 }
                    }
                ]),

                // User activity (logins, space creations)
                Client.aggregate([
                    {
                        $match: {
                            lastLogin: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$lastLogin" }
                            },
                            activeUsers: { $sum: 1 },
                            newUsers: {
                                $sum: {
                                    $cond: [
                                        { $gte: ["$createdAt", startDate] },
                                        1,
                                        0
                                    ]
                                }
                            }
                        }
                    },
                    {
                        $sort: { "_id": 1 }
                    }
                ]),

                // Response distribution
                Space.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                            },
                            responses: { $sum: "$responsesCount" }
                        }
                    },
                    {
                        $sort: { "_id": 1 }
                    }
                ]),

                // Space utilization
                Space.aggregate([
                    {
                        $group: {
                            _id: "$businessCategory",
                            count: { $sum: 1 },
                            totalResponses: { $sum: "$responsesCount" }
                        }
                    }
                ])
            ]);

            // Format the data for frontend charts
            const formattedData = {
                dailyGrowth: dailyGrowth.map(item => ({
                    date: item._id,
                    value: item.count
                })),
                userActivity: userActivity.map(item => ({
                    date: item._id,
                    activeUsers: item.activeUsers,
                    newUsers: item.newUsers
                })),
                responseDistribution: responseDistribution.map(item => ({
                    date: item._id,
                    responses: item.responses
                })),
                spaceUtilization: spaceUtilization.map(item => ({
                    category: item._id || 'Uncategorized',
                    count: item.count,
                    responses: item.totalResponses
                }))
            };

            // Fill in missing dates with zero values
            const fillMissingDates = (data, dateKey = 'date') => {
                const filledData = [];
                const currentDate = new Date(startDate);
                
                while (currentDate <= endDate) {
                    const dateStr = currentDate.toISOString().split('T')[0];
                    const existingData = data.find(item => item[dateKey] === dateStr);
                    
                    if (existingData) {
                        filledData.push(existingData);
                    } else {
                        filledData.push({
                            [dateKey]: dateStr,
                            value: 0,
                            activeUsers: 0,
                            newUsers: 0,
                            responses: 0
                        });
                    }
                    
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                
                return filledData;
            };

            // Fill missing dates for time-series data
            formattedData.dailyGrowth = fillMissingDates(formattedData.dailyGrowth);
            formattedData.userActivity = fillMissingDates(formattedData.userActivity);
            formattedData.responseDistribution = fillMissingDates(formattedData.responseDistribution);

            res.status(200).json({
                success: true,
                data: formattedData
            });

        } catch (error) {
            console.error('Analytics Error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch analytics data',
                message: error.message
            });
        }
    },

    // Get detailed client analytics
    async getClientAnalytics(req, res) {
        try {
            const { clientId } = req.params;
            const { timeRange = '7d' } = req.query;

            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - (timeRange === '30d' ? 30 : 7));

            const client = await Client.findById(clientId);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found'
                });
            }

            const [spaceStats, responseStats] = await Promise.all([
                Space.aggregate([
                    {
                        $match: {
                            _id: { $in: client.spaces }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSpaces: { $sum: 1 },
                            activeSpaces: {
                                $sum: {
                                    $cond: [{ $gt: ["$responsesCount", 0] }, 1, 0]
                                }
                            },
                            totalResponses: { $sum: "$responsesCount" }
                        }
                    }
                ]),
                Space.aggregate([
                    {
                        $match: {
                            _id: { $in: client.spaces },
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                            },
                            responses: { $sum: "$responsesCount" }
                        }
                    },
                    {
                        $sort: { "_id": 1 }
                    }
                ])
            ]);

            res.status(200).json({
                success: true,
                data: {
                    overview: spaceStats[0] || {
                        totalSpaces: 0,
                        activeSpaces: 0,
                        totalResponses: 0
                    },
                    responseHistory: responseStats
                }
            });

        } catch (error) {
            console.error('Client Analytics Error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch client analytics',
                message: error.message
            });
        }
    },


    async getClientStats(req, res) {
        try {
            const { clientId } = req.params;
            
            const client = await Client.findById(clientId).lean();
            if (!client) {
                return res.status(404).json({ success: false, error: 'Client not found' });
            }
    
            // Get spaces with detailed stats
            const spaces = await Space.find({
                _id: { $in: client.spaces }
            }).lean();
    
            // Calculate active spaces
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const activeSpaces = spaces.filter(space => 
                space.responsesCount > 0 && 
                new Date(space.lastResponseAt || space.updatedAt) > thirtyDaysAgo
            );
    
            // Calculate response trends
            const previousPeriodResponses = await Space.aggregate([
                {
                    $match: {
                        _id: { $in: client.spaces.map(id => new mongoose.Types.ObjectId(id)) },
                        updatedAt: {
                            $gte: new Date(thirtyDaysAgo.getTime() - (30 * 24 * 60 * 60 * 1000)),
                            $lt: thirtyDaysAgo
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$responsesCount' }
                    }
                }
            ]);
    
            const currentTotalResponses = spaces.reduce((sum, space) => 
                sum + (space.responsesCount || 0), 0
            );
    
            const previousTotal = previousPeriodResponses[0]?.total || 0;
            const responseTrend = previousTotal === 0 
                ? 100 
                : ((currentTotalResponses - previousTotal) / previousTotal) * 100;
    
            res.status(200).json({
                success: true,
                data: {
                    totalResponses: currentTotalResponses,
                    activeSpaces: activeSpaces.length,
                    totalSpaces: spaces.length,
                    responseTrend: parseFloat(responseTrend.toFixed(2)),
                    spaces: spaces.map(space => ({
                        ...space,
                        isActive: new Date(space.lastResponseAt || space.updatedAt) > thirtyDaysAgo
                            && space.responsesCount > 0
                    }))
                }
            });
    
        } catch (error) {
            console.error('Error fetching client stats:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch client statistics'
            });
        }
    },

    async getClientActivities(req, res) {
        try {
            const { clientId } = req.params;
            const { limit = 20 } = req.query;
    
            if (!mongoose.Types.ObjectId.isValid(clientId)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid client ID'
                });
            }
    
            const client = await Client.findById(clientId);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    error: 'Client not found'
                });
            }
    
            // Ensure valid timestamp for login activities
            const loginActivities = client.lastLogin ? [{
                type: 'login',
                description: 'Client logged in',
                timestamp: new Date(client.lastLogin).toISOString(),
                metadata: {
                    authProvider: client.authProvider
                }
            }] : [];
    
            // Get space activities
            const spaces = await Space.find({
                _id: { $in: client.spaces }
            })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .lean();
    
            const spaceActivities = spaces
                .filter(space => space.createdAt) // Filter out spaces without creation date
                .map(space => ({
                    type: 'space_created',
                    description: `Created space: ${space.spaceName}`,
                    timestamp: new Date(space.createdAt).toISOString(),
                    metadata: {
                        spaceName: space.spaceName,
                        organizationName: space.organizationName,
                        responses: space.responsesCount || 0
                    }
                }));
    
            // Get response activities
            const responseActivities = spaces
                .filter(space => space.responsesCount > 0 && space.updatedAt)
                .map(space => ({
                    type: 'response_received',
                    description: `Received responses in ${space.spaceName}`,
                    timestamp: new Date(space.updatedAt).toISOString(),
                    metadata: {
                        spaceName: space.spaceName,
                        responseCount: space.responsesCount
                    }
                }));
    
            // Combine and sort activities
            const allActivities = [
                ...loginActivities,
                ...spaceActivities,
                ...responseActivities
            ]
            .filter(activity => activity.timestamp) // Filter out any activities without timestamps
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, parseInt(limit));
    
            res.status(200).json({
                success: true,
                data: allActivities
            });
    
        } catch (error) {
            console.error('Error fetching client activities:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch client activities',
                message: error.message
            });
        }
    },

    // Optional: Add activity
    async addClientActivity(req, res) {
        try {
            const { clientId } = req.params;
            const { type, description, metadata } = req.body;

            // Validate clientId
            if (!mongoose.Types.ObjectId.isValid(clientId)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid client ID'
                });
            }

            // Create activity
            const activity = {
                type,
                description,
                timestamp: new Date(),
                metadata
            };

            // Here you might want to store activities in a separate collection
            // For now, we'll just return the created activity
            res.status(200).json({
                success: true,
                data: activity
            });

        } catch (error) {
            console.error('Error adding client activity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to add client activity',
                message: error.message
            });
        }
    }


};

module.exports = adminDashboardController;